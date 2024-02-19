<template>
    <div class="GameContainer" id = "GameContainer" ref="GameContainerRef">
    
    </div>
    <button @click=startgame>start</button>
    <button @click=activateleftwingLOCAL>open left wing</button>
    <button @click=activaterightwingLOCAT>open right wing</button>
</template>
    
<script setup lang="ts">
    import * as PIXI from 'pixi.js';
    import { ref, watch } from 'vue';
    import { onMounted } from 'vue';
    import {GenerateReelContainer, ReelContainer} from "./ReelContainer"
    import {AssetsLoaded, Symbolimages} from '../assets/Data'
    import { GenerateWingContainer ,activateleftwing,activaterightwing} from './WingContainer';




    let app : PIXI.Application<PIXI.ICanvas>;
    let appwidth =  1000
    let appheight = 500
    let mapWidth = 7
    let mapHeight = 5
    let speed = 2500
    const GameContainerRef = ref<HTMLDivElement | null>(null);
    const roleanimationgoing = ref<boolean>(false)
    const gamestarted = ref<boolean>(false)
    const GameSkeletonloaded = ref<boolean>(false)

    onMounted(() => {
        if(AssetsLoaded.value){
            GenerateGameSkeleton()
        }
    })


    watch(AssetsLoaded, (newValue) => {
        if (newValue && !GameSkeletonloaded.value) {
            GenerateGameSkeleton()
        }
    });


    function GenerateGameSkeleton(){
        app = new PIXI.Application({
            width : appwidth,
            height : appheight,
            backgroundColor : 'black'
        })
        const GameContainer = GameContainerRef.value
        if(GameContainer){
            GameContainer.appendChild(app.view as unknown as HTMLElement)
        }
        GenerateReelContainer(mapWidth, mapHeight, app, appwidth,appheight)
        GenerateWingContainer(app,appheight,appwidth)
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

    function activateleftwingLOCAL(){
        activateleftwing(app,appwidth)
    }

    function activaterightwingLOCAT(){
        activaterightwing(app,appwidth)
    }



</script>
