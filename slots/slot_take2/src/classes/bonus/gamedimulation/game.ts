class mysymbol{
    id : number
    constructor(id : number){
        this.id = id
    }
}

class pointsymbol extends mysymbol{
    doAction(fullinfo: gameinfo): void {
        throw new Error("Method not implemented.");
    }
    value : number;
    constructor(id : number , value : number){
        super(id)
        this.value = value
    }
}

function calculatelength(fullinfo : gameinfo): number {
    let totalPoints = 0;
    Object.values(fullinfo).forEach(reel => {
        Object.values(reel).forEach((symbol) => {
            const [, value] = symbol as [number,number];
            totalPoints += 1;
        });
    });
    return totalPoints;
}

class collector extends pointsymbol{
    constructor(id : number , value : number){
        super(id,value)
    }
    doAction(fullinfo: gameinfo): Array<[number, number]> {
        let hits: Array<[number, number]> = [];
        let symbolsToCollectFrom = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

        while (hits.length < symbolsToCollectFrom) {
            const reelIndex = Math.floor(Math.random() * Object.keys(fullinfo).length);
            const reel = fullinfo[reelIndex];
            const positionIndex = Math.floor(Math.random() * Object.keys(reel).length);
            const symbolInfo = reel[positionIndex];
            if (symbolInfo && symbolInfo[0] !== 0) {
                this.value += symbolInfo[1];
                hits.push([reelIndex, positionIndex]);
            }
        }

        return hits;
    }

    calculatehits(fullinfo: gameinfo){

    }
}
class payer extends pointsymbol{
    constructor(id : number , value : number){
        super(id,value)
    }
    doAction(fullinfo: gameinfo): Array<[number, number]> {
        let hits: Array<[number, number]> = [];
        let symbolsToAffect = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

        while (hits.length < symbolsToAffect) {
            const reelIndex = Math.floor(Math.random() * Object.keys(fullinfo).length);
            const reel = fullinfo[reelIndex];
            const positionIndex = Math.floor(Math.random() * Object.keys(reel).length);
            const symbolInfo = reel[positionIndex];
            if (symbolInfo && symbolInfo[0] !== 0) {
                symbolInfo[1] += this.value;
                hits.push([reelIndex, positionIndex]);
            }
        }

        return hits;
    }

    calculatehits(fullinfo: gameinfo){

    }
}
class sniper extends pointsymbol {
    constructor(id: number, value: number) {
        super(id, value);
    }

    doAction(fullinfo: gameinfo): Array<[number, number]> {
        const hits: Array<[number, number]> = [];
        for (let i = 0; i < 3; i++) {
            const reelIndex = Math.floor(Math.random() * Object.keys(fullinfo).length);
            const reelKeys = Object.keys(fullinfo[reelIndex]);
            if (reelKeys.length > 0) {
                const positionIndex = reelKeys[Math.floor(Math.random() * reelKeys.length)];
                const symbolInfo = fullinfo[reelIndex][parseInt(positionIndex)];
                if (symbolInfo) {
                    symbolInfo[1] *= this.value;
                    hits.push([reelIndex, parseInt(positionIndex)]);
                }
            }
        }
        return hits;
    }

    calculatehits(fullinfo: gameinfo){
        const randomhits = Math.floor(Math.random() * 6) + 3
        const hits : coordinates;
        for(let i = 0; i < randomhits; i++){
            const reelIndex = Math.floor(Math.random() * Object.keys(fullinfo).length);
            const reelKeys = Object.keys(fullinfo[reelIndex]);
            if (reelKeys.length > 0) {
                const positionIndex = reelKeys[Math.floor(Math.random() * reelKeys.length)];
                const symbolInfo = fullinfo[reelIndex][parseInt(positionIndex)];
                if (symbolInfo) {
                    symbolInfo[1] *= this.value;
                    hits.push([reelIndex, parseInt(positionIndex)]);
                }
            }
        }
    }
}

class reel {
    symbols: mysymbol[];

    constructor(starterinfo: reelinfo, reelheight: number) {
        this.symbols = [];

        for (let i = 0; i < reelheight; i++) {
            if (i in starterinfo) {
                const [id, value] = starterinfo[i];
                switch(id) {
                    case 1: 
                        this.symbols.push(new pointsymbol(id, value));
                        break;
                    case 2:
                        this.symbols.push(new collector(id, value));
                        break;
                    case 3:
                        this.symbols.push(new payer(id, value));
                        break;
                    case 4: 
                        this.symbols.push(new sniper(id, value));
                        break;
                    default:
                }
            } else {
                this.symbols.push(new mysymbol(0))
            }
        }
    }
}

class reelcontainer{
    reels : reel[]
    constructor(starterinfo : gameinfo, gamewidth : number){
        this.reels = []

        for(let i = 0; i < gamewidth; i++){
            this.reels.push(new reel(((i in starterinfo? starterinfo[i] : {})) , 5))
        }
    }
}

interface ISymbolData {
    [key: number]: [string, number];
}

const SymbolData : ISymbolData = {
    0 : ['basicsymbol' , 800],
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
    let rand = Math.random();
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
        let starterinfo33: gameinfo = {};
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

    

    simulate(): [gameinfo[], number, Array<Array<[number, number]>>] {
        const simulationresult: gameinfo[] = [];
        const sniperhits: Array<Array<[number, number]>> = [];
    
        while (this.rollsleft > 0) {
            const currentRollInfo: gameinfo = {};
            const actionDoers: pointsymbol[] = [];
            let specialSymbolGenerated = false;
    
            for (let reelIndex = 0; reelIndex < Object.keys(this.reelcontainer.reels).length; reelIndex++) {
                currentRollInfo[reelIndex] = {};
                for (let position = 0; position < 5; position++) {
                    if (this.fullinfo[reelIndex] && this.fullinfo[reelIndex][position]) {
                        continue;
                    }
    
                    const type = generateType();
                    if (type != 0) {
                        specialSymbolGenerated = true;
                        const value = generateWeightedNumber();
                        currentRollInfo[reelIndex][position] = [type, value];
                        if (type === 2 || type === 3 || type === 4) {
                            actionDoers.push(this.createSymbolInstance(type, value));
                        }
                    }
                }
            }
            Object.keys(currentRollInfo).forEach(reelIndex => {
                const reelIndexNum = parseInt(reelIndex);
                if (!this.fullinfo[reelIndexNum]) {
                    this.fullinfo[reelIndexNum] = {};
                }
                Object.keys(currentRollInfo[reelIndexNum]).forEach(position => {
                    const positionNum = parseInt(position);
                    this.fullinfo[reelIndexNum][positionNum] = currentRollInfo[reelIndexNum][positionNum];
                });
            });
    
            actionDoers.forEach(symbol => {
                if (symbol instanceof sniper) {
                    const hits = symbol.doAction(this.fullinfo);
                    sniperhits.push(hits);
                } else {
                    symbol.doAction(this.fullinfo);
                }
            });
    
            if (!specialSymbolGenerated) {
                this.rollsleft -= 1;
            } else {
                this.rollsleft = 3;
            }
    
            simulationresult.push(currentRollInfo);
        }
    
        const totalPoints = this.calculatePoints();
        return [simulationresult, totalPoints, sniperhits];
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
            for (let reelIndex = 0; reelIndex < Object.keys(this.reelcontainer.reels).length; reelIndex++) {
                currentrollinfo.gameinfo[reelIndex] = {};
                for (let position = 0; position < 5; position++) {
                    if (this.fullinfo[reelIndex] && this.fullinfo[reelIndex][position]) {
                        continue;
                    }
    
                    const type = generateType();
                    if (type != 0) {
                        specialSymbolGenerated = true;
                        const value = generateWeightedNumber();
                        currentrollinfo.gameinfo[reelIndex][position] = [type, value];
                        if (type === 2 || type === 3 || type === 4) {
                            const actiondoer = this.createSymbolInstance(type,value)
                            currentrollinfo.actioninfo[reelIndex][position] = 
                    }
                }
            }
            
        }
    }
    return [simulationresult,this.calculatePoints()]
    }

    private createSymbolInstance(type: number, value: number): pointsymbol {
        switch (type) {
            case 2: return new collector(type, value);
            case 3: return new payer(type, value);
            case 4: return new sniper(type, value);
            default: return new pointsymbol(type, value)
        }
    }
}