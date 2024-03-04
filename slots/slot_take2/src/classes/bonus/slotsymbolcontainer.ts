import { animationsets, animationsets_quickplay, slotTextures } from '@/assets/Data_textures';
import * as PIXI from 'pixi.js'
import {} from '../../assets/Data_textures'
import { generateType, generateWeightedNumber } from '@/assets/Data';
import Symbol from './symbols/symbol';
import PointSymbol from './symbols/pointssymbol';
import Collector from './symbols/collector';
import Payer from './symbols/payer';
import Sniper from './symbols/sniper';
import * as Tween from '@tweenjs/tween.js';
export class SlotSymbolContainer {
    container: PIXI.Container;
    location : number
    oncolumn : number
    // SymboltextureContainer : Symboltexture;
    containerheight : number;
    containerwidth : number;
    animationInProgress: boolean = false;
    symbolcontainer : Symbol

    constructor(symboltypeid: number, symbolvalue : number,  containerheight : number, containerwidth : number , location : number , x : number, y : number, oncolumn : number) {
        this.location = location
        this.oncolumn = oncolumn
        this.containerheight = containerheight
        this.containerwidth = containerwidth

        this.container = new PIXI.Container;
        this.container.width = containerwidth
        this.container.height = containerheight
        this.container.y = location * containerheight + y * location
        this.container.x = x
        // this.SymboltextureContainer = new Symboltexture(containerwidth,containerheight,symboltypeid,symbolvalue)
        // this.container.addChild(this.SymboltextureContainer.container)
        const mask = new PIXI.Graphics();
        mask.beginFill(0xffffff);
        mask.drawRect(0, 0, containerwidth, containerheight);
        mask.endFill();
        this.container.mask = mask;
        this.container.addChild(mask);
        PIXI.Ticker.shared.add(() => {
            Tween.update();
        });

        switch (symboltypeid) {
            case 0:
                this.symbolcontainer = new Symbol(symboltypeid, containerwidth, containerheight);
                break;
            case 1:
                this.symbolcontainer = new PointSymbol(symboltypeid, containerwidth, containerheight, symbolvalue);
                break;
            case 2:
                this.symbolcontainer = new Collector(symboltypeid, containerwidth, containerheight, symbolvalue);
                break;
            case 3:
                this.symbolcontainer = new Payer(symboltypeid, containerwidth, containerheight, symbolvalue);
                break;
            case 4:
                this.symbolcontainer = new Sniper(symboltypeid, containerwidth, containerheight, symbolvalue);
                break;
            default:
                console.log("Invalid symbol type id");
                this.symbolcontainer = new Symbol(symboltypeid, containerwidth, containerheight);
        }
        if(this.symbolcontainer instanceof PointSymbol){
            this.symbolcontainer.generatevalue()
        }
        this.container.addChild(this.symbolcontainer.container)
    }

    animateSymbolDrops(quickplayactive: boolean , newinfo : [number,number]): Promise<void> {
        return new Promise((resolve) => {
            if (!(this.symbolcontainer instanceof PointSymbol)) {
                const newsymbol = newinfo[0];
                const setsOnChosenSymbol = quickplayactive ? animationsets_quickplay[newsymbol] : animationsets[newsymbol];
                const animationSet = setsOnChosenSymbol[Math.floor(Math.random() * setsOnChosenSymbol.length)];
                this.animateTexture(animationSet, newinfo[1] , newinfo[0]).then(resolve)
            } else {
                resolve();
            }
        });
    }


    private animateTexture(textureSet: number[] , value : number , newid : number){
        return new Promise<void>((resolve) => {
            if(this.animationInProgress){
                resolve()
                return;
            }
            this.animationInProgress = true
            let curTexture = this.symbolcontainer;


            // razgonis ageba
            const animateRazgon = (cur : PIXI.Container, bot : PIXI.Container, onComplete: () => void) => {
                const tweenCur = new Tween.Tween({ y: cur.y })
                .to({ y: cur.y - this.containerheight * 0.1 }, 150)
                .easing(Tween.Easing.Linear.None)
                .onUpdate(object => {
                    cur.y = object.y;
                })
                .yoyo(true)
                .repeat(1);

            const tweenBot = new Tween.Tween({ y: bot.y })
                .to({ y: bot.y - this.containerheight * 0.1 }, 150)
                .easing(Tween.Easing.Linear.None)
                .onUpdate(object => {
                    bot.y = object.y;
                })
                .yoyo(true)
                .repeat(1);

            Promise.all([
                new Promise(resolve => tweenCur.onComplete(resolve)),
                new Promise(resolve => tweenBot.onComplete(resolve))
            ]).then(onComplete);

            tweenCur.start();
            tweenBot.start();
            }


            //  bolo sheneleba
            const animateRazgonreverse = (bot: PIXI.Container, top: PIXI.Container, onComplete: () => void) => {
                const tweenBot = new Tween.Tween({ y: bot.y })
                .to({ y: bot.y + this.containerheight * 0.2 }, 350)
                .easing(Tween.Easing.Linear.None)
                .onUpdate(object => {
                    bot.y = object.y;
                })
                .yoyo(true)
                .repeat(1);

            const tweenTop = new Tween.Tween({ y: top.y })
                .to({ y: top.y + this.containerheight * 0.2 }, 350)
                .easing(Tween.Easing.Linear.None)
                .onUpdate(object => {
                    top.y = object.y;
                })
                .yoyo(true)
                .repeat(1);

            Promise.all([
                new Promise(resolve => tweenBot.onComplete(resolve)),
                new Promise(resolve => tweenTop.onComplete(resolve))
            ]).then(onComplete);
            tweenBot.start();
            tweenTop.start(); 
            }

            // mtavari chamoyris animacia
            const loopAnimation = (index : number) => {
                if (index >= textureSet.length - 1) {
                    const toptexture = new Symbol(textureSet[textureSet.length - 1],this.containerwidth,this.containerheight)
                    toptexture.container.y = -this.containerheight
                    this.container.addChild(toptexture.container);
                    animateRazgonreverse(curTexture.container, toptexture.container, () => {
                        this.container.removeChild(toptexture.container);
                        this.animationInProgress = false;
                        if(this.symbolcontainer instanceof PointSymbol){
                            this.symbolcontainer.generatevalue()
                        }
                        resolve();
                    });
                    return;
                }
                const newTexture = (index != textureSet.length - 2)
                ? new Symbol(textureSet[index], this.containerwidth, this.containerheight)
                   : ((newid === 0) ? new Symbol(textureSet[index], this.containerwidth, this.containerheight)
                   : (newid === 1) ? new PointSymbol(textureSet[index], this.containerwidth, this.containerheight, value)
                   : (newid === 2) ? new Collector(textureSet[index], this.containerwidth, this.containerheight, value)
                   : (newid === 3) ? new Payer(textureSet[index], this.containerwidth, this.containerheight, value)
                   : (newid === 4) ? new Sniper(textureSet[index], this.containerwidth, this.containerheight, value)
                   : new Symbol(textureSet[index], this.containerwidth, this.containerheight));

                const newtexturecontainer = newTexture.container;
                newtexturecontainer.y = -this.containerheight;
                this.container.addChild(newtexturecontainer);
                index++
    
                new Tween.Tween({ y: newtexturecontainer.y })
                    .to({ y: 0 }, 100)
                    .easing(Tween.Easing.Linear.None)
                    .onUpdate(object => {
                        newtexturecontainer.y = object.y; 
                    })
                    .start();

                new Tween.Tween({ y: curTexture.container.y })
                    .to({ y: this.containerheight }, 100)
                    .easing(Tween.Easing.Linear.None)
                    .onUpdate(object => {
                        curTexture.container.y = object.y;
                    })
                    .onComplete(() => {
                        this.container.removeChild(curTexture.container);
                        curTexture = newTexture;
                        this.symbolcontainer = newTexture
                        loopAnimation(index);
                    })
                    .start();
            };

            // callloop
            const bottexture = new Symbol(textureSet[0],this.containerwidth,this.containerheight)
            bottexture.container.y = this.containerheight
            this.container.addChild(bottexture.container)
            animateRazgon(this.symbolcontainer.container, bottexture.container, () => {
                this.container.removeChild(bottexture.container)
                let index = 2
                loopAnimation(index);
            })

    });


    }
    
}