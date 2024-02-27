import * as PIXI from 'pixi.js'
import { BonusController } from './bonuscontrolls'
import { BonusGameContainer } from './bonusgamecontainer'
import { eventBus } from '../../assets/eventBus';
export default class WinningInfo {
    winning: number;
    container: PIXI.Container;
    container_winning: PIXI.Container;

    constructor(appwidth: number, appheight: number, winningstart: number) {
        this.winning = winningstart;
        this.container = new PIXI.Container();
        this.container_winning = new PIXI.Container();
        const containerWidth = appwidth * 0.2;

        const background = new PIXI.Graphics();
        background.beginFill(0xFFC0CB);
        background.drawRect(0, 0, containerWidth, appheight);
        background.endFill();

        const winningBackground = new PIXI.Graphics();
        winningBackground.beginFill(0xA52A2A);
        winningBackground.drawRect(0, 0, containerWidth, appheight * 0.3);
        winningBackground.endFill();

        this.container.width = containerWidth;
        this.container.height = appheight;
        this.container.x = appwidth * 0.8;

        this.container_winning.width = containerWidth;
        this.container_winning.height = appheight * 0.3;

        this.container.addChild(background);
        this.container.addChild(this.container_winning);
        this.container_winning.addChild(winningBackground);

        const winningText = new PIXI.Text(`${this.winning}x`, {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xffffff,
            align: 'center'
        });
        winningText.x = (containerWidth - winningText.width) / 2;
        winningText.y = (appheight * 0.3 - winningText.height) / 2;
        this.container_winning.addChild(winningText);
    }
}