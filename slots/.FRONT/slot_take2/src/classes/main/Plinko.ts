import * as PIXI from 'pixi.js'
import PlinkoMap from './PlinkoMap'
import { MainData } from '@/assets/DataMain/Data'
import type Ball from './Ball'
import BonusBall from './BonusBall'
import SimpleBall from './SimpleBall'
export default class Plinko{
    Plinko_app : PIXI.Application<PIXI.ICanvas>
    Map : PlinkoMap
    BetAmount : number
    AutoPlay : boolean
    Speed : number
    scale : number
    FinishLines : number[]
    BallDropDisabled : boolean

    constructor( BetAmount : number, onUpdateBalance: (winnings: number) => void){
        this.BetAmount = BetAmount
        this.Speed = 1
        this.scale = 1
        this.BallDropDisabled = false
        this.AutoPlay = false
        this.Plinko_app = new PIXI.Application({
            width : MainData.Sizes.Application.Width,
            height : MainData.Sizes.Application.Height,   
            backgroundColor : 'gray',
        })
        this.FinishLines = MainData.Map.FinishLine1
        this.Map = new PlinkoMap( this.FinishLines , onUpdateBalance)
        this.Plinko_app.stage.addChild(this.Map.container)
    }

    update(Deltatime : number){
        this.Map.update(Deltatime)
    }
    AddBall(Ballid : number, BallType : number, BallDestination : number , Bet : number = this.BetAmount){
        let Ball : Ball;
        let isBonus = false
        if(BallType == 1){
            this.BallDropDisabled = true
            isBonus = true
        }
        const WinAmount = this.FinishLines[BallDestination] * Bet
        const Route : boolean[]= this.GenerateRoute(BallDestination)

        this.Map.SpawnBall(isBonus, Ballid, BallDestination,Route , this.BetAmount)
    }

    GenerateRoute(BallDestination : number,){
        const Route : boolean[] = []
        const flip = Math.random() < 0.5;
        for(let i = 0 ; i < this.FinishLines.length - 1; i++){
            Route.push(i < BallDestination)
        }
        if(flip){
            Route.map(el => {el = !el})
            BallDestination = this.FinishLines.length - BallDestination - 1
        }
        for (let i = Route.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [Route[i], Route[j]] = [Route[j], Route[i]];
        }
        return Route;
    }

    changeSpeed(speed : number){
        this.Map.changeSpeed(speed)
    }
}