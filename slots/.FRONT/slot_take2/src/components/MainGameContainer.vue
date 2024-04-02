<template>
    <div class="MainGameContainer" id="MainGameContainer" ref="MainGameContainerRef"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch , defineProps, defineEmits, defineExpose,} from 'vue';
import Plinko from '@/classes/main/Plinko';
import * as PIXI from 'pixi.js'
import { MainData } from '@/assets/DataMain/Data';
const emit = defineEmits(['bet', 'balanceUpdated'])
defineExpose({Bet , ChangeSpeed})
const props = defineProps({
BetAmount_index: Number,
  BetAmount: Number,
  Balance: Number,
});
const localBetAmount = ref(props.BetAmount || 0);
const Ballidincrementer = ref(0);
const BonusDropped = ref(false)
const isBetOnCooldown = ref(false);
function Bet() {
    if (!BonusDropped.value && !isBetOnCooldown.value) {
        isBetOnCooldown.value = true;
        setTimeout(() => {
            isBetOnCooldown.value = false;
        }, 100);
        
        emit('bet', localBetAmount.value);
        MainGame.AddBall(Ballidincrementer.value, Math.random() > 0.999 ? 1 : 0, Math.round(Math.random() * (MainData.Map.FinishLine1.length - 1)), localBetAmount.value);
    }
}
function updateBalance(winnings : number){
    emit("balanceUpdated" , winnings)
}
const MainGameContainerRef = ref<HTMLDivElement | null>(null);

let MainGame: Plinko;
let ticker = new PIXI.Ticker();
watch(() => props.BetAmount, (newVal) => {
  localBetAmount.value = newVal || 1;
  MainGame.BetAmount = newVal || 1;
});

function LoadInMainGame() {
    LoadAssets();
    MainGame = new Plinko(localBetAmount.value , updateBalance);
    const MainGameContainer = MainGameContainerRef.value;
    if (MainGameContainer) {
        MainGameContainer.appendChild(MainGame.Plinko_app.view as unknown as HTMLElement);
    }
    ticker.add(update);
    ticker.start();
}

function LoadAssets() {
    // Load your assets here
}

function update(deltaTime: number) {
    MainGame.update(deltaTime);
}

function ChangeSpeed(speed : number){
    MainGame.changeSpeed(speed)
}

onMounted(() => {
    LoadInMainGame();
});

onUnmounted(() => {
    ticker.stop();
    ticker.remove(update);
});
</script>