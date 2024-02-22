import * as PIXI from 'pixi.js'
import * as Tween from '@tweenjs/tween.js';

export const leftwing = new PIXI.Container();
export const rightrwing = new PIXI.Container();

export function GenerateWingContainer(app: PIXI.Application<PIXI.ICanvas>, appHeight: number, appWidth: number) {
    const wingContainer = new PIXI.Container();
    wingContainer.addChild(rightrwing);
    wingContainer.addChild(leftwing);
    app.stage.addChild(wingContainer);

    wingContainer.width = appWidth;
    wingContainer.height = appHeight;
    leftwing.width = appWidth * 0.12;
    rightrwing.width = appWidth * 0.12;
    rightrwing.x = appWidth * 0.75;
    leftwing.x = appWidth * 0.13;

    const rightwinggraphics = new PIXI.Graphics();
    rightwinggraphics.beginFill(0xff00ff);
    rightwinggraphics.drawRect(0, 0, appWidth * 0.12, appHeight);
    rightwinggraphics.endFill();

    const leftwinggraphics = new PIXI.Graphics();
    leftwinggraphics.beginFill(0xff00ff);
    leftwinggraphics.drawRect(0, 0, appWidth * 0.12, appHeight);
    leftwinggraphics.endFill();

    leftwing.addChild(leftwinggraphics);
    rightrwing.addChild(rightwinggraphics);
}

export function activaterightwing(app: PIXI.Application<PIXI.ICanvas>, appWidth: number) {
    if (app.stage.children[1].children) {
        return animateWing(rightrwing, appWidth * 0.85, 1000);
    }
}

export function activateleftwing(app: PIXI.Application<PIXI.ICanvas>, appWidth: number) {
    if (app.stage.children[1].children) {
        return animateWing(leftwing, 0.03 * appWidth, 1000);
    }
}


export function animateWing(wing: PIXI.Container, newX: number, duration: number) {
    const currentX = { x: wing.x };
    const tween = new Tween.Tween(currentX)
        .to({ x: newX}, duration)
        .easing(Tween.Easing.Bounce.Out)
        .onUpdate(() => {
            wing.x = currentX.x;
        })
        .start();

        const ticker = PIXI.Ticker.shared;
        ticker.add((delta) => {
            Tween.update()
        });

    return tween;
}


export function wigglewing(wing: PIXI.Container, wigglesLeft: boolean, distance: number, duration: number) {
    const originalX: number = wing.x;
    const targetX: number = originalX + (wigglesLeft ? -distance : distance);
    const moveOutTween: Tween.Tween<{ x: number }> = new Tween.Tween({ x: originalX })
        .to({ x: targetX }, duration / 2)
        .easing(Tween.Easing.Quadratic.Out)
        .onUpdate((object) => {
            wing.x = object.x;
        });

    const bounceBackTween: Tween.Tween<{ x: number }> = new Tween.Tween({ x: targetX })
        .to({ x: originalX }, duration / 2)
        .easing(Tween.Easing.Bounce.Out)
        .onUpdate((object) => {
            wing.x = object.x;
        });
    moveOutTween.onComplete(() => bounceBackTween.start());
    moveOutTween.start();
    PIXI.Ticker.shared.add(() => {
        Tween.update();
    });
}