<script setup lang="ts">
import Game from './pages/game.vue'
import Navbar from "@/components/navbar.vue"
</script>

<template>
  <Navbar />
  <Game />
</template>

<style>
@import "./style/main.css";
@import "./assets/plugins/fontawesome6/all.css";
@import "animate.css";
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
