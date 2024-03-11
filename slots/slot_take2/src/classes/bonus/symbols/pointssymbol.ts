import * as PIXI from 'pixi.js'
import { slotTextures } from '@/assets/Data_textures';
import * as Tween from '@tweenjs/tween.js';
import Symbol from './symbol';
import type { coordinates, gameinfo } from '../bonusgame';
import type { Reel } from '../reel';
import type { ReelContainer } from '../reelcontainer';

export default class PointSymbol extends Symbol{
    value : number;
    valuecontainer : PIXI.Container;
    valuetext : PIXI.Text
    valuecontainerwidth : number
    valuecontainerheight : number
    constructor(id: number, symbolContainerWidth: number, symbolContainerHeight: number, value : number , location : coordinates){
        super(id,symbolContainerWidth,symbolContainerHeight, location);
        this.value = value
        this.valuecontainer = new PIXI.Container()
        this.valuetext = new PIXI.Text()
        this.valuecontainer.addChild(this.valuetext)
        this.valuecontainerheight = symbolContainerHeight
        this.valuecontainerwidth = symbolContainerWidth
        
        PIXI.Ticker.shared.add(() => {
            Tween.update();
        });
    }

    changeValue(newValue: number) {
        this.value = newValue;
        this.updateValueDisplay();
    }

    updateValueDisplay() {
        this.valuetext.text = `${this.value}x`;
        this.valuetext.x = (this.container.width - this.valuetext.width) / 2;
        this.valuetext.y = (this.container.height - this.valuetext.height) / 2;
    }

    generatevalue() {
        if (this.valuecontainer.children.length > 0) {
            this.valuecontainer.removeChildren();
        }
        this.valuetext = new PIXI.Text(`${this.value}x`, {
            fontFamily: 'Arial', 
            fontSize: 24, 
            fill: 'white', 
            align: 'center' 
        });
        this.valuetext.x = (this.container.width - this.valuetext.width) / 2;
        this.valuetext.y = (this.container.height - this.valuetext.height) / 2;
        this.valuecontainer.addChild(this.valuetext);
        if (!this.container.children.includes(this.valuecontainer)) {
            this.container.addChild(this.valuecontainer);
        }
    }

    doAction(fullinfo: gameinfo, collectThese: coordinates[], reelContainer: ReelContainer, quickPlayOn: boolean, symbolContainerWidth: number, symbolContainerHeight: number): Promise<void> {
        return new Promise<void>((resolve) => {
            resolve();
        });
    }
}