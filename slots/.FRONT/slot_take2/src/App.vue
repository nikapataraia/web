<template>
  <main>
    <BasicModal :isOpen="isModalOpen" @close="closemodal"></BasicModal>
    <MainGameContainer 
    :BetAmount="BetAmount" 
    :Balance="Balance" 
    @bet="bet" 
    @balanceUpdated="updateBalance">></MainGameContainer>
    <ControllsContainer></ControllsContainer>
    <button @click="isModalOpen = true">openmodal</button>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainGameContainer from './components/MainGameContainer.vue';
import BasicModal from './components/Modals/BasicModal.vue'
import ControllsContainer from './components/ControllsContainer.vue'
const isModalOpen = ref(false)
function updateBalance(winnings : number){
  Balance.value += winnings
}
function bet(Bet : number){
  BetAmount.value = Bet;
  Balance.value -= Bet;
}
function closemodal(DoSomething : Function){
  isModalOpen.value = false
}
const BetAmount = ref(2); 
const Balance = ref(5000);
</script>