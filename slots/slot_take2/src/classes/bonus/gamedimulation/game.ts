class mysymbol{
    id : number
    location : coordinates;
    constructor(id : number , cords : coordinates){
        this.id = id
        this.location = cords
    }
    doAction(fullinfo: gameinfo, hitthese: coordinates[]): void {
        throw new Error("Method not implemented.");
    }
    calculatehits(fullinfo: gameinfo): coordinates[] {
        throw new Error("Method not implemented.");
    }
}

class pointsymbol extends mysymbol{
    value : number;
    constructor(id : number , value : number , cords : coordinates){
        super(id,cords)
        this.value = value
    }
    doAction(fullinfo: gameinfo, hitthese: coordinates[]): void {
        throw new Error("Method not implemented.");
    }
    calculatehits(fullinfo: gameinfo): coordinates[] {
        throw new Error("Method not implemented.");
    }
}

class collector extends pointsymbol{
    constructor(id : number , value : number , cords : coordinates){
        super(id,value,cords )
    }
    doAction(fullinfo: gameinfo, hitthese: coordinates[]): void {
        const hits: coordinates[] = [];
        const symbolsToCollectFrom = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    
        while (hits.length < symbolsToCollectFrom) {
            const reelIndex = Math.floor(Math.random() * Object.keys(fullinfo).length);
            const reel = fullinfo[reelIndex];
            const positionIndex = Math.floor(Math.random() * Object.keys(reel).length);
            const symbolInfo = reel[positionIndex];
            if (symbolInfo && symbolInfo[0] !== 0) {
                this.value += symbolInfo[1];
                hits.push({ reelIndex: reelIndex, symbolIndex: positionIndex });
            }
        }
    
    }

    calculatehits(fullinfo: gameinfo): coordinates[] {
        const hits: coordinates[] = [];
        Object.entries(fullinfo).forEach(([reelIndex, symbols]) => {
            Object.entries(symbols).forEach(([symbolIndex, symbolData]) => {
                if(parseInt(reelIndex) != this.location.reelIndex && parseInt(symbolIndex) != this.location.symbolIndex){
                    hits.push({ reelIndex: parseInt(reelIndex), symbolIndex: parseInt(symbolIndex) });
                }
            });
        });
    
        return hits;
    }
}
class payer extends pointsymbol{
    constructor(id : number , value : number , cords : coordinates){
        super(id,value,cords )
    }
    doAction(fullinfo: gameinfo, hitThese: coordinates[]): void {
        hitThese.forEach(coord => {
            const reelIndex = coord.reelIndex
            const positionIndex = coord.symbolIndex
    
            const symbolInfo = fullinfo[reelIndex][positionIndex];
            if (symbolInfo && symbolInfo[0] !== 0) {
                symbolInfo[1] += this.value;
            }
        });
    }

    calculatehits(fullinfo: gameinfo): coordinates[] {
        const hits: coordinates[] = [];
        Object.entries(fullinfo).forEach(([reelIndex, symbols]) => {
            Object.entries(symbols).forEach(([symbolIndex, symbolData]) => {
                if(parseInt(reelIndex) != this.location.reelIndex && parseInt(symbolIndex) != this.location.symbolIndex){
                    hits.push({ reelIndex: parseInt(reelIndex), symbolIndex: parseInt(symbolIndex) });
                }
            });
        });
    
        return hits;
    }
}
class sniper extends pointsymbol {
    constructor(id: number, value: number , cords : coordinates) {
        super(id, value,cords );
    }

    doAction(fullinfo: gameinfo , hitThese: coordinates[]): void {
        hitThese.forEach(target => {
            const reelindex = target.reelIndex
            const symbolindex = target.symbolIndex
            const symbolinfo = fullinfo[reelindex][symbolindex];
            if(symbolinfo && symbolinfo[0] !== 0){
                symbolinfo[1] *= this.value
            }
        })
    }

    calculatehits(fullinfo: gameinfo): coordinates[] {
        const allSymbols: coordinates[] = [];
        Object.entries(fullinfo).forEach(([reelIndexStr, symbols]) => {
            const reelIndex = parseInt(reelIndexStr);
            Object.keys(symbols).forEach(symbolIndexStr => {
                const symbolIndex = parseInt(symbolIndexStr);
                if (!(reelIndex === this.location.reelIndex && symbolIndex === this.location.symbolIndex)) {
                    allSymbols.push({ reelIndex: reelIndex, symbolIndex: symbolIndex });
                }
            });
        });
    
        const randomhits_count = Math.floor(Math.random() * 6) + 3;
        const hits: coordinates[] = [];
        for (let i = 0; i < randomhits_count && allSymbols.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * allSymbols.length);
            const selectedSymbol = allSymbols.splice(randomIndex, 1)[0];
            hits.push(selectedSymbol);
        }
    
        return hits;
    }
}

class reel {
    symbols: mysymbol[];
    reelindex : number
    constructor(starterinfo: reelinfo, reelheight: number, reelindex: number) {
        this.symbols = [];
        this.reelindex = reelindex;

        for (let i = 0; i < reelheight; i++) {
            const coords: coordinates = { reelIndex: reelindex, symbolIndex: i };

            if (i in starterinfo) {
                const [id, value] = starterinfo[i];
                switch(id) {
                    case 1: 
                        this.symbols.push(new pointsymbol(id, value, coords));
                        break;
                    case 2:
                        this.symbols.push(new collector(id, value, coords));
                        break;
                    case 3:
                        this.symbols.push(new payer(id, value, coords));
                        break;
                    case 4: 
                        this.symbols.push(new sniper(id, value, coords));
                        break;
                    default:
                        this.symbols.push(new mysymbol(0, coords)); // Assuming mysymbol also accepts coordinates
                }
            } else {
                this.symbols.push(new mysymbol(0, coords)); // Assuming mysymbol also accepts coordinates
            }
        }
    }
}

class reelcontainer{
    reels : reel[]
    constructor(starterinfo : gameinfo, gamewidth : number){
        this.reels = []

        for(let i = 0; i < gamewidth; i++){
            this.reels.push(new reel(((i in starterinfo? starterinfo[i] : {})) , 5 , i))
        }
    }
}

interface ISymbolData {
    [key: number]: [string, number];
}

const SymbolData : ISymbolData = {
    0 : ['basicsymbol' , 700],
    1 : ['pointsymbol' , 830],
    2 : ['collector' , 835],
    3 : ['payer' , 840],
    4 : ['sniper' , 845]
}

export const generateType= () =>{
    const rand = Math.floor(Math.random() * 846);
    let type = 0;
    for (const key in SymbolData) {
        if (rand <= SymbolData[key][1]) {
            type = parseInt(key , 10);
            break;
        }
    }
    return type;
}
export function generateWeightedNumber(): number {
    const rand = Math.random();
    let cumulativeProbability = 0;
    let probabilityStep = 0.5;
    for (let i = 1; i <= 20; i++) {
        cumulativeProbability += probabilityStep;
        if (rand < cumulativeProbability) {
            return i;
        }
        probabilityStep /= 2;
    }
    return 20;
}

export interface reelinfo{
    [key : number] : [number, number]
}

export interface gameinfo{
    [key : number] : reelinfo
}

import type { coordinates } from "../bonusgame";
import PointSymbol from "../symbols/pointssymbol";

export interface SpecialInfo{
    [onsymbol : number] : coordinates[]
}

export interface DoActionInfo{
    [onreel : number] : SpecialInfo
}

export interface Api_info{
    gameinfo : gameinfo,
    actioninfo : DoActionInfo
}

export default class GameSimulation {
    Bet: number;
    rollsleft: number;
    reelcontainer: reelcontainer;
    fullinfo : gameinfo;
    startinginfo : gameinfo;

    constructor(bet: number, gamewidth: number, reelheight: number) {
        this.Bet = bet;
        this.rollsleft = 3;
        const starterinfo = this.generateStarterInfo(gamewidth, reelheight);
        this.startinginfo = starterinfo
        this.fullinfo = JSON.parse(JSON.stringify(starterinfo));

    this.reelcontainer = new reelcontainer(this.fullinfo, gamewidth);
    }

    private generateStarterInfo(gamewidth: number, reelheight: number): gameinfo {
        const starterinfo33: gameinfo = {};
        const numberOfPointSymbols = 3 + Math.floor(Math.random() * 2)
        for (let i = 0; i < numberOfPointSymbols; ) {
            const reelIndex = Math.floor(Math.random() * gamewidth);
            const positionIndex = Math.floor(Math.random() * reelheight);
            const value = generateWeightedNumber();
            if (!starterinfo33[reelIndex]) {
                starterinfo33[reelIndex] = {};
            }
            if (starterinfo33[reelIndex][positionIndex] === undefined) {
                starterinfo33[reelIndex][positionIndex] = [1, value];
                i++;
            }
        }
        return starterinfo33;
    }


    calculatePoints(): number {
        let totalPoints = 0;
        Object.values(this.fullinfo).forEach(reel => {
            Object.values(reel).forEach((symbol) => {
                const [, value] = symbol as [number,number];
                totalPoints += value;
            });
        });
        return totalPoints;
    }
    

    simulate2(): [Api_info[], number]{
        const simulationresult : Api_info[] = []
        while(this.rollsleft > 0){
            this.rollsleft -= 1
            const currentrollinfo : Api_info = {
                gameinfo: {},
                actioninfo: {}
            }
            let specialSymbolGenerated = false
            let aaaa = 0
            for (let reelIndex = 0; reelIndex < Object.keys(this.reelcontainer.reels).length; reelIndex++) {
                currentrollinfo.gameinfo[reelIndex] = {};
                for (let position = 0; position < 5; position++) {
                    if (this.fullinfo[reelIndex] && this.fullinfo[reelIndex][position]) {
                        aaaa += 1
                        continue;
                    }
                    const type = generateType();
                    if (type != 0) {
                        aaaa +=1
                        specialSymbolGenerated = true;
                        const value = generateWeightedNumber();
                        currentrollinfo.gameinfo[reelIndex][position] = [type, value];
                        const cordss : coordinates = {reelIndex: reelIndex, symbolIndex: position}
                        if (type === 2 || type === 3 || type === 4) {
                            if (!currentrollinfo.actioninfo[reelIndex]) {
                                currentrollinfo.actioninfo[reelIndex] = {};
                            }
                            const actiondoer = this.createSymbolInstance(type, value, cordss);
                            currentrollinfo.actioninfo[reelIndex][position] = actiondoer.calculatehits(this.fullinfo);
                        }
                    }
                } 
            }
        Object.keys(currentrollinfo.gameinfo).forEach(reelIndex => {
                const reelIndexNum = parseInt(reelIndex);
                if (!this.fullinfo[reelIndexNum]) {
                    this.fullinfo[reelIndexNum] = {};
                }
                Object.keys(currentrollinfo.gameinfo[reelIndexNum]).forEach(position => {
                    const positionNum = parseInt(position);
                    this.fullinfo[reelIndexNum][positionNum] = currentrollinfo.gameinfo[reelIndexNum][positionNum];
                    this.reelcontainer.reels[parseInt(reelIndex)].symbols[parseInt(position)] = this.createSymbolInstance(this.fullinfo[reelIndexNum][positionNum][0],this.fullinfo[reelIndexNum][positionNum][1],{reelIndex : parseInt(reelIndex), symbolIndex : parseInt(position)})
                });
            });
        if(specialSymbolGenerated){
            this.rollsleft = 3
        }
        Object.keys(currentrollinfo.actioninfo).forEach(reelindex => {
            Object.keys(currentrollinfo.actioninfo[parseInt(reelindex)]).forEach(symbolindex => {
                this.reelcontainer.reels[parseInt(reelindex)].symbols[parseInt(symbolindex)].doAction(this.fullinfo,currentrollinfo.actioninfo[parseInt(reelindex)][parseInt(symbolindex)])
                Object.keys(this.fullinfo).forEach(reelindex2 => {
                    Object.keys(this.fullinfo[parseInt(reelindex2)]).forEach(symbolindex2 => {
                        const symbol = this.reelcontainer.reels[parseInt(reelindex2)].symbols[parseInt(symbolindex2)];
                        if (symbol instanceof PointSymbol) {
                           (symbol as PointSymbol).value = this.fullinfo[parseInt(reelindex2)][parseInt(symbolindex2)][1];
                        }
                    })
                })
            })
        })
        simulationresult.push(currentrollinfo)
        if(aaaa == 30){
            break;
        }
    }
    return [simulationresult,this.calculatePoints()]
    }

    private createSymbolInstance(type: number, value: number , location : coordinates): pointsymbol {
        switch (type) {
            case 2: return new collector(type, value, location);
            case 3: return new payer(type, value, location);
            case 4: return new sniper(type, value, location);
            default: return new pointsymbol(type, value, location)
        }
    }
}