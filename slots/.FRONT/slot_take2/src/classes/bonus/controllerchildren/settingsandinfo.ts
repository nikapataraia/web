import * as PIXI from 'pixi.js';
import settingsbackground from '../../../assets/images/settingsbackground.jpg';

export default class SettingsAndInfo {
    container: PIXI.Container;
    private backgroundImage: PIXI.Sprite;

    constructor(width: number, height: number) {
        const containerSize = height * 0.7;
        this.container = new PIXI.Container();
        this.container.width = containerSize;
        this.container.height = containerSize;
        this.container.x = width * 0.1;
        this.container.y = height * 0.15;

        // Create a circular background with a border
        const circleBackground = new PIXI.Graphics();
        // Border
        circleBackground.lineStyle(3, 0x808080); // 2px gray border
        circleBackground.beginFill(0x000000); // Black fill
        circleBackground.drawCircle(containerSize / 2, containerSize / 2, containerSize / 2);
        circleBackground.endFill();

        this.container.addChild(circleBackground);

        // Set the background image to simulate the gradient
        this.backgroundImage = PIXI.Sprite.from(settingsbackground);
        this.backgroundImage.width = containerSize;
        this.backgroundImage.height = containerSize;
        this.backgroundImage.anchor.set(0.5);
        this.backgroundImage.x = containerSize / 2;
        this.backgroundImage.y = containerSize / 2;
        this.container.addChild(this.backgroundImage);

        // Ensure the background image is masked to appear circular
        const mask = new PIXI.Graphics();
        mask.beginFill(0xffffff);
        mask.drawCircle(containerSize / 2, containerSize / 2, containerSize / 2);
        mask.endFill();
        this.container.addChild(mask);
        this.backgroundImage.mask = mask;

        // Add the menu image in the center
        const menuImage = PIXI.Sprite.from("menu1.png");
        menuImage.width = containerSize * 0.9;
        menuImage.height = containerSize * 0.9;
        menuImage.anchor.set(0.5);
        menuImage.x = containerSize / 2;
        menuImage.y = containerSize / 2;
        this.container.addChild(menuImage);

        this.container.interactive = true;
        this.container.on('pointerdown', () => {
            console.log('Settings and Info clicked');
        });

        // Modify the container's and image's brightness on hover and change cursor
        this.container.on('pointerover', () => {
            this.container.alpha = 0.8;
            menuImage.alpha = 0.8;
            document.body.style.cursor = 'pointer';
        });
        this.container.on('pointerout', () => {
            this.container.alpha = 1;
            menuImage.alpha = 1;
            document.body.style.cursor = 'default';
        });
    }
}