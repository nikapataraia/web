import { slotTextures } from '@/assets/Data_textures';
import * as PIXI from 'pixi.js';
import * as Tween from '@tweenjs/tween.js';

export default class SymbolTexture {
    symbolTexture: PIXI.Sprite;
    container: PIXI.Container;
    symbolContainerWidth: number;
    symbolContainerHeight: number;
    animationInProgress: boolean = false;
    symbolid : number
    value : number;

    constructor(symbolContainerWidth: number, symbolContainerHeight: number, textureId: number) {
        const texture = slotTextures[textureId];
        this.value = 1;
        this.symbolid = textureId
        this.symbolTexture = new PIXI.Sprite(texture);
        this.symbolTexture.width = symbolContainerWidth;
        this.symbolTexture.height = symbolContainerHeight;
        this.container = new PIXI.Container();
        this.container.width = symbolContainerWidth;
        this.container.height = symbolContainerHeight;

        this.container.addChild(this.symbolTexture);
        this.symbolContainerHeight = symbolContainerHeight;
        this.symbolContainerWidth = symbolContainerWidth;

        const mask = new PIXI.Graphics();
        mask.beginFill(0xffffff);
        mask.drawRect(0, 0, symbolContainerWidth, symbolContainerHeight);
        mask.endFill();
        this.container.mask = mask;
        this.container.addChild(mask);

        PIXI.Ticker.shared.add(() => {
            Tween.update();
        });

        if(textureId !== 0){
            this.generatevalue()
        }
    }

    animateTexture(textureSet: number[] , value : number) {
        if (this.animationInProgress) return;
        this.animationInProgress = true;
    
        this.symbolTexture.y = 0;
        const textures = textureSet.map(element => slotTextures[element]);
        let curTexture = this.symbolTexture;
    
        const animateRazgon = (sprite_cur: PIXI.Sprite, sprite_bot: PIXI.Sprite, onComplete: () => void) => {
            const tweenCur = new Tween.Tween({ y: sprite_cur.y })
                .to({ y: sprite_cur.y - this.symbolContainerHeight * 0.1 }, 150)
                .easing(Tween.Easing.Linear.None)
                .onUpdate(object => {
                    sprite_cur.y = object.y;
                })
                .yoyo(true)
                .repeat(1);

            const tweenBot = new Tween.Tween({ y: sprite_bot.y })
                .to({ y: sprite_bot.y - this.symbolContainerHeight * 0.1 }, 150)
                .easing(Tween.Easing.Linear.None)
                .onUpdate(object => {
                    sprite_bot.y = object.y;
                })
                .yoyo(true)
                .repeat(1);

            Promise.all([
                new Promise(resolve => tweenCur.onComplete(resolve)),
                new Promise(resolve => tweenBot.onComplete(resolve))
            ]).then(onComplete);

            tweenCur.start();
            tweenBot.start();
        };


    
        const animateReverse = (sprite_bot: PIXI.Sprite, sprite_top: PIXI.Sprite, onComplete: () => void) => {
            const tweenBot = new Tween.Tween({ y: sprite_bot.y })
                .to({ y: sprite_bot.y + this.symbolContainerHeight * 0.2 }, 350)
                .easing(Tween.Easing.Linear.None)
                .onUpdate(object => {
                    sprite_bot.y = object.y;
                })
                .yoyo(true)
                .repeat(1);

            const tweenTop = new Tween.Tween({ y: sprite_top.y })
                .to({ y: sprite_top.y + this.symbolContainerHeight * 0.2 }, 350)
                .easing(Tween.Easing.Linear.None)
                .onUpdate(object => {
                    sprite_top.y = object.y;
                })
                .yoyo(true)
                .repeat(1);

            Promise.all([
                new Promise(resolve => tweenBot.onComplete(resolve)),
                new Promise(resolve => tweenTop.onComplete(resolve))
            ]).then(onComplete);
            tweenBot.start();
            tweenTop.start();
        };
        
        const bottexture = new PIXI.Sprite(textures[0])
        bottexture.width = this.symbolContainerWidth
        bottexture.height = this.symbolContainerHeight
        bottexture.y = this.symbolContainerHeight
        this.container.addChild(bottexture)

    
        animateRazgon(curTexture, bottexture, () => {
            let currentIndex = 2;
            this.container.removeChild(bottexture)
    
            const loopAnimation = () => {
                if (currentIndex >= textureSet.length - 1) {
                    const toptexture = new PIXI.Sprite(textures[textures.length - 1])
                    toptexture.width = this.symbolContainerWidth
                    toptexture.height = this.symbolContainerHeight
                    toptexture.y = -this.symbolContainerHeight
                    this.container.addChild(toptexture)
                    animateReverse(curTexture,toptexture, () => {
                        this.container.removeChild(toptexture)
                        this.animationInProgress = false;
                        if(this.symbolid !== 0){
                            this.value = value
                            this.generatevalue()
                        }
                    });
                    return;
                }
                const texture = textures[currentIndex++];
                const newTexture = new PIXI.Sprite(texture);
                newTexture.width = this.symbolContainerWidth;
                newTexture.height = this.symbolContainerHeight;
                newTexture.y = -this.symbolContainerHeight;
                this.container.addChild(newTexture);
    
                new Tween.Tween({ y: newTexture.y })
                    .to({ y: 0 }, 100)
                    .easing(Tween.Easing.Linear.None)
                    .onUpdate(object => {
                        newTexture.y = object.y;
                    })
                    .start();

                new Tween.Tween({ y: curTexture.y })
                    .to({ y: this.symbolContainerHeight }, 100)
                    .easing(Tween.Easing.Linear.None)
                    .onUpdate(object => {
                        curTexture.y = object.y;
                    })
                    .onComplete(() => {
                        this.container.removeChild(curTexture);
                        curTexture = newTexture;
                        this.symbolTexture = curTexture
                        // this.container.addChild(curTexture)
                        loopAnimation();
                    })
                    .start();

            };
    
            loopAnimation();
        });
    }


    generatevalue(){
        const valuetext = new PIXI.Text(`${this.value}x`, {
            fontFamily: 'Arial', 
            fontSize: 24, 
            fill: 'white', 
            align: 'center' 
        });
        valuetext.x = (this.symbolContainerWidth - valuetext.width) / 2;
        valuetext.y = (this.symbolContainerHeight - valuetext.height) / 2;

        this.container.addChild(valuetext);
    }
}