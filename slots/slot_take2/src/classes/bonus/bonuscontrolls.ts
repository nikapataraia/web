import * as PIXI from 'pixi.js'
import PermaBotContainer from './permabotcontrollercontainer';
import ResponsiveContainer from './responsivecontrollercontainer';

export class BonusController {
    container: PIXI.Container;
    permabotcontainer: PermaBotContainer;
    responsivecontainer: ResponsiveContainer;
    quickplayon: boolean;
    betamount: number;

    constructor(betamount: number, gamewidth: number, gameheight: number) {
        this.quickplayon = false;
        this.betamount = betamount;
        this.container = new PIXI.Container();
        const containerheight = gameheight * 0.1
        const containery = gameheight - containerheight
        const background = new PIXI.Graphics();
        background.beginFill(0x69F542);
        background.drawRect(0, 0, gamewidth, gameheight);
        background.endFill();

        this.container.addChild(background);

        this.container.width = gamewidth;
        this.container.height = gameheight;
        this.container.y = containery;

        this.permabotcontainer = new PermaBotContainer(gamewidth,gameheight);
        this.responsivecontainer = new ResponsiveContainer(gamewidth,gameheight);

        this.container.addChild(this.responsivecontainer.container)
    }
}