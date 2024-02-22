import * as Tween from '@tweenjs/tween.js';
import * as PIXI from 'pixi.js'
export class Wing{
    wing : PIXI.Container;
    isopen : boolean;
    constructor(appWidth: number, appHeight: number) {
        this.wing = new PIXI.Container();
        this.isopen = false;

        const winggraphics = new PIXI.Graphics();
        winggraphics.beginFill(0xff00ff);
        winggraphics.drawRect(0, 0, appWidth * 0.12, appHeight);
        winggraphics.endFill();
        this.wing.addChild(winggraphics);
    }

    animateWing( newX: number, duration: number) {
        const currentX = { x: this.wing.x };
        const tween = new Tween.Tween(currentX)
            .to({ x: newX}, duration)
            .easing(Tween.Easing.Bounce.Out)
            .onUpdate(() => {
                this.wing.x = currentX.x;
            })
            .start();
    
            const ticker = PIXI.Ticker.shared;
            ticker.add((delta) => {
                Tween.update()
            });
    
        return tween;
    }

    wigglewing( wigglesLeft: boolean, distance: number, duration: number) {
        const originalX: number = this.wing.x;
        const targetX: number = originalX + (wigglesLeft ? -distance : distance);
        const moveOutTween: Tween.Tween<{ x: number }> = new Tween.Tween({ x: originalX })
            .to({ x: targetX }, duration / 2)
            .easing(Tween.Easing.Quadratic.Out)
            .onUpdate((object) => {
                this.wing.x = object.x;
            });
    
        const bounceBackTween: Tween.Tween<{ x: number }> = new Tween.Tween({ x: targetX })
            .to({ x: originalX }, duration / 2)
            .easing(Tween.Easing.Bounce.Out)
            .onUpdate((object) => {
                this.wing.x = object.x;
            });
        moveOutTween.onComplete(() => bounceBackTween.start());
        moveOutTween.start();
        PIXI.Ticker.shared.add(() => {
            Tween.update();
        });
    }
}