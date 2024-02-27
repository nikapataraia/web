import { animationsets, animationsets_quickplay, slotTextures } from '@/assets/Data_textures';
import * as PIXI from 'pixi.js'
import {} from '../../assets/Data_textures'
import { generateType, generateWeightedNumber } from '@/assets/Data';
import Symboltexture from './symboltexture'
export class SlotSymbolContainer {
    SymbolContainer: PIXI.Container;
    location : number
    oncolumn : number
    SymboltextureContainer : Symboltexture;
    symbolcontainerheight : number;
    symbolcontainerwidth : number;

    constructor(symboltypeid: number,  symbolcontainerheight : number, symbolcontainerwidth : number , location : number , x : number, y : number, oncolumn : number) {
        this.location = location
        this.oncolumn = oncolumn
        this.symbolcontainerheight = symbolcontainerheight
        this.symbolcontainerwidth = symbolcontainerwidth

        this.SymbolContainer = new PIXI.Container;
        this.SymbolContainer.width = symbolcontainerwidth
        this.SymbolContainer.height = symbolcontainerheight
        this.SymbolContainer.y = location * symbolcontainerheight + y * location
        this.SymbolContainer.x = x
        this.SymboltextureContainer = new Symboltexture(symbolcontainerwidth,symbolcontainerheight,symboltypeid)
        this.SymbolContainer.addChild(this.SymboltextureContainer.container)
    }

    animateSymbolDrops(quickplayactive : boolean) {
        if(this.SymboltextureContainer.symbolid===0){
            const newsymbol = generateType()
            const setsonchosensymbol = (quickplayactive ? animationsets_quickplay[newsymbol] : animationsets[newsymbol])
            const animationset = setsonchosensymbol[Math.floor(Math.random() * setsonchosensymbol.length)]
            this.SymboltextureContainer.animateTexture(animationset , generateWeightedNumber())
            this.SymboltextureContainer.symbolid = animationset[animationset.length - 2]
        }
    }
}