<template>
    <div class="BonusGameContainer" id="BonusGameContainer" ref="BonusGameContainerRef">
    
    </div>
    <!-- <button @click=changedimensionsLocal(400,250)>400,250</button>
    <button @click=changedimensionsLocal(800,500)>800,500</button>
    <button @click=changedimensionsLocal(1000,600)>1000,600</button>
    <button @click=changespeed(1)>quickplay</button>
    <button @click=skiproll()>skip</button> -->
</template>
    
<script setup lang="ts">
    import { generateanimationsets , loadassets , AssetsLoaded } from './../../assets/DataBonus/Data_textures';
    import {  onMounted, ref, watch } from 'vue';
    import BonusGame from '../../classes/bonus/bonusgame'
    import GameSimulation from "../../classes/bonus/gamedimulation/game"
    let appwidth =  1000
    let appheight = 600
    let mapWidth = 6
    let mapHeight = 5
    const BonusGameContainerRef = ref<HTMLDivElement | null>(null);
    const GameSkeletonloaded = ref<boolean>(false)
    let bonusgame : BonusGame;
    defineExpose({loadinbonusgame,startplaying,resetBonus,skiproll,changespeed})
    const emit = defineEmits(['getBackFromBonus',])
    const props = defineProps({
      BetAmount: Number,
      });
    
    function getBackFromBonus(totalwin : number){
      emit('getBackFromBonus' , totalwin)
    }

  function initializeGame() {
    bonusgame = new BonusGame(appwidth, appheight, mapWidth, mapHeight , getBackFromBonus);
    const BonusGameContainer = BonusGameContainerRef.value;
    if (BonusGameContainer) {
        BonusGameContainer.appendChild(bonusgame.bonusgame_app.view as unknown as HTMLElement);
      }
    GameSkeletonloaded.value = true;
  }
  function loadinbonusgame() {
  loadassets()
  generateanimationsets();

  const unwatch = watch(AssetsLoaded, (newValue) => {
    if (newValue && !GameSkeletonloaded.value) {
      initializeGame();
      unwatch();
    }
  });

  if (AssetsLoaded.value && !GameSkeletonloaded.value) {
    initializeGame();
  }}

    function changedimensionsLocal(width : number,height : number){
        bonusgame.changedimension(width,height)
    }
    function changespeed(speedlevel : number){
      if(speedlevel === 1 || speedlevel === 3){
        bonusgame.bonusgamecontainer.changequikcplay()
      }
    }
    function skiproll(){
        bonusgame.bonusgamecontainer.changeskiped()
    }

function startplaying(){
  if(props.BetAmount){
    bonusgame.loadingame(new GameSimulation(props.BetAmount,6,5))
    bonusgame.play()
  }
}
function resetBonus(){
  bonusgame.reset()
}
onMounted(() => {
  loadinbonusgame()
})
</script>
