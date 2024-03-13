<script setup lang="ts">
import { generateanimationsets } from './assets/Data_textures';
import { loadassets  } from './assets/Data_textures';
import GameContainer from './components/GameContainer.vue'
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
