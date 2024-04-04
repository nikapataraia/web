<template>
    <div class="ControllerContainer">

        <div class="BetAndBalanceContainer">
            <div class="BetandBal" >
            <!-- BET -->
            <div class="Bet" >
                <p class="Bet_txt" >BET</p>
                <p class="Bet_cont">${{ props.BetAmount }}</p>
            </div>
            <!-- Balance -->
            <div class="Bal" >
                <p class="Bal_txt">BAL</p>
                <p class="Bal_cont">${{ props.Balance }}</p>
            </div>
            </div>
            <div class="bluelinecontainer"><img src="/src/assets/UI/blue_border_pc.png"  draggable="false"></div>
        </div>


        <div class="ControllsContainer" >
            <div class="ControllsLeft" >      
              <div class="menu" ref="menu_ref">
                <img class="menu_disabled disabled"  draggable="false" src="/src//assets//UI/menu-enabled.png" ref="menu_image_disabled_ref">
                <img class="menu_enabled"  draggable="false" src="/src/assets/UI/menu-disabled.png" ref="menu_image_enabled_ref">
              </div>
              <div class="autoplay" ref="autoplay_ref">
                <img class="autoplay_disabled_pushed disabled"  draggable="false"  src="/src/assets/UI/autoplay-disabled-pushed-2.png" ref="autoplay_disabled_pushed_ref">
                <img class="autoplay_disabled"  draggable="false" src="/src/assets/UI/autoplay-disabled-2.png" ref="autoplay_disabled_ref">
                <img class="autoplay_enabled disabled"  draggable="false" src="/src/assets/UI/autoplay-enabled.png" ref="autoplay_enabled_ref">
                <img class="autoplay_enabled_pushed disabled"  draggable="false" src="/src/assets/UI/autoplay-enabled-pushed.png" ref="autoplay_enabled_pushed_ref">
              </div>
            </div>
            <div class="GoControlls" ref="gocontrolls_ref">
              <img class="go-default"  draggable="false" src="/src//assets/UI/go-default.png" ref="go_default_ref">
              <img class="go-pressed disabled"  draggable="false" src="/src//assets/UI/go-pressed.png" ref="go_pressed_ref">
              <img class="go-minus-pressed disabled"  draggable="false" src="/src//assets/UI/minus-pressed.png" ref="go_minus_pressed_ref">
              <img class="go-plus-pressed disabled"  draggable="false" src="/src//assets/UI/plus-pressed.png" ref="go_plus_pressed_ref">
              <button class="minus" ref="minus_button_ref"></button>
              <button class="go"  ref="go_button_ref"></button>
              <button class="plus"  ref="plus_button_ref"></button>
            </div>
            <div class="ControllsRight">
              <div class="sound" ref="sound_ref">
                <img class="sound-enabled"  draggable="false" src="/src//assets/UI/sound-enabled.png" ref="sound_image_enabled">
                <img class="sound-disabled disabled"  draggable="false" src="/src//assets/UI/sound-disabled.png" ref="sound_image_disabled">
              </div>
              <div class="speed" draggable="false" ref="speed_ref">
                <img class="speed1"  draggable="false" src="/src//assets/UI/speed-level-1.png" ref="speed1_image_ref">
                <img class="speed1-pressed disabled"  draggable="false" src="/src//assets/UI/speed-level-1-pressed.png" ref="speed1_image_pressed_ref">
                <img class="speed2 disabled"  draggable="false" src="/src//assets/UI/speed-level-2.png" ref="speed2_image_ref">
                <img class="speed2-pressed disabled"  draggable="false" src="/src//assets/UI/speed-level-2-pressed.png" ref="speed2_image_pressed_ref">
                <img class="speed3 disabled"  draggable="false" src="/src//assets/UI/speed-level-3.png" ref="speed3_image_ref">
                <img class="speed3-pressed disabled"  draggable="false" src="/src//assets/UI/speed-level-3-pressed.png" ref="speed3_image_pressed_ref">    
              </div>
            </div>
        </div>


    </div>
</template>

<script setup>
import { ref, onMounted , onUnmounted } from 'vue';
// GO CONSTANTS
const go_button_ref = ref(null)
const plus_button_ref = ref(null)
const minus_button_ref = ref(null)
const gocontrolls_ref = ref(null)
const go_default_ref = ref(null)
const go_pressed_ref = ref(null)
const go_minus_pressed_ref = ref(null)
const go_plus_pressed_ref = ref(null)
let CurrentGoState = go_default_ref;
let GoHoldFlag = false
let longPressActive = false;
let pressInterval = null;
const ButtonTimer = ref(null)
let intervalcooldown = 300

// SPEED CONSTANTS
const speed_ref = ref(null)
const speed1_image_ref = ref(null)
const speed1_image_pressed_ref = ref(null)
const speed2_image_ref = ref(null)
const speed2_image_pressed_ref = ref(null)
const speed3_image_ref = ref(null)
const speed3_image_pressed_ref = ref(null)
const speed_array = [
    speed1_image_ref,
    speed1_image_pressed_ref,
    speed2_image_ref,
    speed2_image_pressed_ref,
    speed3_image_ref,
    speed3_image_pressed_ref
];
let CurrentSpeedindex = 0
let speed_held = false


// SOUND CONSTANTS
const sound_ref = ref(null)
const sound_image_enabled = ref(null)
const sound_image_disabled = ref(null)
const soundon = ref(true)
const soundpressed = ref(false)


// MENU CONSTANTS
const menu_ref = ref(null)
const menu_image_disabled_ref = ref(null)
const menu_image_enabled_ref = ref(null)
const menuon = ref(false)
const menupressed = ref(false)

// AUTOPLAY CONSTANTS
const autoplay_ref = ref(null)
const autoplay_disabled_pushed_ref = ref(null)
const autoplay_disabled_ref = ref(null)
const autoplay_enabled_ref = ref(null)
const autoplay_enabled_pushed_ref = ref(null)
let currentautoplay = autoplay_disabled_ref
const autoplaypressed = ref(false)

// props
const props = defineProps({
  BetAmount_index: Number,
  BetAmount : Number,
  Balance: Number,
  autoPlayActive: Boolean,
  speedLevel: Number,
  settingsOpen: Boolean,
  soundOn: Boolean,
  isAutoPlayOpen:Boolean,
  isMenuOpen:Boolean,
  BonusBallDroped:Boolean,
  InBonusGame:Boolean,
});
// emits
const emit = defineEmits([
  'changeBetAmount',
  'changesound',
  'changespeedlevel',
  'opensettings',
  'startAutoPlay',
  'autoPlayToggle',  
  'bet',
  'changeAutoPlayOpen',
  'changeMenuOpen',
  'StopAutoPlay'
]);
// exposes
defineExpose({menuDefaulter,autoPlayDefaulter})


// GO-PLUS-MINUS EVENT FUNCTION
function handleGoMouseDown() {
  if(CurrentGoState.value){
    GoHoldFlag = true
    CurrentGoState.value.classList.add("disabled")
    CurrentGoState = go_pressed_ref
    CurrentGoState.value.classList.remove("disabled")
    if(!props.BonusBallDroped && !props.autoPlayActive){
      emit('bet' , props.BetAmount);
    ButtonTimer.value = setTimeout(() => {
      longPressActive = true
      pressInterval = setInterval(() => {
        emit('bet' , props.BetAmount)
      }, intervalcooldown);
    },400)
  }
  }
}
function handleMinusMouseDown() {
  if (CurrentGoState.value) {
    CurrentGoState.value.classList.add("disabled");
    CurrentGoState = go_minus_pressed_ref;
    CurrentGoState.value.classList.remove("disabled");
    if(!props.BonusBallDroped){
      emit('changeBetAmount', true);
      ButtonTimer.value = setTimeout(function run() {
      longPressActive = true;
      emit('changeBetAmount', true);
      if (intervalcooldown >= 100) {
        intervalcooldown -= 30;
      }
      pressInterval = setTimeout(run, intervalcooldown);
      }, 400);
    }
  }
}

function handlePlusMouseDown(){
  if(CurrentGoState.value){
    CurrentGoState.value.classList.add("disabled")
    CurrentGoState = go_plus_pressed_ref
    CurrentGoState.value.classList.remove("disabled")
    if(!props.BonusBallDroped){
      emit('changeBetAmount' , false);
      ButtonTimer.value = setTimeout(function run() {
      longPressActive = true;
      emit('changeBetAmount' , false);
      if (intervalcooldown >= 100) {
        intervalcooldown -= 30;
      }
      pressInterval = setTimeout(run, intervalcooldown);
      }, 400);
    }
  }
}

function clearGo(){
  clearTimeout(ButtonTimer.value);
  ButtonTimer.value = null;
  if (longPressActive) {
    clearInterval(pressInterval);
    longPressActive = false;
    intervalcooldown = 300
  }
  setTimeout(() => {
    if (CurrentGoState.value) {
      CurrentGoState.value.classList.add("disabled");
      CurrentGoState = go_default_ref;
      if (CurrentGoState.value) {
        CurrentGoState.value.classList.remove("disabled");
      }
    }
    GoHoldFlag = false
  }, 10);
}
// 

// SPEED EVENT FUNCTIONS
function speedMouseDownHandler(){
  emit('changespeedlevel')
  if(speed_array[CurrentSpeedindex].value){
    speed_held = true
  if(CurrentSpeedindex + 1 <= speed_array.length){
    speed_array[CurrentSpeedindex].value.classList.add("disabled")
    CurrentSpeedindex+=1
    speed_array[CurrentSpeedindex].value.classList.remove("disabled")
  }
}
}

function clearSpeed(){
  setTimeout(() => {
    if(CurrentSpeedindex >= speed_array.length - 1){
      speed_array[CurrentSpeedindex].value.classList.add("disabled")
      CurrentSpeedindex = 0
      speed_array[CurrentSpeedindex].value.classList.remove("disabled")
    }
    else{
      speed_array[CurrentSpeedindex].value.classList.add("disabled")
      CurrentSpeedindex += 1
      speed_array[CurrentSpeedindex].value.classList.remove("disabled")
    }
    speed_held = false
  }, 10);
}

function mouseleaveSpeed(){
  if(speed_held){
    clearSpeed()
  }
}
// 

// MENU EVENT FUNCTIONS
function menuMouseDownHandler(){
  if(menu_image_disabled_ref.value &&  menu_image_enabled_ref.value){
  menupressed.value = true
  menu_image_enabled_ref.value.classList.add("disabled")
  menu_image_disabled_ref.value.classList.remove("disabled")
}
}
function menuDefaulter(){
  menuon.value = false
  menu_image_disabled_ref.value.classList.add("disabled")
  menu_image_enabled_ref.value.classList.remove("disabled")
  menupressed.value = false
}
function menuMouseUpHandler(){
  emit("changeMenuOpen")
  menuon.value = true
  menupressed.value = false
}
function menuMouseleaveHandler(){
if(menupressed.value){
  menuMouseUpHandler()
}
}
// SOUND EVENT FUNCTIONS
function soundMouseDownHandler(){
  soundon.value = !soundon.value
  soundpressed.value = true
  if(sound_image_disabled.value && sound_image_enabled.value){
    if(soundon.value){
      sound_image_disabled.value.classList.add("disabled")
      sound_image_enabled.value.classList.remove("disabled")
    }
    else{
      sound_image_enabled.value.classList.add("disabled")
      sound_image_disabled.value.classList.remove("disabled")
    }
  }
}
function soundMouseUpHandler(){
  soundpressed.value = false
}
function soundMouseleaveHandler(){
  if(soundpressed.value){
    soundpressed.value = false
  }
}



// AUTOPLAY EVENT FUNCTIONS
function autoPlayMouseDownHandler(){
  autoplaypressed.value = true
  if(props.autoPlayActive){
    currentautoplay.value.classList.add("disabled")
    currentautoplay = autoplay_enabled_pushed_ref
    currentautoplay.value.classList.remove("disabled")
  }
  else{
    currentautoplay.value.classList.add("disabled")
    currentautoplay = autoplay_disabled_pushed_ref
    currentautoplay.value.classList.remove("disabled")
  }
}
function autoPlayMouseLeaveHandler(){
  if(autoplaypressed.value){
    autoPlayMouseUpHandler()
  }
}
function autoPlayMouseUpHandler(){
  autoplaypressed.value = false
  if(props.autoPlayActive){
    emit("StopAutoPlay")
  }
  else{
    emit("changeAutoPlayOpen")
  }
}
function autoPlayDefaulter(){
  autoplaypressed.value = false
  setTimeout(() => {
    if(props.autoPlayActive){
    emit("startAutoPlay")
    currentautoplay.value.classList.add("disabled")
    currentautoplay = autoplay_enabled_ref
    currentautoplay.value.classList.remove("disabled")
  }
  else{
    currentautoplay.value.classList.add("disabled")
    currentautoplay = autoplay_disabled_ref
    currentautoplay.value.classList.remove("disabled")
  }
  } , 10)
}
onMounted(() => {
  // GO-PLUS-MINUS EVENTS
  if (go_button_ref.value) {
    go_button_ref.value.addEventListener('mousedown',  handleGoMouseDown);
    go_button_ref.value.addEventListener('mouseup', clearGo);
    go_button_ref.value.addEventListener('mouseleave', clearGo);
  }
  if (plus_button_ref.value) {
    plus_button_ref.value.addEventListener('mousedown', handlePlusMouseDown);
    plus_button_ref.value.addEventListener('mouseup', clearGo);
    plus_button_ref.value.addEventListener('mouseleave', clearGo);
  }
  if (minus_button_ref.value) {
    minus_button_ref.value.addEventListener('mousedown',  handleMinusMouseDown);
    minus_button_ref.value.addEventListener('mouseup', clearGo);
    minus_button_ref.value.addEventListener('mouseleave', clearGo);
  }

  // SPEED EVENTS
  if(speed_ref.value){
    speed_ref.value.addEventListener('mousedown', speedMouseDownHandler)
    speed_ref.value.addEventListener('mouseup', clearSpeed)
    speed_ref.value.addEventListener('mouseleave', mouseleaveSpeed)
  }


  // Sound EVENTS
  if(sound_ref.value){
    sound_ref.value.addEventListener('mousedown' , soundMouseDownHandler)
    sound_ref.value.addEventListener('mouseup' , soundMouseUpHandler)
    sound_ref.value.addEventListener('mouseleave' ,soundMouseleaveHandler)
  }

  // MENU EVENTS
  if(menu_ref.value){
    menu_ref.value.addEventListener('mousedown' , menuMouseDownHandler)
    menu_ref.value.addEventListener('mouseup' , menuMouseUpHandler)
    menu_ref.value.addEventListener('mouseleave' ,menuMouseleaveHandler)
  }

  // AUTOPLAY EVENTS
  if(autoplay_ref.value){
    autoplay_ref.value.addEventListener('mousedown' , autoPlayMouseDownHandler)
    autoplay_ref.value.addEventListener('mouseup' , autoPlayMouseUpHandler)
    autoplay_ref.value.addEventListener('mouseleave' ,autoPlayMouseLeaveHandler)
  }

});


onUnmounted(() => {
  
});
</script>