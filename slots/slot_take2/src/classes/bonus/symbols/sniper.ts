import * as PIXI from 'pixi.js'
import { slotTextures } from '@/assets/Data_textures';
import * as Tween from '@tweenjs/tween.js';
import PointSymbol from './pointssymbol';
import type { coordinates, gameinfo } from '../bonusgame';
import type { Reel } from '../reel';

export default class Sniper extends PointSymbol{
    constructor(id: number, symbolContainerWidth: number, symbolContainerHeight: number, value : number){
        super(id,symbolContainerWidth,symbolContainerHeight,value);
    }

    doAction(fullinfo : gameinfo , snipethese : coordinates, reels : Reel[], quickplayon : boolean){

    }
}