import { generateType } from '@/assets/Data';
import { SlotSymbolContainer } from './slotsymbolcontainer';
import * as PIXI from 'pixi.js'
import type { reelinfo } from './gamedimulation/game';
export class Reel {
    container : PIXI.Container;
    symbols: SlotSymbolContainer[];
    // isactive: boolean;

    constructor( isactive: boolean , reelWidth : number, reelHeight : number, mapHeight : number , reelx : number , reelinfo : reelinfo) {
        this.container = new PIXI.Container;
        this.container.width = reelWidth
        this.container.height = reelHeight

        let symbolcontainerheight = reelHeight / mapHeight
        symbolcontainerheight = symbolcontainerheight - symbolcontainerheight * 0.06
        let symbolcontainerwidth = reelWidth
        symbolcontainerwidth = symbolcontainerwidth - symbolcontainerwidth * 0.1

        const symbolcontainery = symbolcontainerheight * 0.05
        const symbolcontainerx = symbolcontainerwidth * 0.05
        this.container.y = symbolcontainerheight * 0.05
        this.symbols = []
        this.container.x = reelx
        for(let i = 0 ;i < mapHeight; i++){
                const newsymbol = new SlotSymbolContainer(((reelinfo && reelinfo[i])?reelinfo[i][0] : 0),((reelinfo && reelinfo[i])?reelinfo[i][1] : 0),symbolcontainerheight,symbolcontainerwidth,i,symbolcontainerx,symbolcontainery , i)
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
}