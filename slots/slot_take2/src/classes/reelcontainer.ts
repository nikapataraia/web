import * as PIXI from 'pixi.js'
import * as Tween from '@tweenjs/tween.js';
import { Reel } from './reel';
import { generateType, slotTextures } from '@/assets/Data';
export class ReelContainer {
    reelcontainer : PIXI.Container;
    reels : Reel[];

    constructor(mapWidth : number , mapHeight : number, appWidth : number, appHeight : number){
        this.reelcontainer = new PIXI.Container;
        const reelContainerWidth = appWidth * 0.1 * mapWidth;
        this.reelcontainer.width = reelContainerWidth;
        this.reelcontainer.height = appHeight - 10;
        this.reelcontainer.x = appWidth * 0.15 + (mapWidth === 7 ? 0 : appWidth * 0.1);
        this.reelcontainer.y = 10;

        let reelwidth = reelContainerWidth / mapWidth
        let reelHeight = appHeight - 10
        this.reels = []
        for(let i = 0; i < mapWidth; i++){
            let isReelActive = !(mapWidth === 6 && i === mapWidth - 1) && !(mapWidth === 7 && (i === 0 || i === mapWidth - 1));
            const newreel = new Reel(isReelActive,reelwidth,reelHeight,mapHeight)
            this.reels.push(newreel)
            this.reelcontainer.addChild(newreel.reel)
        }
    }

}