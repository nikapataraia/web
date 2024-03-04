<template>
    <div class="GameContainer" id = "GameContainer" ref="GameContainerRef">
    
    </div>
    <button @click=animatereelLocal>roll</button>
    <button @click=changedimensionsLocal>change dim</button>
</template>
    
<script setup lang="ts">
    import * as PIXI from 'pixi.js';
    import { onBeforeUnmount, ref, watch } from 'vue';
    import { onMounted } from 'vue';
    import {AssetsLoaded} from '../assets/Data_textures'
    import BonusGame from '../classes/bonus/bonusgame'
    import GameSimulation from "../classes/bonus/gamedimulation/game"
    let appwidth =  1000
    let appheight = 600
    let mapWidth = 6
    let mapHeight = 5
    let speed = 2500
    const GameContainerRef = ref<HTMLDivElement | null>(null);
    const roleanimationgoing = ref<boolean>(false)
    const gamestarted = ref<boolean>(false)
    const GameSkeletonloaded = ref<boolean>(false)
    let bonusgame : BonusGame;
    let game : GameSimulation;
    watch(AssetsLoaded, (newValue) => {
        if (newValue && !GameSkeletonloaded.value) {
            game = new GameSimulation(1,6,5)
            loadinbonusgame()
        }
    });

    function loadinbonusgame(){
        bonusgame = new BonusGame(appwidth,appheight,mapWidth,mapHeight,game)
        const GameContainer = GameContainerRef.value
        if(GameContainer){
            GameContainer.appendChild(bonusgame.bonusgame_app.view as unknown as HTMLElement)
        }
        GameSkeletonloaded.value = true
    }

    function animatereelLocal(){
        bonusgame.play()
    }

    function changedimensionsLocal(){
        bonusgame.changedimension(400,250)
    }



</script>
