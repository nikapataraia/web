import * as PIXI from 'pixi.js'
import PlinkoMap from './PlinkoMap'
import { MainData } from '@/assets/DataMain/Data'
export default class Plinko{
    Plinko_app : PIXI.Application<PIXI.ICanvas>
    Map : PlinkoMap
    BetAmount : number
    AutoPlay : boolean
    Speed : number
    scale : number
    ChosenFinishLine : number[]

    constructor( BetAmount : number,){
        this.BetAmount = BetAmount
        this.Speed = 1
        this.scale = 1
        this.AutoPlay = false
        this.Plinko_app = new PIXI.Application({
            width : MainData.Application.Width,
            height : MainData.Application.Height,
            backgroundColor : 'black',
        })
        this.ChosenFinishLine = MainData.Map.FinishLine1
        this.Map = new PlinkoMap( this.ChosenFinishLine)
        this.Plinko_app.stage.addChild(this.Map.container)
    }
}