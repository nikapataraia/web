<template>
    <div class="GameContainer" id = "GameContainer" ref="GameContainerRef">
    
    </div>
    <button @click=startgame>start</button>
    <button @click=oepnwingLocal>open  wing</button>
    <button @click="wigglewingLocal">wiggle wing</button>
</template>
    
<script setup lang="ts">
    import * as PIXI from 'pixi.js';
    import { ref, watch } from 'vue';
    import { onMounted } from 'vue';
    import {AssetsLoaded} from '../assets/Data'
    import BonusGame from '../classes/bonusgame'




    let app : PIXI.Application<PIXI.ICanvas>;
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

    onMounted(() => {
        if(AssetsLoaded.value){
            loadinbonusgame()
            
        }
    })


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


    function startgame(){     
        if (!gamestarted.value) {
            gamestarted.value = true;
        }

        for(let i = 0; i < mapWidth; i++){
            startrolling(speed)
        }
    }

    function startrolling(speed : number,){
        
    }

    function oepnwingLocal(){
        bonusgame.openwing()
    }

    function wigglewingLocal(){
        bonusgame.wigglewing()
    }



</script>
