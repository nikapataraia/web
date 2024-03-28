import { MainData } from '@/assets/DataMain/Data'
import * as PIXI from 'pixi.js'
import Location from './HelperClasses/Location'
import Cordinates from './HelperClasses/Coordinates'
export default class PlinkoPolesContainer{
    container : PIXI.Container
    PlinkoWidth : number
    Poles : PIXI.Container[][] = []
    PoleCords : Cordinates[][] = []
    constructor(bottompoleamount : number , Parrentwidth : number , Parrentheight : number ,DistanceBetweenPoleCenters : number){
        this.PlinkoWidth = bottompoleamount
        this.container = new PIXI.Container()
        const containerheight = Parrentheight * 0.8
        this.container.height = containerheight
        this.container.width = Parrentwidth 
        const background = new PIXI.Graphics();
        background.beginFill(0x000000); // Black color
        background.drawRect(0, 0, Parrentwidth, containerheight);
        background.endFill();
        this.container.addChild(background);



        let starting_x = Parrentwidth/2 - MainData.Sizes.Pole/2
        const heightdifference = containerheight / bottompoleamount
        let starting_y = heightdifference/2
        for(let i = 0; i < bottompoleamount ; i++){
            let newx = starting_x;
            const polesoni = []
            const polesoniCords = []
            for(let j = 0; j <= i; j++){
                const poleGraphics = new PIXI.Graphics();
                poleGraphics.beginFill(0xFFFFFF);
                const radius = MainData.Sizes.Pole / 2;
                poleGraphics.drawCircle(radius, radius, radius);
                poleGraphics.endFill();

                const newpole = new PIXI.Container();
                newpole.width = newpole.height = MainData.Sizes.Pole;
                newpole.x = newx;
                newpole.y = starting_y;
                newpole.addChild(poleGraphics);
                polesoni.push(newpole);
                this.container.addChild(newpole);

                polesoniCords.push(new Cordinates(newx, starting_y - MainData.Sizes.Pole))
                newx += DistanceBetweenPoleCenters;
            }
            this.Poles.push(polesoni)
            starting_x -= DistanceBetweenPoleCenters/2
            starting_y += heightdifference
            this.PoleCords.push(polesoniCords)
        }
    }
}