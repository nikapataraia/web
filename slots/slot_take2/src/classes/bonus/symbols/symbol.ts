import * as PIXI from 'pixi.js'
import { slotTextures } from '@/assets/Data_textures';
import * as Tween from '@tweenjs/tween.js';
export default class Symbol{
    id : number;
    container : PIXI.Container
    texture : PIXI.Sprite;
    constructor(id : number , symbolContainerWidth: number, symbolContainerHeight: number, ){
        this.id = id;
        const texture = slotTextures[id];

        this.texture = new PIXI.Sprite(texture);
        this.texture.width = symbolContainerWidth;
        this.texture.height = symbolContainerHeight;

        this.container = new PIXI.Container();
        this.container.width = symbolContainerWidth;
        this.container.height = symbolContainerHeight;

        this.container.addChild(this.texture)
    }
}