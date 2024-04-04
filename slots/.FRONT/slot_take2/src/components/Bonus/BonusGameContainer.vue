<template>
    <div class="BonusGameContainer" id="BonusGameContainer" ref="BonusGameContainerRef">
    
    </div>
    <button @click=changedimensionsLocal(400,250)>400,250</button>
    <button @click=changedimensionsLocal(800,500)>800,500</button>
    <button @click=changedimensionsLocal(1000,600)>1000,600</button>
    <button @click=changequickplaymode()>quickplay</button>
    <button @click=skiproll()>skip</button>
</template>
    
<script setup lang="ts">
    import { generateanimationsets , loadassets , AssetsLoaded } from './../../assets/DataBonus/Data_textures';
    import {  ref, watch } from 'vue';
    import BonusGame from '../../classes/bonus/bonusgame'
    import GameSimulation from "../../classes/bonus/gamedimulation/game"
    let appwidth =  1000
    let appheight = 600
    let mapWidth = 6
    let mapHeight = 5
    let speed = 2500
    const BonusGameContainerRef = ref<HTMLDivElement | null>(null);
    const roleanimationgoing = ref<boolean>(false)
    const gamestarted = ref<boolean>(false)
    const GameSkeletonloaded = ref<boolean>(false)
    let bonusgame : BonusGame;
    defineExpose({loadinbonusgame,})


    function initializeGame(game : GameSimulation) {
  bonusgame = new BonusGame(appwidth, appheight, mapWidth, mapHeight, game);

  const BonusGameContainer = BonusGameContainerRef.value;
  if (BonusGameContainer) {
    BonusGameContainer.appendChild(bonusgame.bonusgame_app.view as unknown as HTMLElement);
  }

  GameSkeletonloaded.value = true;
  setTimeout(() => bonusgame.play(), 400);
}
    function loadinbonusgame(game : GameSimulation) {
  loadassets()
  generateanimationsets();

  const unwatch = watch(AssetsLoaded, (newValue) => {
    if (newValue && !GameSkeletonloaded.value) {
      initializeGame(game);
      unwatch();
    }
  });

  if (AssetsLoaded.value && !GameSkeletonloaded.value) {
    initializeGame(game);
  }}

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
