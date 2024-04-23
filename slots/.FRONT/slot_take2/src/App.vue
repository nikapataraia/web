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
    @GoToBonus_="GoToBonus"
    @bet="bet" 
    @balanceUpdated="updateBalance"
    @EnableBonusDropped="EnableBonusDropped"></MainGameContainer>
    </div>
    <div ref="bonusgamecont_ff" class="disabled">
        <BonusGameContainer 
        :BetAmount="BonusBet"
        @getBackFromBonus="getBackFromBonus" 
        ref="bonusgame_ref"></BonusGameContainer>
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
    :autoplayballsleft="autoplayballsleft"
    @changeAutoPlayOpen="changeAutoPlayOpen"
    @changeMenuOpen="changeMenuOpen"
    @changeBetAmount="changeBetAmount"
    @changesound="changesound"
    @changespeedlevel="changespeedlevel"
    @opensettings="opensettings"
    @startAutoPlay="startAutoPlay"
    @bet="bet"
    @StopAutoPlay="StopAutoPlay"
    @skip="skip"
    >
    </ControllsContainer>
</template>

<script setup lang="ts">
import { ref,  type Ref } from 'vue';
import MainGameContainer from './components/Main/MainGameContainer.vue';
import BonusGameContainer from './components/Bonus/BonusGameContainer.vue'
import BasicModal from './components/Modals/BasicModal.vue'
import AutoPlayModal from './components/Modals/AutoPlayModal.vue';
import MenuModal from './components/Modals/MenuModal.vue';
import { MainData } from './assets/DataMain/Data';
import ControllsContainer from './components/Controller/ControllsContainer.vue';

// MODAL CONSTANTS
const isModalOpen = ref(false)
const isAutoPlayOpen = ref(false)
const isMenuOpen = ref(false)
const ModalText =ref<string[]>([]);
const modalDoAfter = ref<() => void>(() => {});

// COMPONENT COMSTANTS
const Controller_ref = ref(null)
const Maincomponent_ref = ref(null)
const maingamecont_ff: Ref<HTMLElement | null> = ref(null)
const bonusgamecont_ff: Ref<HTMLElement | null> = ref(null)

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
const BonusBet = ref(0)
const BonusWinnings = ref(0)
function EnableBonusDropped(){
  BonusBallDroped.value = true
  autoPlatActive.value = false
}
const InBonusGame = ref(false)
function GoToBonus(Bet : number){
  if(bonusgame_ref.value){
    BonusBallDroped.value = false
    BonusBet.value = Bet
    openModal(['Congradulations' , 'you won Bonus Round'] , bonusgame_ref.value.startplaying)
    LoadInBonusGame()
  }
}
function LoadInBonusGame(){
InBonusGame.value = true
if(maingamecont_ff.value && bonusgamecont_ff.value && bonusgame_ref.value){
  maingamecont_ff.value.classList.add('disabled')
  bonusgamecont_ff.value.classList.remove('disabled')
}
}

function updatebalanceafterBonus(){
  updateBalance(BonusWinnings.value)
}

function getBackFromBonus(totalwin : number){
  BonusWinnings.value = Number((totalwin * BonusBet.value).toFixed(1))
  openModal(["you won" , BonusWinnings.value.toString()],updatebalanceafterBonus)
  InBonusGame.value = false
  if(maingamecont_ff.value && bonusgamecont_ff.value && bonusgame_ref.value){
  bonusgamecont_ff.value.classList.add('disabled')
  maingamecont_ff.value.classList.remove('disabled')
  bonusgame_ref.value.resetBonus()
}
}

function skip(){
  if(bonusgame_ref.value){
    bonusgame_ref.value.skiproll()
  }
}


// AUTOPLAY HELPERS
const autoplayballsleft = ref<string>('0');

// BET AND BALANCE FUNCTIONS
function updateBalance(winnings : number){
  Balance.value = Number((Balance.value + winnings).toFixed(1))
}
function bet(Bet : number){
  if(!BonusBallDroped.value && !InBonusGame.value){
      BetAmount.value = Bet;
      if(Maincomponent_ref.value){
        const BallType = Math.random() > 0.999 ? 1 : 0;
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
  if(Maincomponent_ref.value && bonusgame_ref.value){
    Maincomponent_ref.value.ChangeSpeed(speedLevel.value)
    bonusgame_ref.value.changespeed(speedLevel.value)
  }
}
function opensettings(){
  settingsOpen.value =  !settingsOpen.value
}

let nextbetRunning = false
let autoplayballsleft_num = 0
function startAutoPlay(amount : number) {
  autoPlatActive.value = true;
  autoplayballsleft_num = amount
  if(autoplayballsleft_num)  autoplayballsleft.value =  autoplayballsleft_num.toString();
  let i = 0;
  function nextBet() {
    if(nextbetRunning) return;
    nextbetRunning = true
    if (!autoPlatActive.value || i >= amount || BonusBallDroped.value) {
      autoPlatActive.value = false;
      if (Controller_ref.value) {
        nextbetRunning = false
        Controller_ref.value.autoPlayDefaulter();
      }
      return;
    }
    setTimeout(() => {
      bet(BetAmount.value);
      autoplayballsleft_num = amount - i - 1
      autoplayballsleft.value = autoplayballsleft_num.toString()
      i++;
      nextbetRunning = false
      nextBet();
    }, 300);
  }
  function nextbet_inf(){
    if(nextbetRunning) return;
    nextbetRunning = true
    autoplayballsleft.value = "inf"
    if (!autoPlatActive.value ||  BonusBallDroped.value) {
      autoPlatActive.value = false;
      if (Controller_ref.value) {
        nextbetRunning = false
        Controller_ref.value.autoPlayDefaulter();
      }
      return;
    }
    setTimeout(() => {
      bet(BetAmount.value);
      nextbetRunning = false
      i++;
      nextbet_inf();
    }, 300);
  }
  if(amount === -1){
    nextbet_inf()
  }
  else{
    nextBet();
  }
}  

function StopAutoPlay(){
  autoPlatActive.value = false
  if (Controller_ref.value) {
    Controller_ref.value.autoPlayDefaulter();
  }
}
</script>