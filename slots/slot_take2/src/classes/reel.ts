import { generateType } from '@/assets/Data';
import { SlotSymbol } from './symbol';
import * as PIXI from 'pixi.js'
export class Reel {
    reel : PIXI.Container;
    symbols: SlotSymbol[];
    isactive: boolean;

    constructor( isactive: boolean , reelWidth : number, reelHeight : number, mapHeight : number) {
        this.reel = new PIXI.Container;
        const symbolcontainerheight = reelHeight / mapHeight
        const symbolcontainerwidth = reelWidth
        this.symbols = []
        for(let i = 0 ;i < mapHeight; i++){
            const newsymbol = new SlotSymbol(generateType(),0,symbolcontainerheight,symbolcontainerwidth,i)
            this.symbols.push(newsymbol)
            this.reel.addChild(newsymbol.SymbolContainer)
        }
        this.isactive = isactive;
    }

    animatereel(newsymbols: SlotSymbol[], quickplayactive : boolean) {
        this.symbols.forEach((symbol,index) => {
            if(symbol.symboltypeid == 0){
                symbol.animateSymbolDrops(newsymbols[index],quickplayactive)
            }
        })
    }
}