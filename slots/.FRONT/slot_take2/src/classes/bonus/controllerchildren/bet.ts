import * as PIXI from 'pixi.js'


export default class BetDisplay {
    container: PIXI.Container;
    betAmount: number;
    betText: PIXI.Text;
    increaseButton: PIXI.Container;
    decreaseButton: PIXI.Container;

    constructor(startingBet: number, controllerWidth: number, controllerHeight: number) {
        this.betAmount = startingBet;
        const containerWidth: number = controllerWidth * 0.15;
        const containerHeight: number = controllerHeight * 0.7;
        this.container = new PIXI.Container();
        this.container.y = containerHeight * 0.15;
        const background: PIXI.Graphics = new PIXI.Graphics();
        background.beginFill(0x808080);
        background.drawRoundedRect(0, 0, containerWidth, containerHeight, 20);
        background.endFill();
        this.container.addChild(background);
        this.betText = new PIXI.Text(`${this.betAmount.toFixed(2)}`, {
            fontFamily: 'Arial',
            fontSize: 14,
            fontWeight: '700',
            fill: 0xffffff,
            align: 'center',
        });
        this.betText.x = (containerWidth - this.betText.width) / 2;
        this.betText.y = containerHeight * 0.1;
        const labelText = new PIXI.Text('BET', {
            fontFamily: 'Arial',
            fontSize: 14,
            fill: 0xffffff,
            fontWeight: '700',
            align: 'center',
        });
        labelText.x = (containerWidth - labelText.width) / 2;
        labelText.y = containerHeight * 0.9 - labelText.height;

        this.container.addChild(labelText);
        this.container.addChild(this.betText);

        this.decreaseButton = this.createButton(20, containerHeight / 2, 0x000000, '-', '-0.5');
        this.container.addChild(this.decreaseButton);

        this.increaseButton = this.createButton(containerWidth - 20, containerHeight / 2, 0x000000, '+', '+0.5');
        this.container.addChild(this.increaseButton);
    }
    createButton(x: number, y: number, color: number, label: string, change: string): PIXI.Container {
        const buttonContainer = new PIXI.Container();
        const button = new PIXI.Graphics();
        button.beginFill(color);
        button.drawCircle(0, 0, 20);
        button.endFill();
        button.interactive = true;
        button.cursor = 'pointer';
        button.on('pointerdown', () => this.changeBetAmount(parseFloat(change)));
        
        const buttonText = new PIXI.Text(label, {
            fontFamily: 'Arial',
            fontSize: 40,
            fontWeight: '100',
            fill: 0xffffff,
            align: 'center',
        });
        buttonText.anchor.set(0.5);
        buttonText.x = 0;
        buttonText.y = 0;

        buttonContainer.x = x;
        buttonContainer.y = y;
        buttonContainer.addChild(button);
        buttonContainer.addChild(buttonText);
        return buttonContainer;
    }
    changeBetAmount(change: number): void {
        this.betAmount += change;
        this.betText.text = `${this.betAmount.toFixed(2)}`;
    }
}