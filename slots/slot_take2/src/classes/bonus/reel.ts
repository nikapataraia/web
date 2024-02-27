import { generateType } from '@/assets/Data';
import { SlotSymbolContainer } from './slotsymbolcontainer';
import * as PIXI from 'pixi.js'
export class Reel {
    reel : PIXI.Container;
    symbols: SlotSymbolContainer[];
    // isactive: boolean;

    constructor( isactive: boolean , reelWidth : number, reelHeight : number, mapHeight : number , reelx : number) {
        this.reel = new PIXI.Container;
        this.reel.width = reelWidth
        this.reel.height = reelHeight

        let symbolcontainerheight = reelHeight / mapHeight
        symbolcontainerheight = symbolcontainerheight - symbolcontainerheight * 0.06
        let symbolcontainerwidth = reelWidth
        symbolcontainerwidth = symbolcontainerwidth - symbolcontainerwidth * 0.1

        const symbolcontainery = symbolcontainerheight * 0.05
        const symbolcontainerx = symbolcontainerwidth * 0.05
        this.reel.y = symbolcontainerheight * 0.05
        this.symbols = []
        this.reel.x = reelx
        for(let i = 0 ;i < mapHeight; i++){
            const newsymbol = new SlotSymbolContainer(generateType(),symbolcontainerheight,symbolcontainerwidth,i,symbolcontainerx,symbolcontainery , i)
            this.symbols.push(newsymbol)
            this.reel.addChild(newsymbol.SymbolContainer)
        }
    }

    animatereel(quickplayactive: boolean) {
        this.symbols.forEach((symbol, index) => {
            setTimeout(() => {
                symbol.animateSymbolDrops(quickplayactive);
            }, 50 * index * Math.random() * 3);
        });
    }
}