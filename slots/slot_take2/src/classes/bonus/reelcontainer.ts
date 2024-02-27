import * as PIXI from 'pixi.js'
import * as Tween from '@tweenjs/tween.js';
import { Reel } from './reel';
import { eventBus } from '@/assets/eventBus';
export class ReelContainer {
    container: PIXI.Container;
    reels: Reel[];
    animationcomplete : boolean;

    constructor(mapWidth: number, mapHeight: number, appWidth: number, appHeight: number) {
        this.animationcomplete = false
        this.container = new PIXI.Container();
        const containerWidth = appWidth * 0.6
        this.container.width = containerWidth;
        this.container.height = appHeight;
        this.container.x = appWidth * 0.2
        

        const background = new PIXI.Graphics();
        background.beginFill(0x0000FF);
        background.drawRect(0, 0, containerWidth, appHeight);
        background.endFill();

        this.container.addChild(background);

        let reelWidth = containerWidth / mapWidth;
        let reelHeight = appHeight;
        this.reels = [];
        
        for (let i = 0; i < mapWidth; i++) {
            let isReelActive = !(mapWidth === 6 && i === mapWidth - 1) && !(mapWidth === 7 && (i === 0 || i === mapWidth - 1));
            const newReel = new Reel(isReelActive, reelWidth, reelHeight, mapHeight, i  *reelWidth);
            this.reels.push(newReel);
            this.container.addChild(newReel.reel);
        }
        eventBus.on('animatereels', () => {
            this.animatereels();
        });
    }

    private animatereels(){
        this.reels.forEach((reel, index) => {
            setTimeout(() => {
                reel.animatereel(false);
            }, 50 * index);
        });
    }
}