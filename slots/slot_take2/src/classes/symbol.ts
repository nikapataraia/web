import { slotTextures } from '@/assets/Data';
import * as PIXI from 'pixi.js'
export class SlotSymbol {
    symboltypeid: number;
    value: number;
    SymbolContainer: PIXI.Container;
    location : number

    constructor(symboltypeid: number, value: number, symbolcontainerheight : number, symbolcontainerwidth : number , location : number) {
        this.symboltypeid = symboltypeid;
        this.value = value;
        this.location = location

        this.SymbolContainer = new PIXI.Container;
        const texture = slotTextures[symboltypeid]
        this.SymbolContainer.width = symbolcontainerwidth
        this.SymbolContainer.height = symbolcontainerheight
        this.SymbolContainer.y = location * symbolcontainerheight
        const symbol = new PIXI.Sprite(texture);
        symbol.width = symbolcontainerwidth - 10
        symbol.height = symbolcontainerheight - 10
        symbol.x = 5
        this.SymbolContainer.addChild(symbol) 
    }

    animateSymbolDrops(newsymbol: SlotSymbol , quickplayactive : boolean) {
        
    }
}