import * as PIXI from 'pixi.js'
import { slotTextures } from '@/assets/Data_textures';
import * as Tween from '@tweenjs/tween.js';
import PointSymbol from './pointssymbol';
import type { coordinates, gameinfo } from '../bonusgame';
import type { Reel } from '../reel';
import type { ReelContainer } from '../reelcontainer';
import { data } from '@/assets/Data';

export default class Payer extends PointSymbol {
    constructor(id: number, symbolContainerWidth: number, symbolContainerHeight: number, value: number, location : coordinates , quickplayon : boolean) {
        super(id, symbolContainerWidth, symbolContainerHeight, value, location , quickplayon);
    }

    doAction(fullinfo: gameinfo, payThese: coordinates[], reelcontainer : ReelContainer, symbolcontainerwidth : number, symbolcontainerheight : number): Promise<void> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve) => {
            const animationPromises: Promise<void>[] = [];
            const startingx = (this.location.reelIndex + 0.5) * symbolcontainerwidth - this.valuetext.width/2
            const startingy = (this.location.symbolIndex + 0.5) * symbolcontainerheight - this.valuetext.height/2
            for (let i = 0; i < payThese.length; i++) {
                const animationtime = this.quickplayon?data.animation_speed.special.payer.quickplay : data.animation_speed.special.payer.normal
                const coord = payThese[i];
                const { reelIndex, symbolIndex } = coord;
                const reel = reelcontainer.reels[reelIndex];
                const symbol = reel.symbols[symbolIndex].symbolcontainer;
                
                if (symbol instanceof PointSymbol) {
                    const valueText = new PIXI.Text(this.value.toString()+ 'x', {
                        fontFamily: 'Arial',
                        fontSize: 24,
                        fill: 'white',
                        align: 'center',
                    });
                    const targetx = (reelIndex + 0.5) * symbolcontainerwidth - valueText.width/2
                    const targety = (symbolIndex + 0.5) * symbolcontainerheight - valueText.height/2
                    valueText.position.set(startingx,startingy);
                    reelcontainer.container.addChild(valueText);
                    const animationPromise = new Promise<void>((resolveAnimation) => {
                            new Tween.Tween(valueText.position)
                                .to({ x: targetx, y: targety}, animationtime)
                                .easing(Tween.Easing.Cubic.Out)
                                .onComplete(() => {
                                    reelcontainer.container.removeChild(valueText);
                                    symbol.changeValue(symbol.value + this.value).then(() => resolveAnimation())
                                })
                                .start()
                    });
                    animationPromises.push(animationPromise);
                    if (!this.quickplayon) {
                        await new Promise(resolveDelay => setTimeout(resolveDelay, 200));
                    }
                }
            }
            
            Promise.all(animationPromises).then(() => {
                resolve();
            });
        });
    }
}