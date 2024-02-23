<script setup lang="ts">
import { generateanimationsets } from './assets/Data_textures';
import { loadassets , slotTextures } from './assets/Data_textures';
import GameContainer from './components/GameContainer.vue'
import * as PIXI from 'pixi.js'
loadassets()
generateanimationsets()
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
