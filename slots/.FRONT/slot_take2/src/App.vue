<script setup lang="ts">
import { generateanimationsets } from './assets/Data_textures';
import { loadassets  } from './assets/Data_textures';
import BonusGameContainer from './components/BonusGameContainer.vue'
loadassets()
generateanimationsets()
</script>


<template>
  <header>

  </header>

  <main>
    <BonusGameContainer></BonusGameContainer>
  </main>

  <footer>

  </footer>
  
</template>
