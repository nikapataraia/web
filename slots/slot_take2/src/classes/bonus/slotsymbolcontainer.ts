import { animationsets, animationsets_quickplay, slotTextures } from '@/assets/Data_textures';
import * as PIXI from 'pixi.js'
import {} from '../../assets/Data_textures'
import { generateType } from '@/assets/Data';
import Symboltexture from './symboltexture'
export class SlotSymbolContainer {
    symboltypeid: number;
    SymbolContainer: PIXI.Container;
    location : number
    SymboltextureContainer : Symboltexture;
    symbolcontainerheight : number;
    symbolcontainerwidth : number;

    constructor(symboltypeid: number,  symbolcontainerheight : number, symbolcontainerwidth : number , location : number , x : number, y : number) {
        this.symboltypeid = symboltypeid;
        this.location = location

        this.symbolcontainerheight = symbolcontainerheight
        this.symbolcontainerwidth = symbolcontainerwidth

        this.SymbolContainer = new PIXI.Container;
        this.SymbolContainer.width = symbolcontainerwidth
        this.SymbolContainer.height = symbolcontainerheight
        this.SymbolContainer.y = location * symbolcontainerheight + y * location
        this.SymbolContainer.x = x
        this.SymboltextureContainer = new Symboltexture(symbolcontainerwidth,symbolcontainerheight,this.symboltypeid)
        this.SymbolContainer.addChild(this.SymboltextureContainer.container)
    }

    animateSymbolDrops(quickplayactive : boolean) {
        if(this.symboltypeid===0){
            const newsymbol = generateType()
            const setsonchosensymbol = (quickplayactive ? animationsets_quickplay[newsymbol] : animationsets[newsymbol])
            const animationset = setsonchosensymbol[Math.floor(Math.random() * setsonchosensymbol.length)]
            this.SymboltextureContainer.animateTexture(animationset)
            this.symboltypeid = animationset[animationset.length - 2]
        }
    }
}