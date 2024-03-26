import { MainData } from '@/assets/DataMain/Data';
import * as PIXI from 'pixi.js'
export default class PlinkoFinishLine{
    container : PIXI.Container
    FinishLine : number[];
    FinishingContainers : PIXI.Container[] = []
    constructor(FinishLine : number[] , Parrentwidth : number , Parrentheight : number , DistanceBetweenPoleCenters : number){
        this.FinishLine = FinishLine
        this.container = new PIXI.Container()
        const containerheight = Parrentheight * 0.2
        this.container.width = Parrentwidth
        this.container.height =  containerheight
        this.container.y = Parrentheight * 0.8
        FinishLine.forEach((element,index) => {
            const newcont = new PIXI.Container()
            newcont.width = DistanceBetweenPoleCenters
            newcont.x = DistanceBetweenPoleCenters * index
            newcont.y = containerheight
            this.FinishingContainers.push(newcont)
        });
    }
}