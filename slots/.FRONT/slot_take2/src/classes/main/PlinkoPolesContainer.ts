import * as PIXI from 'pixi.js'
export default class PlinkoPolesContainer{
    container : PIXI.Container
    PlinkoWidth : number
    constructor(width : number , Parrentwidth : number , Parrentheight : number ,DistanceBetweenPoleCenters : number){
        this.PlinkoWidth = width
        this.container = new PIXI.Container()
    }
}