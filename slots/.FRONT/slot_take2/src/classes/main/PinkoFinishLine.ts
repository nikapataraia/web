import { MainData } from '@/assets/DataMain/Data';
import * as PIXI from 'pixi.js'
import Coordinates from './HelperClasses/Coordinates';
export default class PlinkoFinishLine {
    container: PIXI.Container;
    FinishLine: number[];
    FinishingContainers: PIXI.Container[] = [];
    FinishlineCords : Coordinates[] = [];

    constructor(FinishLine: number[], ParentWidth: number, ParentHeight: number, DistanceBetweenPoleCenters: number) {
        this.FinishLine = FinishLine;
        this.container = new PIXI.Container();
        const containerHeight = ParentHeight * 0.2;
        this.container.width = ParentWidth;
        this.container.height = containerHeight;
        const container_Y = ParentHeight * 0.8
        this.container.y = container_Y;

        FinishLine.forEach((element, index) => {
            const newCont = new PIXI.Container();
            newCont.width = DistanceBetweenPoleCenters;
            newCont.height = containerHeight;
            const container_x = DistanceBetweenPoleCenters * index
            newCont.x = container_x;
            this.FinishlineCords.push(new Coordinates(container_x + DistanceBetweenPoleCenters/2 , container_Y))
            const background = new PIXI.Graphics();
            background.beginFill(0xFFC0CB); 
            background.drawRect(DistanceBetweenPoleCenters * 0.1, 0, DistanceBetweenPoleCenters * 0.8, containerHeight);
            background.endFill();
            newCont.addChild(background);
            const text = new PIXI.Text(element.toString(), {
                fontFamily: 'Arial',
                fontSize: 10,
                fill: '#000000',
                align: 'center'
            });
            text.x = (DistanceBetweenPoleCenters - text.width) / 2;
            text.y = (containerHeight - text.height) / 2;
            newCont.addChild(text);
            this.container.addChild(newCont);
            this.FinishingContainers.push(newCont);
        });
    }
}