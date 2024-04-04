<template>
    <div class="MainGameContainer" id="MainGameContainer" ref="MainGameContainerRef"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch , defineProps, defineEmits, defineExpose,} from 'vue';
import Plinko from '@/classes/main/Plinko';
import * as PIXI from 'pixi.js'
import { MainData } from '@/assets/DataMain/Data';
const emit = defineEmits(['bet', 'balanceUpdated','EnableBonusDropped','GoToBonus'])
defineExpose({Bet , ChangeSpeed})
const props = defineProps({
BetAmount_index: Number,
  BetAmount: Number,
  Balance: Number,
  BonusBallDroped: Boolean,
});
const localBetAmount = ref(props.BetAmount || 0);
const Ballidincrementer = ref(0);
const BonusDropped_local = ref(false)
const isBetOnCooldown = ref(false);
function Bet(BallType : number, BallID : number, BetAmount : number , DropLocation : number) {
    if (!BonusDropped_local.value && !isBetOnCooldown.value) {
        isBetOnCooldown.value = true;
        setTimeout(() => {
            isBetOnCooldown.value = false;
        }, 100);
        if(BallType === 1){
            BonusDropped_local.value = true
            emit('EnableBonusDropped')
        }
        MainGame.AddBall(BallID, BallType, DropLocation, BetAmount);
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
function GoToBonus(){
    emit("GoToBonus")
}

function LoadInMainGame() {
    LoadAssets();
    MainGame = new Plinko(localBetAmount.value , updateBalance, GoToBonus);
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