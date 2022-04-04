<script setup lang="ts">
	import Navbar from "@/components/navbar.vue"
	import Grid from "@/components/grid.vue"
	import Keyboard from "@/components/keyboard.vue"
	import { ref, onMounted } from "vue";

	const kb = ref()
	function log(payload: any) {
		console.log(payload)
	}

	onMounted(() => {
		document.getElementsByTagName('html')[0].addEventListener('keydown', (e) => {
			if(kb.value.keys_all.includes(e.key)) {
				console.log(e.key)
			}
		})
	})
</script>
<template>
	<div class="w-full">
		<Navbar />
		<div class="divider"></div>
		<Grid />
		<Keyboard ref="kb" @test="log"/>
	</div>
</template>

<style scoped>
.divider {
	width: 100%;
	height: 2px;
	background: gray;
}
</style>