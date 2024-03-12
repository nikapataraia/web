import * as PIXI from 'pixi.js'
import * as Tween from '@tweenjs/tween.js';
import PointSymbol from './pointssymbol';
import type { coordinates, gameinfo } from '../bonusgame';
import type { ReelContainer } from '../reelcontainer';

export default class Collector extends PointSymbol{
    constructor(id: number, symbolContainerWidth: number, symbolContainerHeight: number, value : number, location : coordinates){
        super(id,symbolContainerWidth,symbolContainerHeight,value, location);
    }

    doAction(fullinfo: gameinfo, collectThese: coordinates[], reelcontainer: ReelContainer, quickplayon: boolean, symbolcontainerwidth: number, symbolcontainerheight: number): Promise<void> {
        return new Promise((resolve) => {
            let totalCollectedValue = 0;
            const animationPromises: Promise<void>[] = [];
            const targetx = (this.location.reelIndex + 0.5) * symbolcontainerwidth
            const targety = (this.location.symbolIndex + 0.5) * symbolcontainerheight
            for (let i = 0; i < collectThese.length; i++) {
                const coord = collectThese[i];
                const { reelIndex, symbolIndex } = coord;
                const reel = reelcontainer.reels[reelIndex];
                const symbol = reel.symbols[symbolIndex].symbolcontainer;
                
                if (symbol instanceof PointSymbol) {
                    totalCollectedValue += symbol.value;
                    const valueText = new PIXI.Text(symbol.value.toString(), {
                        fontFamily: 'Arial',
                        fontSize: 24,
                        fill: 'white',
                        align: 'center',
                    });
                    valueText.position.set((reelIndex + 0.5) * symbolcontainerwidth, (symbolIndex + 0.5) * symbolcontainerheight);
                    reelcontainer.container.addChild(valueText);
                    const animationPromise = new Promise<void>((resolveAnimation) => {
                    new Tween.Tween(valueText.position)
                                .to({ x: targetx, y: targety}, quickplayon ? 500 : 1500)
                                .easing(Tween.Easing.Cubic.Out)
                                .onComplete(() => {
                                    reelcontainer.container.removeChild(valueText);
                                    resolveAnimation();
                                })
                                .start();
                    });
                    animationPromises.push(animationPromise);

                }
            }
            
            Promise.all(animationPromises).then(() => {
                this.changeValue(this.value + totalCollectedValue).then(() => {
                    resolve();
                });
            });
        });
    }
}