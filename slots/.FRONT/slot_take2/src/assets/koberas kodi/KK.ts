import Data from "../data/data.js";
import Slot from "./Slot.js";
import * as Enums from "../enums/enums.js";
import componentConfigs from "../statics/componentConfigs.js";
import config from "../config.js";
import Phaser from "phaser";

export default class Plinko extends Phaser.GameObjects.Container {
    private _poles: Phaser.Physics.Arcade.Sprite[][] = [];
    private _cube: Phaser.Physics.Arcade.Sprite;
    private _scene: Phaser.Scene;
    private _height: number;
    private _mask: Phaser.GameObjects.Graphics;
    private _multipliers: Phaser.Physics.Arcade.Sprite[];
    private _multiplierTexts: Phaser.GameObjects.Text[];
    private _plinkoMargin: number;
    private _onMultiplierColision: (game: ServerLayer.EightBIT2048GameDTO) => void;
    private _background: Phaser.GameObjects.Sprite;
    private _mainContainer: Phaser.GameObjects.Container;
    private _highScoreContainer: Phaser.GameObjects.Container;
    private _highScoreContainerBackground: Phaser.GameObjects.Container;
    private _highScoreBackground: Phaser.GameObjects.Sprite;
    private _highScores: number[][] = [];
    private _previousHighscores: number[][];
    private _cubes: Phaser.Physics.Arcade.Sprite[] = [];
    private _bounced: boolean;
    private _highScoreMask: Phaser.GameObjects.Graphics;
    private _highScoreText: Phaser.GameObjects.Text;
    private _backgroundHat: Phaser.GameObjects.Sprite;
    private _highLighArray: { cube: Phaser.GameObjects.Sprite, multiplier: number, trigger: Phaser.GameObjects.Sprite }[] = [];
    private _hatText: Phaser.GameObjects.Text;
    private _changeTextTween: Phaser.Tweens.Tween;
    private _idleInterval: any;
    private _backgroundHatAnimation: Phaser.GameObjects.Sprite;
    private _bounceSpeed: number = - 100;
    private _poleSizes: number = 5;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this._scene = scene
        this._plinkoMargin = (componentConfigs.plinkoConfig.height - 20) / (Data.plinkoSize + 3)
        this._background = new Phaser.GameObjects.Sprite(this._scene, 0, 0, 'plinkoBackground').setDisplaySize(componentConfigs.plinkoConfig.width, componentConfigs.plinkoConfig.height).setY(0)
        this._backgroundHat = new Phaser.GameObjects.Sprite(this._scene, 0, 0, 'plinkoBackgroundHat').setDisplaySize(componentConfigs.plinkoConfig.hatWidth, componentConfigs.plinkoConfig.hatHeight).setY(this._background.y - this._background.displayHeight / 2 - componentConfigs.plinkoConfig.hatHeight / 2)
        this._backgroundHatAnimation = new Phaser.GameObjects.Sprite(this._scene, 0, 0, 'bigWinPlinko').setDisplaySize(componentConfigs.plinkoConfig.hatWidth, componentConfigs.plinkoConfig.hatHeight).setY(this._background.y - this._background.displayHeight / 2 - componentConfigs.plinkoConfig.hatHeight / 2).setVisible(false)
        this._hatText = new Phaser.GameObjects.Text(this._scene, this._backgroundHat.x, this._backgroundHat.y - 7, 'GOOD LUCK', {}).setOrigin(0.5, 0.5).setFontSize(12).setFontFamily('retroComputer').setColor('#2CE8F5').setStroke('#002645', 3).setResolution(10)
        this.add([this._background, this._backgroundHat, this._hatText, this._backgroundHatAnimation])
        this._mainContainer = new Phaser.GameObjects.Container(this._scene, 0, 0)
        this.add(this._mainContainer)
        this._addPoles();
        this._addMultipliers();
        this._addInfoMap();
        this._addHighScorePanel();
        this._addMasks();
        this._scene.events.on('toggleDoubleChance', () => {
            this._switchDoubleChance()
        })
        this._wigglePole(true)
        //this._backgroundHat.play('goodLuckAnimation')
        //this._scene.lights.enable();      
        //this._scene.lights.setAmbientColor(0x9c9c9c);
    }
    // private _addMasks(): void {
    //     this._mask = this._scene.make.graphics({ add: false })
    //         .fillStyle(1000000, 0.3)
    //         .fillRect(0, 0, componentConfigs.plinkoConfig.width, componentConfigs.plinkoConfig.height);
    //     this._mainContainer.mask = new Phaser.Display.Masks.GeometryMask(this._scene, this._mask);
    //     this._highScoreMask = this._scene.make.graphics({ add: false })
    //         .fillStyle(1000000, 0.3)
    //         .fillRect(0, 0, componentConfigs.plinkoConfig.infoWidth, componentConfigs.plinkoConfig.infoHeight);
    //     this._highScoreContainerBackground.mask = new Phaser.Display.Masks.GeometryMask(this._scene, this._highScoreMask);
    // }
    private _wigglePole(start: boolean) {
        if (start) {
            this._idleInterval = setInterval(() => {
                let poles = [].concat(...this._poles);
                poles.forEach((pole, index) => {
                    this._scene.add.tween({
                        delay: index * 10,
                        targets: pole,
                        x: pole.x - 1.5,
                        duration: 30,
                        repeat: 0,
                        yoyo: true,
                        onComplete: () => {
                        }
                    })
                })
            }, 5000)
        } else {
            this._idleInterval && clearInterval(this._idleInterval)
            this._idleInterval = null
        }     
    }
    public hide(): void {
        this.setVisible(!Data.isBonus)
    }  
    // private _addInfoMap(): void {
    //     let map = [1, 8, 16, 128, 256, 2048]
    //     let infoMap: Phaser.GameObjects.Sprite[] = []
    //     let margin = 40
    //     for (let i = 0; i < map.length; i++) {
    //         let cubePic: Phaser.GameObjects.Sprite = new Phaser.GameObjects.Sprite(this._scene, margin * i, 0, 'plinkoBalls', `${map[i]}.png`).setDisplaySize(30, 30)/*.setRotation(Math.PI/4)*/
    //         //let cubeText: Phaser.GameObjects.Text = new Phaser.GameObjects.Text(this._scene, cubePic.x, cubePic.y + cubePic.displayHeight, `${Math.pow(2, i)}x`, {}).setOrigin(0.5, 0.5).setFontFamily('retroComputer').setResolution(10).setFontSize(7)
    //         let cubeInfoContainer: Phaser.GameObjects.Container = new Phaser.GameObjects.Container(this._scene, 0, 0).setPosition((-margin * (map.length - 1)) / 2, this._background.displayHeight / 2 + 20)
    //         let trigger: Phaser.GameObjects.Sprite = new Phaser.GameObjects.Sprite(this._scene, cubePic.x, cubePic.y, 'basicBonusTrigger').setDisplaySize(30, 30)/*.setRotation(Math.PI / 4)*/
    //         cubeInfoContainer.add([cubePic, trigger/*, cubeText*/])
    //         this.add(cubeInfoContainer)
    //         this._highLighArray.push({ cube: cubePic, multiplier: map[i], trigger: trigger })
    //     }
    // }
    // private _activateHighlight(game: ServerLayer.EightBIT2048GameDTO, active: boolean, finished?: boolean) {
    //     if (game.BallMultiplier > 0) {
    //         if (active) {
    //             this._highLighArray.forEach((highLight: { cube: Phaser.GameObjects.Sprite, multiplier: number, trigger: Phaser.GameObjects.Sprite }) => {
    //                 if (game.BallMultiplier === highLight.multiplier) {
    //                     //highLight.cube.displayHeight !== 28 && highLight.cube.setDisplaySize(28, 28)
    //                     if (!highLight.trigger.anims.isPlaying) {
    //                         highLight.trigger.setVisible(true)
    //                         highLight.trigger.play(`info${highLight.multiplier}`).setDisplaySize(highLight.cube.displayWidth , highLight.cube.displayHeight)
    //                     }
    //                 }
    //             })
    //         } else {
    //             this._highLighArray.forEach((highLight: { cube: Phaser.GameObjects.Sprite, multiplier: number, trigger: Phaser.GameObjects.Sprite }) => {
    //                 if (game.BallMultiplier === highLight.multiplier) {
    //                     let notFound = true
    //                     Data.plinkoBall.forEach(game => { if (game.BallMultiplier === highLight.multiplier) { notFound = false } })
    //                     if (notFound) {
    //                         highLight.trigger.anims.stop()
    //                         highLight.trigger.setVisible(false)
    //                     } else {
    //                         !highLight.trigger.anims.isPlaying && highLight.trigger.play(`info${highLight.multiplier}`).setDisplaySize(highLight.cube.displayWidth, highLight.cube.displayHeight)
    //                     }                     
    //                 }
    //             })
    //         }
    //     }
    // }

    // public bigWinAnimation(win: number, multiplier: number) {
    //     this._hatText.setText((Data.currency.MaxMultiplier === multiplier || win === Data.currency.MaxWin) ? 'MAX WIN' : `${multiplier}X`).setColor('#FFFFFF').setStroke('#050234', 3)
    //     this._backgroundHatAnimation.setVisible(true).play('bigWinPlinko')
    //     this._backgroundHatAnimation.on('animationcomplete', () => {
    //         this._backgroundHatAnimation.setVisible(false)
    //     })
    //     if (this._changeTextTween) {
    //         this._changeTextTween.stop()
    //         this._changeTextTween = null
    //     }
    //     this._changeTextTween = this._scene.add.tween({
    //         targets: this._hatText,
    //         scale: 1.3,
    //         repeat: 4,
    //         yoyo: true,
    //         duration: 300,
    //         onStart: () => {
    //             this._hatText.setScale(1)
    //         },
    //         onComplete: () => {
    //             this._hatText.setText(`GOOD LUCK`).setColor('#2CE8F5').setStroke('#002645', 3)
    //             this._hatText.setScale(1)
    //             //this._backgroundHat.play('goodLuckAnimation')
    //         }
    //     })
    // }

    // private _addHighScorePanel() {
    //     this._highScoreContainerBackground = new Phaser.GameObjects.Container(this._scene, 0, 0).setPosition(0, this._backgroundHat.y - this._backgroundHat.displayHeight / 2 - componentConfigs.plinkoConfig.infoHeight / 2)
    //     this._highScoreContainer = new Phaser.GameObjects.Container(this._scene, 0, 0)
    //     this._highScoreBackground = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'highScorePanelBackground').setDisplaySize(componentConfigs.plinkoConfig.infoWidth, componentConfigs.plinkoConfig.infoHeight / 1.8)
    //     this._highScoreText = new Phaser.GameObjects.Text(this.scene, 0, 0, 'HIGHSCORE', {}).setFontFamily('GameFont').setFontSize(22).setResolution(10).setOrigin(0.5, 0.5).setColor('#1C1830').setY(1)

    //     this._highScoreContainerBackground.add([this._highScoreBackground, this._highScoreText, this._highScoreContainer])
    //     this.add(this._highScoreContainerBackground)
    // }

    // private _switchDoubleChance() {


    //     if (Data.doubleChance) {
    //         this._background.setTexture('plinkoBackgroundTwoX')
    //         this._backgroundHat.setTexture('plinkoBackgroundHatTwoX')
    //     } else {
    //         this._background.setTexture('plinkoBackground')
    //         this._backgroundHat.setTexture('plinkoBackgroundHat')
    //     }
    // }

    // private _addHighScore(ballMultiplier: number, multiplier: number): void {
    //     let newHighScore = true 
    //     let margin = 5
    //     let startX = -this._highScoreBackground.displayWidth / 2 
    //     function sortFunction(a, b) {
    //         if (a[0] === b[0]) {
    //             return 0;
    //         }
    //         else {
    //             return (a[0] > b[0]) ? -1 : 1;
    //         }
    //     }
    //     function secondSortFunction(a, b) {
    //         if (a[1] + a[0] === b[1] + b[0]) {
    //             return 0;
    //         }
    //         else {
    //             return (b[1] + b[0] > b[1] + b[0]) ? -1 : 1;
    //         }
    //     }
    //     this._highScores.forEach(highScore => {
    //         if (multiplier > highScore[1]) {
    //             newHighScore = true
    //         }
    //     })       
    //     if (!newHighScore || multiplier === 0) {
    //         return
    //     }
    //     this._highScores.push([multiplier, ballMultiplier])
    //     this._highScores.sort(sortFunction)
    //     this._highScores.length > 15 && this._highScores.splice(15, this._highScores.length - 15)
    //     this._highScores.sort(secondSortFunction)
    //     if (JSON.stringify(this._previousHighscores) === JSON.stringify(this._highScores)) {
    //         return
    //     }
    //     this._highScoreContainer.setAlpha(1)   
    //     this._scene.tweens.add({
    //         targets: this._highScoreContainer,
    //         duration: 100,
    //         yoyo: true,
    //         alpha: 0,
    //         repeat: 0,
    //         ease: 'Linear',
    //         onStart: () => {              
    //         },
    //         onYoyo: () => {    
    //             this._highScoreContainer.removeAll(true)
    //             this._highScores.forEach((highScore, index) => {
    //                 let highScoreBall
    //                 if (highScore[1] === 0) {
    //                     highScoreBall = new Phaser.GameObjects.Sprite(this._scene, 0, 0, `slot`, `1.png`)
    //                 } else {
    //                     highScoreBall = new Phaser.GameObjects.Sprite(this._scene, 0, 0, `plinkoBalls`, `${highScore[1]}.png`)
    //                 }
    //                 let lastElem: any = this._highScoreContainer.list[this._highScoreContainer.list.length - 1]
    //                 lastElem && (startX = lastElem.x + lastElem.displayWidth / 2 + margin * 2)
    //                 highScoreBall.setDisplaySize(25, 25).setPosition(startX + highScoreBall.displayWidth / 2, 0)
    //                 let totalMultiplier = new Phaser.GameObjects.Text(this._scene, 0, 0, `${highScore[0]}x`, {}).setResolution(10).setOrigin(0.5, 0.5).setFontFamily('retroComputer').setFontSize(11).setColor('#FBCF3A')
    //                 totalMultiplier.setPosition(highScoreBall.x + highScoreBall.displayWidth / 2 + totalMultiplier.displayWidth / 2 + margin, highScoreBall.y)
    //                 this._highScoreContainer.add([highScoreBall, totalMultiplier])
    //             })
    //             this._previousHighscores = [...this._highScores]
    //         },
    //         onComplete: () => {
    //             this._highScoreContainer.setY(0).setAlpha(1)
    //         }
    //     });                    
    // }
    // private _resizeHighscores(): void { 
    //     let margin = 5
    //     let startX = -this._highScoreBackground.displayWidth / 2 
    //     this._highScoreContainer.removeAll(true)
    //     this._highScores.forEach((highScore, index) => {
    //         let highScoreBall
    //         if (highScore[1] === 0) {
    //             highScoreBall = new Phaser.GameObjects.Sprite(this._scene, 0, 0, `slot`, `1.png`)
    //         } else {
    //             highScoreBall = new Phaser.GameObjects.Sprite(this._scene, 0, 0, `plinkoBalls`, `${highScore[1]}.png`)
    //         }
    //         let lastElem: any = this._highScoreContainer.list[this._highScoreContainer.list.length - 1]
    //         lastElem && (startX = lastElem.x + lastElem.displayWidth / 2 + margin * 2)
    //         highScoreBall.setDisplaySize(25, 25).setPosition(startX + highScoreBall.displayWidth / 2, 0)
    //         let totalMultiplier = new Phaser.GameObjects.Text(this._scene, 0, 0, `${highScore[0]}x`, {}).setResolution(10).setOrigin(0.5, 0.5).setFontFamily('retroComputer').setFontSize(11).setColor('#FBCF3A')
    //         totalMultiplier.setPosition(highScoreBall.x + highScoreBall.displayWidth / 2 + totalMultiplier.displayWidth / 2 + margin, highScoreBall.y)
    //         this._highScoreContainer.add([highScoreBall, totalMultiplier])
    //     })
    //     this._previousHighscores = [...this._highScores]
    // }
    private _addPoles(): void {
        for (let i = 0; i <= Data.plinkoSize; i++) {
            this._poles[i] = []
            for (let j = 0; j <= i; j++) {
                //this._poles[i][j] = new Phaser.GameObjects.Sprite(this._scene, 0, 0, 'pole')
                this._poles[i][j] = this._scene.physics.add.sprite(0, 0, 'pole')/*.setPipeline('Light2D')*/
                let startY = -componentConfigs.plinkoConfig.height / 2 + 25    
                this._poles[i][j].setDisplaySize(this._poleSizes, this._poleSizes).setPosition((this._plinkoMargin * j) - (i * this._plinkoMargin) / 2, startY + (this._plinkoMargin * i))
                this._poles[i][j].setImmovable(true)
                this._mainContainer.add(this._poles[i][j])
            }
        }
    }
    private _addMultipliers(): void {
        this._multipliers = []
        this._multiplierTexts = []
        let muliplierMargin = 7
        let startX = this._poles[Data.plinkoSize][0].x - this._plinkoMargin / 2
        let sizeDifferences = [3,1,-1,-2,0,-2,-1,1,3]
        let cloneMultiplers = [...Data.plinkoMultipliers]
        for (let i = 0; i < cloneMultiplers.length - 1; i++) {
            if (i > 0 && cloneMultiplers[i + 1] === cloneMultiplers[i]) {
                cloneMultiplers.splice(i, 1)
                i--
            }
        }

        let totalWidth = this._plinkoMargin * (Data.plinkoSize + 2)
        cloneMultiplers.forEach((multiplier, i) => {
            let sizes = this._calcMultiplierSize(multiplier, totalWidth, cloneMultiplers.length, muliplierMargin)
            this._multiplierTexts[i] = this._scene.add.text(0, this._background.displayHeight / 2 - 15, `${(cloneMultiplers[i < cloneMultiplers.length ? i : (Data.plinkoSize + 1 - i)])}X`)
            this._multipliers[i] = this._scene.physics.add.sprite(0, this._multiplierTexts[i].y - this._multiplierTexts[i].displayHeight / 2 - 2, 'plinkoMultipliers', `${cloneMultiplers[i]}`)
            this._multipliers[i].setImmovable(true).setDisplaySize(sizes.width + sizeDifferences[i], sizes.height).setX(i === 0 ? startX : this._multipliers[i - 1].x + (this._multipliers[i - 1].displayWidth - sizeDifferences[i - 1]) / 2 + (this._multipliers[i].displayWidth - sizeDifferences[i]) / 2 + muliplierMargin).setOrigin(0.5, 1)
            this._multiplierTexts[i].setOrigin(0.5, 1).setFontSize(11).setResolution(10).setFontFamily('retroComputer').setX(this._multipliers[i].x)
            let smoke = this._scene.add.sprite(this._multipliers[i].x, 0, 'smoke', '')
            smoke.setOrigin(0.5, 1).setScale(0.45).setY(this._multipliers[i].y - this._multipliers[i].displayHeight + smoke.displayHeight / 2).setVisible(false)
            this._multipliers[i].setData('smoke', smoke)
            this._multipliers[i].setData('multiplierValue', cloneMultiplers[i])
            this._multipliers[i].setData('position', { x: this._multipliers[i].x, y: this._multipliers[i].y })
            this._multipliers[i].setData('index', i)
            this._mainContainer.add([smoke,this._multipliers[i], this._multiplierTexts[i]])
        })
    }
    // private _calcMultiplierSize(multiplier: number, totalWidth: number, multipliersCount: number, margin: number) {
    //     let width = (totalWidth) / (multipliersCount + 2)
    //     let height
    //     switch (multiplier) {
    //         case 16:
    //             height = 45;
    //             break;
    //         case 4:
    //             height = 40;
    //             break;
    //         case 2:
    //             height = 35;
    //             break;
    //         case 1:
    //             height = 30;
    //             break;
    //         case 0:
    //             width = (totalWidth * 3) / (multipliersCount + 2);
    //             height = 25;
    //             break;
    //         default:               
    //             break;
    //     }
    //     return {
    //         width: width - margin,
    //         height: height,
    //     }
    // }
    private _generateRoute(game: ServerLayer.EightBIT2048GameDTO): boolean[] {
        let pickedPole = Data.plinkoMultipliers.indexOf(game.ResultBoxMultiplier)

        Data.plinkoMultipliers მაგალითად /* [16,8,4,1,0,1,4,8,16] */    
        game.ResultBoxMultiplier ///* მოსული მულლტიპლაიერი ბექიდან, მაგალითად 16 */
        /*game.BouncingBonus = true*/
        if (game.BouncingBonus === true) {
            pickedPole = Math.floor(Data.plinkoSize / 2)
        }
        let flip = Math.random() < 0.5;
        let middle = Math.random() < 0.5
        if (pickedPole === (Data.plinkoSize - 1) / 2 && middle) {
            pickedPole++
        }
        if (flip) {
            pickedPole = Data.plinkoSize + 1 - pickedPole
        }
        
        //let pickedPole = 5
        let route: boolean[] = []
        for (let i = 0; i < Data.plinkoSize + 1; i++) {
            route.push(i < pickedPole ? true : false)
        }


        //shuffle
        for (let i = route.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [route[i], route[j]] = [route[j], route[i]];
        }
        return route
        //return [true, true, true, true, true, true, true, true, true]
    }
    // private _getCubeSize(multiplier: number) {
    //     let size: number;
    //     switch (multiplier) {
    //         case 0:
    //             size = 17
    //             break;
    //         case 1:
    //             size = 11
    //             break;
    //         case 8:
    //             size = 17
    //             break;
    //         case 16:
    //             size = 17
    //             break;
    //         case 128:
    //             size = 17
    //             break;
    //         case 256:
    //             size = 17
    //             break;
    //         case 2048:
    //             size = 17
    //             break;
    //     }
    //     return size
    // }
    public spawnCube(game: ServerLayer.EightBIT2048GameDTO): void {
        if (this._idleInterval) {
            this._wigglePole(false)
        }
        let route: boolean[] = this._generateRoute(game)     
        let pi: boolean = false
        let gravity;
        let speed;
        game.BallMultiplier === 0 && (pi = true);
        [gravity, speed] = this._setSpeeds(pi)
        let cube = this._scene.physics.add.sprite(0, 0, 'plinkoBalls', `${game.BallMultiplier}.png`)
        let size: number = this._getCubeSize(game.BallMultiplier)


        cube.setY(this._poles[0][0].y - componentConfigs.boardConfig.height / 6).setGravityY(gravity);
        cube.setDisplaySize(size, size)
        cube.setData('gameData', game)
        cube.setData('poleIndex', 0)
        cube.setData('colisionIndex', 0)
        cube.setData('route', route)
        cube.setData('numberOfBounces', 0)
        this._cubes.push(cube)
        this._mainContainer.add(cube)
        if (pi) {
            cube.play("piAnimationInfinite") 
            cube.setDisplaySize(size, size)
            //Data.autoPlay = 0
            Data.isFinished = false
        }
        this._scene.physics.add.existing(cube);
        this._activateHighlight(game, true);     
        this._cubes.length > 1  && this._cubeDepthController()        
    } 
    private _cubeDepthController(): void {       
        let sortedCubes: Phaser.GameObjects.Sprite[] = [...this._cubes]
        sortedCubes.sort(this._sortCubes)
        sortedCubes.forEach((cube: Phaser.GameObjects.Sprite) => {
            this._mainContainer.bringToTop(cube)
        })
        sortedCubes[0].getData('gameData')?.BallMultiplier === 0 && this._mainContainer.bringToTop(sortedCubes[0])
    }
    private _sortCubes(a: Phaser.GameObjects.Sprite, b: Phaser.GameObjects.Sprite) {
        if (a.getData('gameData')?.BallMultiplier < b.getData('gameData')?.BallMultiplier) {
        return -1;
            }
        if (a.getData('gameData')?.BallMultiplier > b.getData('gameData')?.BallMultiplier) {
        return 1;
        }
        return 0;
    }


    public update() {
        this._cubes.length > 0 && this._cubes.forEach((cube: Phaser.Physics.Arcade.Sprite, index) => {                       
            if (cube.active === false) {
                this._cubes.splice(index, 1)
            } else {
                let poleIndex = cube.getData('poleIndex')
                let route = cube.getData('route')
                let collisionIndex = cube.getData('colisionIndex')
                let game: ServerLayer.EightBIT2048GameDTO = cube.getData('gameData')                

                let multiplierLocation: number = 0
                route.forEach(value => {
                    if (value === true) {
                        multiplierLocation++
                    }
                })
                if (multiplierLocation > Math.floor(Data.plinkoSize / 2) + 1) {
                    multiplierLocation -= 2
                } else if (multiplierLocation === Math.floor(Data.plinkoSize / 2) + 1) {
                    multiplierLocation -= 1
                }

                //cube checks to not overThrow the pole
                if (cube.getData('pole') && !cube.getData('firstBounce')) {
                    if (Math.abs(cube.getData('pole').x - cube.x) > this._plinkoMargin / 2 && cube.body.velocity.x !== 0) {
                        cube.setVelocityX(0)
                    }
                    if (cube.body.velocity.x === 0) {
                        cube.setX(cube.getData('pole').x + (cube.getData('direction') ? this._plinkoMargin / 2 : - this._plinkoMargin / 2))
                    }
                }               
        
                let multiplierHit = this._multipliers[multiplierLocation + (cube.body.velocity.x < 0 ? - cube.getData('numberOfBounces') : +cube.getData('numberOfBounces'))]
                if (collisionIndex <= Data.plinkoSize && (cube.y + cube.displayHeight / 2) >= (this._poles[collisionIndex][poleIndex].y - this._poles[collisionIndex][poleIndex].displayHeight)) {
                    cube.setPosition(this._poles[collisionIndex][poleIndex].x, this._poles[collisionIndex][poleIndex].y - this._poles[collisionIndex][poleIndex].displayHeight / 2 - cube.displayHeight)
                    cube.setData('pole', this._poles[collisionIndex][poleIndex])
                    cube.setData('direction', (route[collisionIndex]))
                    this._handlePoleCollision(collisionIndex, route, cube, game.BallMultiplier === 0)
                    if (collisionIndex === 0) {
                        this._scene.events.emit('ballDropped')
                    }
                    if (route[collisionIndex] === true) {
                        poleIndex++
                        cube.setData('poleIndex', poleIndex)
                    }
                    collisionIndex++
                    cube.setData('colisionIndex', collisionIndex)
                } else if (collisionIndex === Data.plinkoSize + 1 && (cube.y + cube.displayHeight / 2) >= multiplierHit.y - multiplierHit.displayHeight && cube.body.velocity.y > 0) {                 
                    if (game.BallMultiplier === 0 && !this._bounced && game.BouncingBonus) {
                        if (cube.x >= (multiplierHit.x + multiplierHit.displayWidth) / 2 + 5 || cube.x <= (multiplierHit.x - multiplierHit.displayWidth - 5) / 2)  {
                            let bounces = cube.getData('numberOfBounces') + 1
                            cube.setData('numberOfBounces', bounces)
                            let i = [0, 1, 2, 4, 16]
                            if (i.indexOf(game.ResultBoxMultiplier) === bounces) {
                                this._bounced = true
                                return
                            }                                                    
                            this._setBounceSpeed(cube, false)
                            cube.body.velocity.x < 0 && (bounces = -bounces)
                            cube.setX(this._multipliers[multiplierLocation + bounces].x)    
                            this._handleMultiplierCollision(this._multipliers[multiplierLocation + bounces], game, true)

                        } else {
                            !cube.getData('firstBounce') && cube.setData('firstBounce', true)
                            this._handleMultiplierCollision(multiplierHit, game, true)
                            this._scene.audio.plinkoPin.play()
                            let isBouncingZero = true
                            if (cube.x > 0 && cube.getData('direction') || cube.x < 0 && !cube.getData('direction')) {
                                isBouncingZero = false
                            }
                            this._setBounceSpeed(cube, isBouncingZero)                                             
                        }     
                        let speed
                        let gravity
                        [gravity, speed] = this._setSpeeds(true)
                        if (!cube.getData('firstBounce')) {
                            cube.setGravityY(gravity)
                            cube.setVelocityX((cube.getData('direction') ? speed : -speed))
                        }
                        this._scene.audio.plinkoPin.play()
                    }
                    else {
                        this._handleMultiplierCollision(multiplierHit, game, false)
                        /*game.Multiplier >= 16 && */this._addHighScore(game.BallMultiplier, game.Multiplier)
                        this._bounced && (this._bounced = false)
                        cube.destroy()
                    }
                }
            }
        })     
    }
    // private _setBounceSpeed(cube: Phaser.Physics.Arcade.Sprite, isZero: boolean) {
    //     let gravity
    //     let speed
    //     [gravity,speed] = this._setSpeeds(true)
    //     let bounceSpeed = this._bounceSpeed * 2
    //     let a = gravity
    //     let b = bounceSpeed
    //     let c = isZero ? 0 : 5
    //     let t = (-b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a)
    //     let v = Math.abs(((this._plinkoMargin) / 2) / t)
    //     speed = v
    //     cube.setGravityY(a)
    //     cube.setVelocityY(bounceSpeed);
    //     cube.setVelocityX(cube.getData('direction') ? speed : -speed)
    // }
    private _handlePoleCollision(currentPole: number, route: boolean[], cube: Phaser.Physics.Arcade.Sprite, pi: boolean): void {
        //this._scene.audio.plinkoPin.play()
        let gravity
        let speed
        [gravity, speed] = this._setSpeeds(pi)
        cube.setGravityY(gravity)
        cube.setVelocityY(this._bounceSpeed);
        cube.setVelocityX((route[currentPole] ? speed : -speed))
        // const randomAngle = Math.floor(Math.random() * 150 * (pi ? 1 : Data.selectedSpeedMultiplier)) + 15 * (pi ? 1 : Data.selectedSpeedMultiplier);
        // cube.setAngularVelocity(route[currentPole] ? randomAngle : -randomAngle)
    }
    private _handleMultiplierCollision(multiplier: Phaser.GameObjects.Sprite, game: ServerLayer.EightBIT2048GameDTO, bounce: boolean): void {   
        //this._scene.audio.plinkoWin.play()               
        multiplier.setFrame(multiplier.getData('multiplierValue') + 'Light')
        let smoke: Phaser.GameObjects.Sprite = multiplier.getData('smoke')
        smoke.setVisible(true).play(!bounce && game.BallMultiplier === 0 ? 'piSmoke' : multiplier.getData('index') === 4 ? 'bigSmoke' : 'smoke')
        smoke.on('animationupdate', (anim, frame) => {
            if (frame.index === 3) {  
                multiplier.setPosition(multiplier.getData('position').x - 1, multiplier.getData('position').y - 1)
            } else if (frame.index === 4) {
                multiplier.setPosition(multiplier.getData('position').x + 1, multiplier.getData('position').y - 1)
            } else if (frame.index === 5) {
                multiplier.setFrame(multiplier.getData('multiplierValue'))
                multiplier.setPosition(multiplier.getData('position').x, multiplier.getData('position').y)
            }
        }, this);       
        smoke.once('animationcomplete', () => {
            this._smokeAnimationCompleted(smoke, bounce, game)
        })
    }
    private _smokeAnimationCompleted(smoke: Phaser.GameObjects.Sprite, bounce: boolean, game: ServerLayer.EightBIT2048GameDTO) {
        smoke.setVisible(false)
        if (!bounce) {
            Data.plinkoBall.splice(Data.plinkoBall.indexOf(game), 1)
            this._activateHighlight(game, false);      
            this._onMultiplierColision(game)
            setTimeout(() => {
                if (this._cubes.length === 0 && this._idleInterval === null) {
                    this._wigglePole(true)
                }
            }, 2000)
        }
        smoke.off('animationcomplete', this._smokeAnimationCompleted)
    }
    private _setSpeeds(isPi: boolean): number[] {
        //temp speeds
        let gravity
        let speed
        if (isPi) {
            gravity = 400
            speed = 20.5
        }
        else if (Data.selectedSpeedMultiplier === 1) {
            gravity = 400         
            /*speed = 20.5*/
        } else if (Data.selectedSpeedMultiplier === 2) {
            gravity = 600
            /*speed = 27.8*/
        } else if (Data.selectedSpeedMultiplier === 5) {
            gravity = 1500
            /*speed = 51*/
        }       
        let a = gravity / 2
        let b = -this._bounceSpeed
        let c = -this._plinkoMargin
        let t = (-this._bounceSpeed + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a)
        let v = Math.abs((c / 2) / t)
        speed = v
        return [gravity, speed]
    }
    //private _lightCollision(i: number, j: number, pi: boolean) {
    //    const spotlight = this._scene.lights.addLight(0, 0, pi ? 100 : 70).setIntensity(0);
    //    spotlight.x = this._poles[i][j].x * this.scaleX + config.width / 2;
    //    spotlight.y = this._poles[i][j].y * this.scaleY + config.height / 2 + componentConfigs.boardConfig.y;
    //    let lightTween = this._scene.tweens.add({
    //        targets: spotlight,
    //        intensity: pi ? 5 : 1.5,
    //        duration: 300 / Data.selectedSpeedMultiplier,
    //        yoyo: true,
    //        repeat: 0,
    //        ease: 'Linear',
    //        onComplete: () => {
    //            this._scene.lights.removeLight(spotlight);
    //        }
    //    });               
    //}
        
    public getHeight() {
        return this._background.displayHeight
    }
    public onMultiplierColision(callback: (game: ServerLayer.EightBIT2048GameDTO) => void): this {
        this._onMultiplierColision = callback
        return this
    }
    public resize(scale) {
        this.setScale(scale).setDepth(500)
        this._mask.setScale(scale).setPosition(config.width / 2 - componentConfigs.boardConfig.width / 2 * scale, config.height / 2 + componentConfigs.boardConfig.y - componentConfigs.plinkoConfig.height / 2 * scale)
        if (700 * scale > config.width) {
            componentConfigs.plinkoConfig.infoWidth = config.width / scale - 20
        } else {
            componentConfigs.plinkoConfig.infoWidth = 700
        }
        this._highScoreBackground.setDisplaySize(componentConfigs.plinkoConfig.infoWidth, this._highScoreBackground.displayHeight).setPosition(0,0)
        this._highScoreMask.setScale(scale).setPosition(config.width / 2 - componentConfigs.plinkoConfig.infoWidth / 2 * scale, config.height / 2 + componentConfigs.boardConfig.y + (-componentConfigs.plinkoConfig.height / 2 - componentConfigs.plinkoConfig.infoHeight - componentConfigs.plinkoConfig.hatHeight) * scale)
        this._resizeHighscores()
    }
}