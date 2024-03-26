
import { MainData } from "@/assets/DataMain/Data";
import PlinkoFinishLine from "./PinkoFinishLine";
import PlinkoPolesContainer from "./PlinkoPolesContainer";
import * as PIXI from 'pixi.js'
export default class PlinkoMap{
    Finishline : PlinkoFinishLine
    PolesContainer : PlinkoPolesContainer
    container : PIXI.Container
    constructor(ChosenFinishline : number[]){
        this.container = new PIXI.Container()
        const containerwidth = MainData.Application.Width * 0.9
        const containerheight = MainData.Application.Width * 0.9
        this.container.width = containerwidth
        this.container.height =containerheight
        this.container.x = MainData.Application.Width * 0.05
        this.container.y = MainData.Application.Height * 0.05
        const DistanceBetweenPoleCenters = containerwidth / ChosenFinishline.length
        this.PolesContainer = new PlinkoPolesContainer(ChosenFinishline.length - 1 , containerwidth , containerheight , DistanceBetweenPoleCenters)
        this.Finishline = new PlinkoFinishLine(ChosenFinishline, containerwidth , containerheight , DistanceBetweenPoleCenters)
    }
}