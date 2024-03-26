<script setup lang="ts">
import { generateanimationsets } from './assets/Data_textures';
import { loadassets  } from './assets/Data_textures';
import BonusGameContainer from './components/BonusGameContainer.vue'
import MainGameContainer from './components/MainGameContainer.vue';
loadassets()
generateanimationsets()
</script>


<template>
  <header>

  </header>

  <main>
    <!-- <BonusGameContainer></BonusGameContainer> -->
    <MainGameContainer></MainGameContainer>
  </main>

  <footer>

  </footer>
  
</template>
./assets/DataBonus/Data_textures./assets/DataBonus/Data_textures