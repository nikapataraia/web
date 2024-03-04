import * as PIXI from 'pixi.js'
import { BonusController } from './bonuscontrolls'
import { BonusGameContainer } from './bonusgamecontainer'
import { eventBus } from '../../assets/eventBus';

export default class RollInfo {
    rollsleft: number;
    container: PIXI.Container;
    container_roll: PIXI.Container;
    rollsText: PIXI.Text; // Add this line to store the text object

    constructor(appwidth: number, appheight: number) {
        this.rollsleft = 3;
        this.container = new PIXI.Container();
        this.container_roll = new PIXI.Container();
        const containerWidth = appwidth * 0.2;

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
            fill: 0xffffff,
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

    decreaseroll() {
        if (this.rollsleft > 0) {
            this.rollsleft -= 1;
            this.rollsText.text = this.rollsleft.toString();
            const containerWidth = this.container.width;
            const appheight = this.container.height;
            this.rollsText.x = (containerWidth - this.rollsText.width) / 2;
            this.rollsText.y = (appheight * 0.3 - this.rollsText.height) / 2;
        }
    }

    increaseroll(){
        this.rollsleft = 3;
        this.rollsText.text = this.rollsleft.toString();
        const containerWidth = this.container.width;
        const appheight = this.container.height;
        this.rollsText.x = (containerWidth - this.rollsText.width) / 2;
        this.rollsText.y = (appheight * 0.3 - this.rollsText.height) / 2;
    }
}