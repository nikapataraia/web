<template>
    <div class="BonusGameContainer" id = "BonusGameContainer" ref="BonusGameContainerRef">
    
    </div>
    <button @click=animatereelLocal>roll</button>
    <button @click=changedimensionsLocal(400,300)>400,300</button>
    <button @click=changedimensionsLocal(800,600)>800,600</button>
    <button @click=changedimensionsLocal(1000,700)>1000,700</button>
    <button @click=changequickplaymode()>quickplay</button>
    <button @click=skiproll()>skip</button>
</template>
    
<script setup lang="ts">
    import { generateanimationsets } from './../assets/DataBonus/Data_textures';
    import { loadassets  } from './../assets/DataBonus/Data_textures';
    loadassets()
    generateanimationsets()
    import * as PIXI from 'pixi.js';
    import { onBeforeUnmount, ref, watch } from 'vue';
    import { onMounted } from 'vue';
    import {AssetsLoaded} from '../assets/DataBonus/Data_textures'
    import BonusGame from '../classes/bonus/bonusgame'
    import GameSimulation from "../classes/bonus/gamedimulation/game"
    let appwidth =  1000
    let appheight = 700
    let mapWidth = 6
    let mapHeight = 5
    let speed = 2500
    const BonusGameContainerRef = ref<HTMLDivElement | null>(null);
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
        const BonusGameContainer = BonusGameContainerRef.value
        if(BonusGameContainer){
            BonusGameContainer.appendChild(bonusgame.bonusgame_app.view as unknown as HTMLElement)
        }
        GameSkeletonloaded.value = true
    }

    function animatereelLocal(){
        bonusgame.play()
    }

    function changedimensionsLocal(width : number,height : number){
        bonusgame.changedimension(width,height)
    }
    function changequickplaymode(){
        bonusgame.bonusgamecontainer.changequikcplay()
    }
    function skiproll(){
        bonusgame.bonusgamecontainer.changeskiped()
    }


</script>
