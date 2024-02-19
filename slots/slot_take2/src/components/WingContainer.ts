import * as PIXI from 'pixi.js'

export function GenerateWingContainer(app : PIXI.Application<PIXI.ICanvas>,appHeight : number, appWidth : number){
    const leftwing = new PIXI.Container()
    const rightrwing = new PIXI.Container()

    const wingContainer = new PIXI.Container()
    wingContainer.addChild(rightrwing)
    wingContainer.addChild(leftwing)
    app.stage.addChild(wingContainer)

    wingContainer.width = appWidth
    wingContainer.height = appHeight
    leftwing.width  =  appWidth * 0.12
    rightrwing.width = appWidth * 0.12
    rightrwing.x = appWidth * 0.75
    leftwing.x = appWidth * 0.13

    const rightwinggraphics = new PIXI.Graphics();
    rightwinggraphics.beginFill(0xff00ff);
    rightwinggraphics.drawRect(0, 0, appWidth * 0.12 , appHeight);
    rightwinggraphics.endFill();

    const leftwinggraphics = new PIXI.Graphics();
    leftwinggraphics.beginFill(0xff00ff);
    leftwinggraphics.drawRect(0, 0, appWidth * 0.12, appHeight);
    leftwinggraphics.endFill();

    leftwing.addChild(leftwinggraphics)
    rightrwing.addChild(rightwinggraphics)

}


export function activaterightwing(app : PIXI.Application<PIXI.ICanvas> , appWidth : number){
    if(app.stage.children[1].children){
        const rightwing = app.stage.children[1].children[0] as PIXI.Container;
        animateWing(rightwing, appWidth * 0.85, 500);
    }
}


export function activateleftwing(app : PIXI.Application<PIXI.ICanvas> , appWidth : number){
    if (app.stage.children[1].children) {
        const leftwing = app.stage.children[1].children[1] as PIXI.Container;
        animateWing(leftwing, 0.03 * appWidth, 500);
    }
}

// function animateWing(wing: PIXI.Container, newX: number, duration: number) {
//     const currentX = wing.x;
//     new Tween.Tween({ x: currentX })
//         .to({ x: newX }, duration)
//         .easing(Tween.Easing.Quadratic.Out)
//         .onUpdate((obj) => {
//             wing.x = obj.x;
//         })
//         .start();

// }
export function animateWing(wing: PIXI.Container, newX: number, duration: number) {
    const currentX = wing.x;
    const startTime = Date.now();
    const updateAnimation = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const easedProgress = 1 - Math.pow(1 - progress, 2);

        const newXPosition = currentX + (newX - currentX) * easedProgress;
        wing.x = newXPosition;
        if (elapsed < duration) {
            requestAnimationFrame(updateAnimation);
        }
    };
    updateAnimation();
}