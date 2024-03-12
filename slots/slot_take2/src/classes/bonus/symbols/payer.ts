import * as PIXI from 'pixi.js'
import { slotTextures } from '@/assets/Data_textures';
import * as Tween from '@tweenjs/tween.js';
import PointSymbol from './pointssymbol';
import type { coordinates, gameinfo } from '../bonusgame';
import type { Reel } from '../reel';
import type { ReelContainer } from '../reelcontainer';

export default class Payer extends PointSymbol {
    constructor(id: number, symbolContainerWidth: number, symbolContainerHeight: number, value: number, location : coordinates) {
        super(id, symbolContainerWidth, symbolContainerHeight, value, location);
    }

    doAction(fullinfo: gameinfo, payThese: coordinates[], reelcontainer : ReelContainer,quickplayon: boolean, symbolcontainerwidth : number, symbolcontainerheight : number): Promise<void> {
        return new Promise((resolve) => {
            const animationPromises: Promise<void>[] = [];
            const startingx = (this.location.reelIndex + 0.5) * symbolcontainerwidth
            const startingy = (this.location.symbolIndex + 0.5) * symbolcontainerheight
            console.log(this)
            for (let i = 0; i < payThese.length; i++) {
                const coord = payThese[i];
                const delay = quickplayon ? 100 : 1700;
                const { reelIndex, symbolIndex } = coord;
                const reel = reelcontainer.reels[reelIndex];
                const symbol = reel.symbols[symbolIndex].symbolcontainer;
                
                if (symbol instanceof PointSymbol) {
                    const targetx = (reelIndex + 0.5) * symbolcontainerwidth
                    const targety = (symbolIndex + 0.5) * symbolcontainerheight
                    const valueText = new PIXI.Text(this.value.toString(), {
                        fontFamily: 'Arial',
                        fontSize: 24,
                        fill: 'white',
                        align: 'center',
                    });
                    valueText.position.set(startingx,startingy);
                    reelcontainer.container.addChild(valueText);
                    const animationPromise = new Promise<void>((resolveAnimation) => {
                            new Tween.Tween(valueText.position)
                                .to({ x: targetx, y: targety}, quickplayon ? 500 : 1500)
                                .easing(Tween.Easing.Cubic.Out)
                                .onComplete(() => {
                                    reelcontainer.container.removeChild(valueText);
                                    symbol.changeValue(symbol.value + this.value).then(() => resolveAnimation())
                                })
                                .start()
                    });
                    
                    animationPromises.push(animationPromise);
                }
            }
            
            Promise.all(animationPromises).then(() => {
                resolve();
            });
        });
    }
}