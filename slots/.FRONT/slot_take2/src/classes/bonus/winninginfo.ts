import * as PIXI from 'pixi.js'
import { gsap } from 'gsap';
export default class WinningInfo {
    winning: number;
    container: PIXI.Container;
    container_winning: PIXI.Container;
    winningText: PIXI.Text;
    quickplayon : boolean;
    skiped : boolean;

    constructor(appwidth: number, appheight: number, winningstart: number,quickplayon : boolean) {
        this.skiped = false
        this.winning = winningstart;
        this.container = new PIXI.Container();
        this.container_winning = new PIXI.Container();
        const containerWidth = appwidth * 0.15;
        this.quickplayon = quickplayon

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
        this.container.x = appwidth * 0.85;

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
        this.winningText = winningText
        winningText.x = (containerWidth - winningText.width) / 2;
        winningText.y = (appheight * 0.3 - winningText.height) / 2;
        this.container_winning.addChild(winningText);
    }

    changeWinnings(newWinning: number) {
        this.winning = newWinning;
        gsap.to(this.winningText.scale, { x: 1.2, y: 1.2, duration: this.skiped ? 0.1 : (this.quickplayon ? 0.25 : 0.5), ease: 'back.out' })
            .then(() => {
                this.winningText.style.fill = '#FFD700';
                this.winningText.text = `${this.winning}x`;
            })
            .then(() => {
                gsap.to(this.winningText.scale, { x: 1, y: 1, duration:this.skiped ? 0.1 : (this.quickplayon ? 0.25 : 0.5), ease: 'back.in' })
                    .then(() => {
                        this.winningText.style.fill = '#ffffff';
                        this.winningText.x = (this.container.width - this.winningText.width) / 2;
                    });
            });
    }

    changequickplay(){
        this.quickplayon = !this.quickplayon
    }

    changeskiped(){
        this.skiped = true
    }
    changeskiped_tofalse(){
        this.skiped = false
    }
    reset(){
        this.winningText.text = `${0}x`;
        this.winning = 0
    }
}