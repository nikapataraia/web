import * as PIXI from 'pixi.js'
import * as Tween from '@tweenjs/tween.js';
import PointSymbol from './pointssymbol';
import type { coordinates, gameinfo } from '../bonusgame';
import type { Reel } from '../reel';

export default class Collector extends PointSymbol{
    constructor(id: number, symbolContainerWidth: number, symbolContainerHeight: number, value : number, location : coordinates){
        super(id,symbolContainerWidth,symbolContainerHeight,value, location);
    }

    doAction(fullinfo: gameinfo, collectThese: coordinates[], reels: Reel[], quickplayon: boolean , symbolcontainerwidth : number, symbolcontainerheight : number): Promise<void> {
        return new Promise<void>((resolve) => {
            let totalCollectedValue = 0;
            const animationPromises: Promise<void>[] = [];
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms)); 
            
            collectThese.forEach(async coord => {
                await quickplayon ? delay(0) : delay(700)
                const { reelIndex, symbolIndex } = coord;
                const reel = reels[reelIndex];
                const symbol = reel.symbols[symbolIndex];
    
                if (symbol instanceof PointSymbol) {
                    totalCollectedValue += symbol.value;
    
                    const valueText = new PIXI.Text(symbol.value.toString(), {
                        fontFamily: 'Arial',
                        fontSize: 24,
                        fill: 'white',
                        align: 'center',
                    });
                    valueText.position.set(symbol.container.x, symbol.container.y);
                    reel.container.addChild(valueText);
    
                    const collectorPosition = { x: this.container.x, y: this.container.y };
                    const animationPromise = new Promise<void>((resolveAnimation) => {
                        new Tween.Tween(valueText.position)
                            .to(collectorPosition, quickplayon ? 500 : 1500)
                            .easing(Tween.Easing.Cubic.Out)
                            .onComplete(() => {
                                reel.container.removeChild(valueText);
                                resolveAnimation();
                            })
                            .start();
                    });
    
                    animationPromises.push(animationPromise);
                }
            });
    
            Promise.all(animationPromises).then(() => {
                this.changeValue(this.value + totalCollectedValue);
                resolve();
            });
        });
    }
}