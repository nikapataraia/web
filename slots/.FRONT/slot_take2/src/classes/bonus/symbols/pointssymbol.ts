import * as PIXI from 'pixi.js'
import * as Tween from '@tweenjs/tween.js';
import Symbol from './symbol';
import type { coordinates, gameinfo } from '../bonusgame';
import type { ReelContainer } from '../reelcontainer';
import { gsap } from "gsap";
export default class PointSymbol extends Symbol{
    value : number;
    valuecontainer : PIXI.Container;
    valuetext : PIXI.Text
    valuecontainerwidth : number
    valuecontainerheight : number
    constructor(id: number, symbolContainerWidth: number, symbolContainerHeight: number, value : number , location : coordinates , speedlevel : number , skiped : boolean){
        super(id,symbolContainerWidth,symbolContainerHeight, location , speedlevel,skiped);
        this.value = value
        this.valuecontainer = new PIXI.Container()
        this.valuetext = new PIXI.Text()
        this.valuecontainer.addChild(this.valuetext)
        this.valuecontainerheight = symbolContainerHeight
        this.valuecontainerwidth = symbolContainerWidth
        
        PIXI.Ticker.shared.add(() => {
            Tween.update();
        });
        this.valuetext.anchor.set(0.5);
    }

    changeValue(newValue: number): Promise<void> {
        return new Promise<void>((resolve) => {
            gsap.to(this.valuetext.scale, { x: 1.1, y: 1.1, duration: this.speedlevel? 0.1  : 0.2, ease: 'back.out' })
                .then(() => {
                    this.value = newValue;
                    this.valuetext.text = `${this.value}x`;
                    this.valuetext.x = (this.container.width - this.valuetext.width) / 2;
                    this.valuetext.y = (this.container.height - this.valuetext.height) / 2;
                    return gsap.to(this.valuetext.scale, { x: 1, y: 1, duration: 0.5, ease: 'back.in' });
                })
                .then(() => {
                    resolve();
                });
        });
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

    doAction(fullinfo: gameinfo, collectThese: coordinates[], reelContainer: ReelContainer,  symbolContainerWidth: number, symbolContainerHeight: number): Promise<void> {
        return new Promise<void>((resolve) => {
            resolve();
        });
    }
}