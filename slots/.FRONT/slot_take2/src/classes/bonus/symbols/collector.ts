import * as PIXI from 'pixi.js'
import * as Tween from '@tweenjs/tween.js';
import PointSymbol from './pointssymbol';
import type { coordinates, gameinfo } from '../bonusgame';
import type { ReelContainer } from '../reelcontainer';
import { data } from '@/assets/DataBonus/Data';
import { gsap } from 'gsap';

export default class Collector extends PointSymbol{
    constructor(id: number, symbolContainerWidth: number, symbolContainerHeight: number, value : number, location : coordinates , speedlevel : number , skiped : boolean){
        super(id,symbolContainerWidth,symbolContainerHeight,value, location,speedlevel , skiped);
    }

    doAction(fullinfo: gameinfo, collectThese: coordinates[], reelcontainer: ReelContainer,  symbolcontainerwidth: number, symbolcontainerheight: number): Promise<void> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve) => {
            let totalCollectedValue = 0;
            const animationPromises: Promise<void>[] = [];
            const targetx = (this.location.reelIndex + 0.5) * symbolcontainerwidth - this.valuetext.width/2
            const targety = (this.location.symbolIndex + 0.5) * symbolcontainerheight - this.valuetext.height/2
            for (let i = 0; i < collectThese.length; i++) {
                const animationtime = (this.skiped || this.speedlevel ===3) ? data.animation_speed.special.sniper.skip : (this.speedlevel === 2?data.animation_speed.special.sniper.quickplay : data.animation_speed.special.sniper.normal)
                const coord = collectThese[i];
                const { reelIndex, symbolIndex } = coord;
                const reel = reelcontainer.reels[reelIndex];
                const symbol = reel.symbols[symbolIndex].symbolcontainer;
                
                if (symbol instanceof PointSymbol) {
                    totalCollectedValue += symbol.value;
                    const valueText = new PIXI.Text(symbol.value.toString() + 'x', {
                        fontFamily: 'Arial',
                        fontSize: 24,
                        fill: 'white',
                        align: 'center',
                    });
                    valueText.position.set((reelIndex + 0.5) * symbolcontainerwidth - valueText.width/2, (symbolIndex + 0.5) * symbolcontainerheight - valueText.height/2);
                    reelcontainer.container.addChild(valueText);
                    const animationPromise = new Promise<void>((resolveAnimation) => {
                    new Tween.Tween(valueText.position)
                                .to({ x: targetx, y: targety}, animationtime)
                                .easing(Tween.Easing.Cubic.Out)
                                .onComplete(() => {
                                    reelcontainer.container.removeChild(valueText);
                                    resolveAnimation();
                                })
                                .start();
                    });
                    animationPromises.push(animationPromise);

                    if ((this.speedlevel === 1) && !this.skiped) {
                        await new Promise(resolveDelay => setTimeout(resolveDelay, 200));
                    }
                }
            }
            
            Promise.all(animationPromises).then(() => {
                this.changeValue(this.value + totalCollectedValue).then(async () => {
                    resolve();
                });
            });
        });
    }

}