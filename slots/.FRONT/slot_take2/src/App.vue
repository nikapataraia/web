<template>
    <BasicModal :isOpen="isModalOpen" :TextforModal="ModalText" @close="closemodal" @doafter="modalDoAfter"></BasicModal>
    <MenuModal :isOpen="isMenuOpen" @close="closemenumodal"></MenuModal>
    <AutoPlayModal :isOpen="isAutoPlayOpen" @close="closeautoplaymodal" @startAutoPlay="startAutoPlay"></AutoPlayModal>
    <div ref="maingamecont_ff" class="">
    <MainGameContainer 
    ref="Maincomponent_ref"
    :BetAmount_index="BetAmount_index" 
    :BetAmount="BetAmount"
    :Balance="Balance" 
    :BonusBallDroped="BonusBallDroped"
    @GoToBonus="GoToBonus"
    @bet="bet" 
    @balanceUpdated="updateBalance"
    @EnableBonusDropped="EnableBonusDropped"></MainGameContainer>
    </div>
    <div ref="bonusgamecont_ff" class="disabled">
        <BonusGameContainer ref="bonusgame_ref"></BonusGameContainer>
    </div>
    <ControllsContainer
    ref="Controller_ref"
    :BetAmount_index="BetAmount_index" 
    :BetAmount="BetAmount"
    :Balance="Balance" 
    :autoPlayActive="autoPlatActive"
    :speedLevel="speedLevel"
    :settingsOpen="settingsOpen"
    :soundOn="soundOn"
    :isAutoPlayOpen="isAutoPlayOpen"
    :isMenuOpen="isMenuOpen"
    :BonusBallDroped="BonusBallDroped"
    :InBonusGame="InBonusGame"
    @changeAutoPlayOpen="changeAutoPlayOpen"
    @changeMenuOpen="changeMenuOpen"
    @changeBetAmount="changeBetAmount"
    @changesound="changesound"
    @changespeedlevel="changespeedlevel"
    @opensettings="opensettings"
    @startAutoPlay="startAutoPlay"
    @bet="bet"
    @StopAutoPlay="StopAutoPlay"
    >
    </ControllsContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainGameContainer from './components/Main/MainGameContainer.vue';
import BonusGameContainer from './components/Bonus/BonusGameContainer.vue'
import BasicModal from './components/Modals/BasicModal.vue'
import ControllsContainer from './components/Controller/ControllsContainer.vue'
import AutoPlayModal from './components/Modals/AutoPlayModal.vue';
import MenuModal from './components/Modals/MenuModal.vue';
import { MainData } from './assets/DataMain/Data';
import GameSimulation from './classes/bonus/gamedimulation/game';

// MODAL CONSTANTS
const isModalOpen = ref(false)
const isAutoPlayOpen = ref(false)
const isMenuOpen = ref(false)
const ModalText =ref<string[]>([]);
const modalDoAfter = ref<() => void>(() => {});

// COMPONENT COMSTANTS
const Controller_ref = ref(null)
const Maincomponent_ref = ref(null)
const maingamecont_ff = ref(null)
const bonusgamecont_ff = ref(null)

// Controller Constants
const BetAmount_index = ref(0);
const BetAmount = ref(MainData.BetAmounts[BetAmount_index.value]) 
const Balance = ref(5000);
const autoPlatActive = ref(false)
const speedLevel = ref(1)
const settingsOpen = ref(false)
const soundOn = ref(false)

// BONUS HELPERS
const BonusBallDroped = ref(false)
const bonusgame_ref = ref(null)
function EnableBonusDropped(){
  BonusBallDroped.value = true
  autoPlatActive.value = false
}
const InBonusGame = ref(false)
function GoToBonus(){
  BonusBallDroped.value = false
  openModal(['Congradulations' , 'you won Bonus Round'] , bonusgame_ref.value.startplaying)
  LoadInBonusGame()
}
function LoadInBonusGame(){
const game = new GameSimulation(1, 6, 5);
InBonusGame.value = true
if(maingamecont_ff.value && bonusgamecont_ff.value && bonusgame_ref.value){
  console.log('gets here')
  bonusgame_ref.value.loadinbonusgame(game)
  maingamecont_ff.value.classList.add('disabled')
  bonusgamecont_ff.value.classList.remove('disabled')
}
}


function getBackFromBonus(){
  InBonusGame.value = false
  if(maingamecont_ff.value && bonusgamecont_ff.value && bonusgame_ref.value){
  bonusgamecont_ff.value.classList.add('disabled')
  maingamecont_ff.value.classList.remove('disabled')
  // bonusgame_ref.value.resetBonus()
}
}
// BET AND BALANCE FUNCTIONS
function updateBalance(winnings : number){
  Balance.value += winnings
}
function bet(Bet : number){
  if(!BonusBallDroped.value && !InBonusGame.value){
      BetAmount.value = Bet;
      if(Maincomponent_ref.value){
        const BallType = Math.random() > 0.1 ? 1 : 0;
        const BallID = 0
        const DropLocation = Math.round(Math.random() * (MainData.Map.FinishLine1.length - 1))
        Maincomponent_ref.value.Bet(BallType , BallID, BetAmount.value, DropLocation)
      }
  Balance.value =  Number((Balance.value - Bet).toFixed(1))
  }
}

function changeBetAmount(isdecreasing : boolean){
  if(isdecreasing){
    if(BetAmount_index.value <= 0){
      // 
    }
    else{
      BetAmount_index.value -= 1;
      BetAmount.value = MainData.BetAmounts[BetAmount_index.value]
    }
  }
  else{
    if(BetAmount_index.value >= MainData.BetAmounts.length - 1){
      // 
    }
    else{
      BetAmount_index.value += 1;
      BetAmount.value = MainData.BetAmounts[BetAmount_index.value]
    }
  }
}


// MODAL FUNCTIONS
function openModal(modaltext : string[] , doAfter: () => void){
  isModalOpen.value = true
  ModalText.value = modaltext;
  modalDoAfter.value = doAfter;
}
function closemodal(DoSomething : Function){
  isModalOpen.value = false
}
function closeautoplaymodal(){
  isAutoPlayOpen.value = false
  Controller_ref.value.autoPlayDefaulter()
}
function closemenumodal(){
  isMenuOpen.value = false
  Controller_ref.value.menuDefaulter()
}
function changeAutoPlayOpen(){
  isAutoPlayOpen.value = true
}
function changeMenuOpen(){
  isMenuOpen.value = true
}

// Controller Functions
function changesound(){
  soundOn.value = !soundOn.value
}

function changespeedlevel(){
  if(speedLevel.value >= 3){
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
function startAutoPlay(amount : number) {
  autoPlatActive.value = true;
  let i = 0;
  function nextBet() {
    if (!autoPlatActive.value || i >= amount || BonusBallDroped.value) {
      autoPlatActive.value = false;
      if (Controller_ref.value) {
        Controller_ref.value.autoPlayDefaulter();
      }
      return;
    }
    setTimeout(() => {
      bet(BetAmount.value);
      i++;
      nextBet();
    }, 300);
  }
  nextBet();
}  

function StopAutoPlay(){
  autoPlatActive.value = false
  if (Controller_ref.value) {
    Controller_ref.value.autoPlayDefaulter();
  }
}
</script>