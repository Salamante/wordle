<script setup lang="ts">
	import Navbar from "@/components/navbar.vue"
	import Grid from "@/components/grid.vue"
	import Keyboard from "@/components/keyboard.vue"
	import { ref, onMounted } from "vue";

	/* refs */
	const kb = ref()
	const grid = ref()


	const keys = ref([])
	const clickedKey = ref("")

	const onKey = (key: string) => {
		grid.value.controllerWord(key.toUpperCase())
	}
	onMounted(() => {
		keys.value = kb.value.keys_all
	})
</script>
<template>
	<div class="w-full">
		<Navbar />
		<div class="divider"></div>
		<Grid ref="grid" :keys="keys"/>
		<Keyboard ref="kb" @onKey="onKey"/>
	</div>
</template>

<style scoped>
.divider {
	width: 100%;
	height: 2px;
	background: gray;
}
</style>