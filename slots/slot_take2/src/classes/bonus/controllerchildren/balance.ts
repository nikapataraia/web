import * as PIXI from 'pixi.js';

export default class BalanceDisplay {
    container: PIXI.Container;
    text: PIXI.Text;
    balanceContainer: PIXI.Text;

    constructor(startingBalance: number, controllerWidth: number, controllerHeight: number) {
        const containerWidth = controllerWidth * 0.15;
        const containerHeight = controllerHeight * 0.7;

        this.container = new PIXI.Container();
        this.container.width  = containerWidth
        this.container.height = containerHeight
        this.container.y = containerHeight * 0.15
        const background = new PIXI.Graphics();
        background.beginFill(0x808080);
        background.drawRoundedRect(0, 0, containerWidth, containerHeight, 30);
        background.endFill();
        this.container.addChild(background);

        this.balanceContainer = new PIXI.Text(`${startingBalance.toFixed(2)}`, {
            fontFamily: 'Arial',
            fontSize: 14,
            fontWeight: '700',
            fill: 0xffffff,
            align: 'center'
        });
        this.balanceContainer.x = (containerWidth - this.balanceContainer.width) / 2;
        this.balanceContainer.y = containerHeight * 0.1;

        this.text = new PIXI.Text('BALANCE', {
            fontFamily: 'Arial',
            fontSize: 14,
            fill: 0xffffff,
            fontWeight: '700',
            align: 'center'
        });
        this.text.x = (containerWidth - this.text.width) / 2;
        this.text.y = containerHeight * 0.9 - this.text.height;

        this.container.addChild(this.text);
        this.container.addChild(this.balanceContainer);
    }
}