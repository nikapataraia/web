<template>
  <main>
    <MainGameContainer 
    :BetAmount="BetAmount" 
    :Balance="Balance" 
    @bet="bet" 
    @balanceUpdated="updateBalance">></MainGameContainer>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainGameContainer from './components/MainGameContainer.vue';

function updateBalance(winnings : number){
  Balance.value += winnings
}
function bet(Bet : number){
  BetAmount.value = Bet;
  Balance.value -= Bet;
}
const BetAmount = ref(2); 
const Balance = ref(5000);
</script>