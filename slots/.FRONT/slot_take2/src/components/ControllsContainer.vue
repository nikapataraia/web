<template>
    <div class="bottomPanel" id="bottom-panel">
            <div class="bottomPanel__information" id="bottom-panel-info">
                <div class="bottomPanel__information__content">
                    <div class="totalBet">
                        <p class="totalBet__title" id="ui-text-1">
                            BET
                        </p>
                        <p class="totalBet__amount">
                            <span id="totalBetElement" ref="BetAmount">0</span>
                        </p>
                    </div>
                    <div class="playerBalance">
                        <p class="playerBalance__title" id="ui-text-2">
                            BAL
                        </p>
                        <p class="playerBalance__amount">
                            <span id="balanceElement" ref="Balance">0</span>
                        </p>
                    </div>
                </div>

                <div class="blue_border">
                    <div class="mobile">
                        <img src="../assets/UI/compressed/blue_line.png"/>
                    </div>
                    <img class="desktop" src="../assets/UI/compressed/blue_border_pc.png" />
                </div>

            </div>


            <div class="bottomPanel__content">
                <div class="bottomPanel__background"></div>
                <div class="leftSide">
                    <div class="burgerMenu" id="burgerMenu">
                        <img class="enabled" src="../assets/UI/compressed/menu-enabled.png" />
                        <img class="disabled" src="../assets/UI/compressed/menu-disabled.png" />
                    </div>

                    <div class="autoPlay ball-bundle-72" id="autoPlayElement"  ref="_autoPlayElement">
                        <div class="bundleAmount hiddenLayer2">
                            <span class="bits-left-amount"></span>
                        </div>
                        <img class="disabled" src="../assets/UI/compressed/autoplay-disabled-blue.png" />
                        <img class="enabled" src="../assets/UI/compressed/autoplay-enabled.png" />
                        <img class="disabled-pushed" src="../assets/UI/compressed/autoplay-disabled-pushed-blue.png" />
                        <img class="enabled-pushed" src="../assets/UI/compressed/autoplay-enabled-pushed.png" />
                        <span id="ui-text-3">AUTO</span>
                    </div>
                </div>

                <div class="goButton">
                    <img id="goDefault" ref="goDefault" src="../assets/UI/compressed/go-default.png" />
                    <img id="gopressed" ref="goPressed" src="../assets/UI/compressed/go-pressed.png" />
                    <img id="plusPressed" ref="plusPressed" src="../assets/UI/compressed/plus-pressed.png" />
                    <img id="minusPressed" ref="minusPressed" src="../assets/UI/compressed/minus-pressed.png" />
                    <div class="goButton__minus" id="minusButton"></div>
                    <div class="goButton__plus" id="plusButton"></div>
                    <div class="goButton__play" id="playButton"></div>
                </div>

                <div class="rightSide">
                    <div class="sound" id="soundElement">
                        <img class="enabled" src="../assets/UI/compressed/sound-enabled.png" />
                        <img class="disabled" src="../assets/UI/compressed/sound-disabled.png" />
                    </div>
                    <div class="fastPlay" id="fastPlayElement">
                        <img class="level1" src="../assets/UI/compressed/speed-level-1.png" />
                        <img class="level1-pressed" src="../assets/UI/compressed/speed-level-1-pressed.png" />
                        <img class="level2" src="../assets/UI/compressed/speed-level-2.png" />
                        <img class="level2-pressed" src="../assets/UI/compressed/speed-level-2-pressed.png" />
                        <img class="level3" src="../assets/UI/compressed/speed-level-3.png" />
                        <img class="level3-pressed" src="../assets/UI/compressed/speed-level-3-pressed.png" />
                        <span id="ui-text-4">SPEED</span>
                    </div>
                </div>

            </div>
        </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const _autoPlayElement = ref(null);
const BetAmount = ref(null)
const Balance = ref(null)
const goDefault = ref(null);
const goPressed = ref(null);
const plusPressed = ref(null);
const minusPressed = ref(null);

const GoStates = {
    playStill: 0,
    playHold: 1,
    playMinus: 2,
    playPlus: 3,
}
</script>