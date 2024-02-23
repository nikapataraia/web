import { slotTextures } from '@/assets/Data_textures';
import * as PIXI from 'pixi.js'
export default class Symboltexture{
    symbolTexture : PIXI.Sprite;
    constructor(symbolContainerWidth: number, symbolContainerHeight: number, textureid: number) {
        const texture = slotTextures[textureid]
        this.symbolTexture = new PIXI.Sprite(texture);
        this.symbolTexture.width = symbolContainerWidth;
        this.symbolTexture.height = symbolContainerHeight;
    }
}