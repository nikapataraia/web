<template>
    <div class="GameContainer" id = "GameContainer" ref="GameContainerRef">
    
    </div>
    <button @click=animatereelLocal>role</button>
    <button @click=oepnwingLocal>open  wing</button>
    <button @click="wigglewingLocal">wiggle wing</button>
</template>
    
<script setup lang="ts">
    import * as PIXI from 'pixi.js';
    import { ref, watch } from 'vue';
    import { onMounted } from 'vue';
    import {AssetsLoaded} from '../assets/Data_textures'
    import BonusGame from '../classes/bonus/bonusgame'
    let appwidth =  1000
    let appheight = 600
    let mapWidth = 7
    let mapHeight = 5
    let speed = 2500
    const GameContainerRef = ref<HTMLDivElement | null>(null);
    const roleanimationgoing = ref<boolean>(false)
    const gamestarted = ref<boolean>(false)
    const GameSkeletonloaded = ref<boolean>(false)
    let bonusgame : BonusGame;
    watch(AssetsLoaded, (newValue) => {
        if (newValue && !GameSkeletonloaded.value) {
            loadinbonusgame()
        }
    });

    function loadinbonusgame(){
        bonusgame = new BonusGame(appwidth,appheight,mapWidth,mapHeight)
        const GameContainer = GameContainerRef.value
        if(GameContainer){
            GameContainer.appendChild(bonusgame.bonusgame_app.view as unknown as HTMLElement)
        }
        GameSkeletonloaded.value = true
    }


    function oepnwingLocal(){
        bonusgame.openwing()
    }

    function wigglewingLocal(){
        bonusgame.wigglewing()
    }

    function animatereelLocal(){
        bonusgame.animatereels()
    }



</script>
