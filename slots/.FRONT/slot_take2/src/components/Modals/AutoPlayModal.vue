<template>
    <div>
        <Teleport to="#modal">
          <Transition name="modal">
            <div class="modal-bg" v-if="props.isOpen">
                <div class="modal" ref="modal">
                    <button @click="closeModal" class="modal-close-btn">x</button>
                    <div>autoplay is Open</div>
                    <div class="autoplay_amount_button_cont">
                      <button class="autoplay_amount_button" @click="turnonautoplay(5)">5</button>
                      <button class="autoplay_amount_button" @click="turnonautoplay(20)">20</button>
                      <button class="autoplay_amount_button" @click="turnonautoplay(50)">50</button>
                      <button class="autoplay_amount_button" @click="turnonautoplay(100)">100</button>
                      <button class="autoplay_amount_button" @click="turnonautoplay(1000)">1000</button>
                      <button class="autoplay_amount_button" @click="turnonautoplay(-1)">inf</button>
                    </div>
                    <div>Click OutSide</div>
                </div>
            </div>
          </Transition>
        </Teleport>
    </div>
</template>
    
<script setup lang="ts">
    import { defineProps, defineEmits, ref } from 'vue';
    import {onClickOutside} from '@vueuse/core'
    const modal = ref(null)
    const props = defineProps({
      isOpen: Boolean
    });
    
    const emit = defineEmits(['close' , 'startAutoPlay']);
    
    function closeModal() {
      emit('close');
    }
    function turnonautoplay(amount : number){
        emit('close')
        emit('startAutoPlay' , amount)
    }
    
    onClickOutside(modal , () => {closeModal()})
</script>