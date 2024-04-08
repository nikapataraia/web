import { SlotSymbolContainer } from './slotsymbolcontainer';
import * as PIXI from 'pixi.js'
import type { reelinfo } from './gamedimulation/game';
export class Reel {
    container : PIXI.Container;
    symbols: SlotSymbolContainer[];
    reelindex : number
    quickplayon : boolean
    skiped : boolean;

    constructor( reelWidth : number, reelHeight : number, mapHeight : number , reelx : number , reelinfo : reelinfo,  reelindex : number) {
        this.skiped = false
        this.quickplayon = false
        this.reelindex = reelindex
        this.container = new PIXI.Container;
        this.container.width = reelWidth
        this.container.height = reelHeight

        let symbolcontainerheight = reelHeight / mapHeight
        symbolcontainerheight = symbolcontainerheight * 0.94
        const symbolcontainerwidth = reelWidth * 0.9

        const symbolcontainery = symbolcontainerheight * 0.05
        const symbolcontainerx = symbolcontainerwidth * 0.05
        this.container.y = symbolcontainerheight * 0.05
        this.symbols = []
        this.container.x = reelx
        for(let i = 0 ;i < mapHeight; i++){
                const newsymbol = new SlotSymbolContainer(((reelinfo && reelinfo[i])?reelinfo[i][0] : 0),((reelinfo && reelinfo[i])?reelinfo[i][1] : 0),symbolcontainerheight,symbolcontainerwidth,i,symbolcontainerx,symbolcontainery , this.reelindex)
                this.symbols.push(newsymbol)
                this.container.addChild(newsymbol.container)
        }
    }

    animatereel(quickplayactive: boolean , newinfo : reelinfo): Promise<void> {
        const promises = this.symbols.map((symbol, index) => 
            new Promise<void>((resolve) => setTimeout(() => {
                resolve(symbol.animateSymbolDrops(quickplayactive , (newinfo && newinfo[index] ? newinfo[index] : [0,0])));
            }, 50 * index))
        );
        return Promise.all(promises).then(() => {});
    }

    changequickplay(){
        this.quickplayon = !this.quickplayon
        this.symbols.forEach((symbol) => {
            symbol.changequickplay()
        })
    }

    changeskiped(){
        this.skiped = true
        this.symbols.forEach((symbol) => {
            symbol.changeskiped()
        })
    }

    changeskiped_tofalse(){
        this.skiped = false
        this.symbols.forEach((sym) => {
            sym.changeskip_tofalse()
        })
    }

    loadinstarters(newinfo : reelinfo){
        this.symbols.map((symbol , index) => {
            if(newinfo && newinfo[index]){
                symbol.loadinstarters(newinfo[index][0] , newinfo[index][1])
            }
        })
    }
    reset(){
        this.symbols.forEach((symbol) => {
            symbol.reset()
        })
    }
}