import { animationsets, animationsets_quickplay, slotTextures } from '@/assets/Data_textures';
import * as PIXI from 'pixi.js'
import {} from '../../assets/Data_textures'
import { generateType } from '@/assets/Data';
import Symboltexture from './symboltexture'
export class SlotSymbolContainer {
    symboltypeid: number;
    value: number;
    SymbolContainer: PIXI.Container;
    location : number
    Symboltexture : Symboltexture;

    constructor(symboltypeid: number, value: number, symbolcontainerheight : number, symbolcontainerwidth : number , location : number , x : number, y : number) {
        this.symboltypeid = symboltypeid;
        this.value = value;
        this.location = location
  

        this.SymbolContainer = new PIXI.Container;
        this.SymbolContainer.width = symbolcontainerwidth
        this.SymbolContainer.height = symbolcontainerheight
        this.SymbolContainer.y = location * symbolcontainerheight + y * location
        this.SymbolContainer.x = x
        this.Symboltexture = new Symboltexture(symbolcontainerwidth,symbolcontainerheight,this.symboltypeid)
        this.SymbolContainer.addChild(this.Symboltexture.symbolTexture)
    }

    animateSymbolDrops(quickplayactive : boolean) {
        if(this.symboltypeid===0){
            const newsymbol = generateType()
            const setsonchosensymbol = (quickplayactive ? animationsets_quickplay[newsymbol] : animationsets[newsymbol])
            const animationset = setsonchosensymbol[Math.floor(Math.random() * setsonchosensymbol.length)]
            
        }
    }
}