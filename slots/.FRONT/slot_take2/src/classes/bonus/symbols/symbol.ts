import * as PIXI from 'pixi.js'
import { slotTextures } from '@/assets/DataBonus/Data_textures';
import * as Tween from '@tweenjs/tween.js';
import type { coordinates } from '../bonusgame';
export default class Symbol{
    id : number;
    container : PIXI.Container
    texture : PIXI.Sprite;
    location : coordinates
    quickplayon : boolean
    skiped : boolean
    constructor(id : number , symbolContainerWidth: number, symbolContainerHeight: number, location : coordinates , quickplayon : boolean , skiped : boolean){
        this.quickplayon = quickplayon
        this.skiped = skiped
        this.location = location
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