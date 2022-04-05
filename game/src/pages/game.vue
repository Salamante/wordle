<script setup lang="ts">
	import Navbar from "@/components/navbar.vue"
	import Grid from "@/components/grid.vue"
	import Keyboard from "@/components/keyboard.vue"
	import { ref, onMounted } from "vue";

	const kb = ref()
	const keys = ref([])
	onMounted(() => {
		keys.value = kb.value.keys_all
	})
</script>
<template>
	<div class="w-full">
		<Navbar />
		<div class="divider"></div>
		<Grid :keys="keys"/>
		<Keyboard ref="kb" />
	</div>
</template>

<style scoped>
.divider {
	width: 100%;
	height: 2px;
	background: gray;
}
</style>