<template>
    <div>
        <Teleport to="#modal">
          <Transition name="modal">
            <div class="modal-bg" v-if="props.isOpen">
                <div class="modal" ref="modal">
                    <button @click="closeModal" class="modal-close-btn">x</button>
                    <div>Click OutSide</div>
                    <div>autoplay is Open</div>
                    <button @click="turnonautoplay">turn on autoplay</button>
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
    function turnonautoplay(){
        emit('close')
        emit('startAutoPlay' , 1000)
    }
    
    onClickOutside(modal , () => {closeModal()})
</script>