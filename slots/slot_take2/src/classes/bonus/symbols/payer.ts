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
        return new Promise<void>((resolve) => {
            const animationPromises: Promise<void>[] = [];
            const reels = reelcontainer.reels
            payThese.forEach((cords) => {
                const { reelIndex, symbolIndex } = cords;
                const reel = reels[reelIndex];
                const symbol = reel.symbols[symbolIndex];

                if (symbol instanceof PointSymbol) {
                    const newValue = symbol.value + this.value;

                    const valueText = new PIXI.Text(`+${this.value}`, {
                        fontFamily: 'Arial',
                        fontSize: 24,
                        fill: 'white',
                        align: 'center',
                    });
                    valueText.position.set(this.container.x, this.container.y);
                    reel.container.addChild(valueText);

                    const symbolPosition = { x: symbol.container.x, y: symbol.container.y };
                    const animationPromise = new Promise<void>((resolveAnimation) => {
                        new Tween.Tween(valueText.position)
                            .to(symbolPosition, quickplayon ? 500 : 1500)
                            .easing(Tween.Easing.Cubic.Out)
                            .onComplete(() => {
                                reel.container.removeChild(valueText);
                                symbol.changeValue(newValue);
                                resolveAnimation();
                            })
                            .start();
                    });

                    animationPromises.push(animationPromise);
                }
            });

            Promise.all(animationPromises).then(() => {
                resolve();
            });
        });
    }
}