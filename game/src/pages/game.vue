<template>
	<div class="w-full">
		<Navbar />
		<div class="divider"></div>
		<Grid />
		<Keyboard />
	</div>
</template>

<script setup lang="ts">
import Navbar from "@/components/navbar.vue"
import Grid from "@/components/grid.vue"
import Keyboard from "@/components/keyboard.vue"
</script>

<style scoped>
.divider {
	width: 100%;
	height: 2px;
	background: gray;
}
</style>