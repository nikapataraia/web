<script setup lang="ts">
import { loadassets , slotTextures } from './assets/Data';
import GameContainer from './components/GameContainer.vue'
import * as PIXI from 'pixi.js'

loadassets()

</script>

<template>
  <header>

  </header>

  <main>
    <GameContainer></GameContainer>
  </main>

  <footer>

  </footer>
  
</template>
