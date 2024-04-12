import * as PIXI from 'pixi.js'
import { BonusController } from './bonuscontrolls'
import { BonusGameContainer } from './bonusgamecontainer'
import { eventBus } from '../../assets/DataBonus/eventBus';

export default class RollInfo {
    rollsleft: number;
    container: PIXI.Container;
    container_roll: PIXI.Container;
    rollsText: PIXI.Text;
    speedlevel : number;
    skiped :  boolean;

    constructor(appwidth: number, appheight: number,speedlevel : number) {
        this.skiped = false
        this.rollsleft = 3;
        this.container = new PIXI.Container();
        this.container_roll = new PIXI.Container();
        const containerWidth = appwidth * 0.15;
        this.speedlevel = speedlevel

        const background = new PIXI.Graphics();
        background.beginFill(0xFFC0CB);
        background.drawRect(0, 0, containerWidth, appheight);
        background.endFill();

        const rollBackground = new PIXI.Graphics();
        rollBackground.beginFill(0xA52A2A);
        rollBackground.drawRect(0, 0, containerWidth, appheight * 0.3);
        rollBackground.endFill();

        this.container.width = containerWidth;
        this.container.height = appheight;

        this.container_roll.width = containerWidth;
        this.container_roll.height = appheight * 0.3;

        this.container.addChild(background);
        this.container_roll.addChild(rollBackground);

        this.container.addChild(this.container_roll);

        this.rollsText = new PIXI.Text(this.rollsleft.toString(), {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 'black',
            align: 'center'
        });

        this.rollsText.x = (containerWidth - this.rollsText.width) / 2;
        this.rollsText.y = (appheight * 0.3 - this.rollsText.height) / 2;

        this.container_roll.addChild(this.rollsText);
        eventBus.on('decreaseRoll', () => {
            this.decreaseroll();
        });

        eventBus.on('increaseRoll', () => {
            this.increaseroll();
        });
    }

    applyGlowEffect(duration = this.skiped || this.speedlevel ===3 ? 40 : (this.speedlevel ===2 ? 75 : 150)) {
        const originalStyleJson = JSON.stringify(this.rollsText.style);
        const originalStyleCopy = JSON.parse(originalStyleJson);
    
        this.rollsText.style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 24,
            fill: '#ffffff',
            dropShadow: true,
            dropShadowColor: '#ffffff',
            dropShadowBlur: 5,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            align: 'center'
        });
    
        setTimeout(() => {
            this.rollsText.style = new PIXI.TextStyle(originalStyleCopy);
        }, duration);
    }

    decreaseroll() {
        if (this.rollsleft > 0) {
            this.rollsleft -= 1;
            this.rollsText.text = this.rollsleft.toString();
            this.centerText();
            this.applyGlowEffect();
        }
    }

    increaseroll() {
        this.rollsleft = 3;
        this.rollsText.text = this.rollsleft.toString();
        this.centerText();
        this.applyGlowEffect();
    }

    centerText() {
        const containerWidth = this.container.width;
        const appheight = this.container.height;
        this.rollsText.x = (containerWidth - this.rollsText.width) / 2;
        this.rollsText.y = (appheight * 0.3 - this.rollsText.height) / 2;
    }

    changespeedlevel(speedlevel : number){
        this.speedlevel = speedlevel
    }

    changeskiped(){
        this.skiped = true
    }
    changeskiped_tofalse(){
        this.skiped = false
    }
    reset(){
        this.rollsText.text = '3'
        this.rollsleft = 3
    }
}