import * as PIXI from 'pixi.js'
import * as Tween from '@tweenjs/tween.js';
import PointSymbol from './pointssymbol';
import type { coordinates, gameinfo } from '../bonusgame';
import type { ReelContainer } from '../reelcontainer';
import crosshairTexture from '../../../assets/images/crosshair1.png';
import { data } from '@/assets/Data';
import { gsap } from 'gsap';

export default class Sniper extends PointSymbol{
    constructor(id: number, symbolContainerWidth: number, symbolContainerHeight: number, value : number, location : coordinates  , quickplayon : boolean , skiped : boolean){
        super(id,symbolContainerWidth,symbolContainerHeight,value, location,quickplayon,skiped);
    }

    doAction(fullinfo: gameinfo, snipethese: coordinates[], reelcontainer: ReelContainer,  symbolcontainerwidth: number, symbolcontainerheight: number): Promise<void> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve) => {
            const animationPromises: Promise<void>[] = [];
            for (let i = 0; i < snipethese.length; i++) {
                const animationtime = this.skiped ? data.animation_speed.special.sniper.skip : (this.quickplayon?data.animation_speed.special.sniper.quickplay : data.animation_speed.special.sniper.normal)
                const { reelIndex, symbolIndex } = snipethese[i];
                const targetX = (reelIndex + 0.5) * symbolcontainerwidth;
                const targetY = (symbolIndex + 0.5) * symbolcontainerheight;
                const initialWidth = symbolcontainerwidth * 0.8;
                const initialHeight = symbolcontainerheight * 0.8;
    
                const crosshairSprite = new PIXI.Sprite(PIXI.Texture.from(crosshairTexture));
                crosshairSprite.position.set(targetX, targetY);
                crosshairSprite.width = initialWidth;
                crosshairSprite.height = initialHeight;
                crosshairSprite.anchor.set(0.5);
                reelcontainer.container.addChild(crosshairSprite);
    
                const animationPromise = new Promise<void>((resolveAnimation) => {
                    const enlargedWidth = initialWidth * 1.2;
                    const enlargedHeight = initialHeight * 1.2;
    
                    new Tween.Tween({ width: initialWidth, height: initialHeight })
                        .to({ width: enlargedWidth, height: enlargedHeight }, animationtime)
                        .easing(Tween.Easing.Elastic.Out)
                        .onUpdate(({ width, height }) => {
                            crosshairSprite.width = width;
                            crosshairSprite.height = height;
                        })
                        .onComplete(() => {
                            // Shrink the sprite back to its original size
                            new Tween.Tween({ width: enlargedWidth, height: enlargedHeight })
                                .to({ width: initialWidth, height: initialHeight }, animationtime)
                                .easing(Tween.Easing.Elastic.In)
                                .onUpdate(({ width, height }) => {
                                    crosshairSprite.width = width;
                                    crosshairSprite.height = height;
                                })
                                .onComplete(() => {
                                    // Remove the sprite after animation
                                    reelcontainer.container.removeChild(crosshairSprite);
                                    const symbol = reelcontainer.reels[reelIndex].symbols[symbolIndex].symbolcontainer;
                                    if (symbol instanceof PointSymbol) {
                                        symbol.changeValue(symbol.value * this.value).then(() => {})
                                    }
                                    resolveAnimation()
                                })
                                .start();
                        })
                        .start();
                });
    
                animationPromises.push(animationPromise);
                await animationPromise;
                if (!this.quickplayon && !this.skiped) await new Promise(resolveDelay => setTimeout(resolveDelay, 50));
            }
            Promise.all(animationPromises).then(async () => {
                resolve()
            });
        });
    }
}