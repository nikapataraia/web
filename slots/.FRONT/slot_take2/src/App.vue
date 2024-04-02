<template>
    <BasicModal :isOpen="isModalOpen" @close="closemodal"></BasicModal>
    <MainGameContainer 
    ref="Maincomponent_ref"
    :BetAmount_index="BetAmount_index" 
    :BetAmount="BetAmount"
    :Balance="Balance" 
    @bet="bet" 
    @balanceUpdated="updateBalance"></MainGameContainer>
    <ControllsContainer
    :BetAmount_index="BetAmount_index" 
    :BetAmount="BetAmount"
    :Balance="Balance" 
    :autoPlayActive="autoPlatActive"
    :speedLevel="speedLevel"
    :settingsOpen ="settingsOpen"
    :soundOn="soundOn"
    @changeBetAmount="changeBetAmount"
    @changesound="changesound"
    @changespeedlevel="changespeedlevel"
    @opensettings="opensettings"
    @startAutoPlay="startAutoPlay"
    @bet="bet"
    >

    </ControllsContainer>
    <button @click="isModalOpen = true">openmodal</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainGameContainer from './components/MainGameContainer.vue';
import BasicModal from './components/Modals/BasicModal.vue'
import ControllsContainer from './components/ControllsContainer.vue'
import { MainData } from './assets/DataMain/Data';
const isModalOpen = ref(false)
const Maincomponent_ref = ref(null)
function updateBalance(winnings : number){
  Balance.value += winnings
}
function bet(Bet : number){
  BetAmount.value = Bet;
  if(Maincomponent_ref.value){
    Maincomponent_ref.value.Bet()
  }
  Balance.value =  Number((Balance.value - Bet).toFixed(1))
}
function closemodal(DoSomething : Function){
  isModalOpen.value = false
}
const BetAmount_index = ref(0);
const BetAmount = ref(0.2) 
const Balance = ref(5000);
const autoPlatActive = ref(false)
const speedLevel = ref(1)
const settingsOpen = ref(false)
const soundOn = ref(false)
const autoPlayAmount = ref(0)

function changeBetAmount(isdecreasing : boolean){
  if(isdecreasing){
    if(BetAmount_index.value <= 0){
      //dosomething
    }
    else{
      BetAmount_index.value -= 1;
      BetAmount.value = MainData.BetAmounts[BetAmount_index.value]
    }
  }
  else{
    if(BetAmount_index.value >= MainData.BetAmounts.length - 1){
      //dosomething
    }
    else{
      BetAmount_index.value += 1;
      BetAmount.value = MainData.BetAmounts[BetAmount_index.value]
    }
  }
}
function changesound(){
  soundOn.value = !soundOn.value
}

function changespeedlevel(){
  if(speedLevel.value >=3){
      speedLevel.value = 1
  }
  else{
      speedLevel.value += 1
  }
  if(Maincomponent_ref.value){
    Maincomponent_ref.value.ChangeSpeed(speedLevel.value)
  }
}
function opensettings(){
  settingsOpen.value =  !settingsOpen.value
}
function startAutoPlay(){

}
</script>