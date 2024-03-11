import * as PIXI from 'pixi.js'
import { slotTextures } from '@/assets/Data_textures';
import * as Tween from '@tweenjs/tween.js';
import PointSymbol from './pointssymbol';
import type { coordinates, gameinfo } from '../bonusgame';
import type { Reel } from '../reel';
import type { ReelContainer } from '../reelcontainer';

export default class Sniper extends PointSymbol{
    constructor(id: number, symbolContainerWidth: number, symbolContainerHeight: number, value : number, location : coordinates){
        super(id,symbolContainerWidth,symbolContainerHeight,value, location);
    }

    doAction(fullinfo : gameinfo , snipethese : coordinates[], reelcontainer : ReelContainer, quickplayon : boolean, symbolcontainerwidth : number, symbolcontainerheight : number): Promise<void>{
        return new Promise<void>((resolve) => {
            resolve();
        });
    }
}