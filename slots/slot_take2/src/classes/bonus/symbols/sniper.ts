import * as PIXI from 'pixi.js'
import * as Tween from '@tweenjs/tween.js';
import PointSymbol from './pointssymbol';
import type { coordinates, gameinfo } from '../bonusgame';
import type { ReelContainer } from '../reelcontainer';
import crosshairTexture from '../../../assets/images/crosshair4.png';

export default class Sniper extends PointSymbol{
    constructor(id: number, symbolContainerWidth: number, symbolContainerHeight: number, value : number, location : coordinates){
        super(id,symbolContainerWidth,symbolContainerHeight,value, location);
    }

    doAction(fullinfo: gameinfo, snipethese: coordinates[], reelcontainer: ReelContainer, quickplayon: boolean, symbolcontainerwidth: number, symbolcontainerheight: number): Promise<void> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve) => {
            const animationPromises: Promise<void>[] = [];
            for (let i = 0; i < snipethese.length; i++) {
                const { reelIndex, symbolIndex } = snipethese[i];
                const targetX = (reelIndex + 0.5) * symbolcontainerwidth;
                const targetY = (symbolIndex + 0.5) * symbolcontainerheight;
                const crosshairSprite = new PIXI.Sprite(PIXI.Texture.from(crosshairTexture));
                crosshairSprite.anchor.set(0.5);
                crosshairSprite.position.set(targetX, targetY);
                reelcontainer.container.addChild(crosshairSprite);

                const animationPromise = new Promise<void>((resolveAnimation) => {
                    crosshairSprite.scale.set(0);
                    new Tween.Tween(crosshairSprite.scale)
                        .to({ x: 1, y: 1 }, quickplayon ? 300 : 600)
                        .easing(Tween.Easing.Elastic.Out)
                        .onComplete(() => {
                            new Tween.Tween(crosshairSprite.scale)
                                .to({ x: 0, y: 0 }, quickplayon ? 300 : 600)
                                .easing(Tween.Easing.Elastic.In)
                                .onComplete(() => {
                                    reelcontainer.container.removeChild(crosshairSprite);
                                    const symbol = reelcontainer.reels[reelIndex].symbols[symbolIndex].symbolcontainer;
                                    if (symbol instanceof PointSymbol) {
                                        symbol.changeValue(symbol.value * this.value).then(resolveAnimation);
                                    }
                                })
                                .start();
                        })
                        .start();
                });
                animationPromises.push(animationPromise);
                if (!quickplayon) await new Promise(resolveDelay => setTimeout(resolveDelay, 200));
            }
            Promise.all(animationPromises).then(() => resolve);
        });
    }
}