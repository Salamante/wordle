<script setup lang="ts">
	import Grid from "@/components/grid.vue"
	import Keyboard from "@/components/keyboard.vue"
	import { ref, onMounted } from "vue";
	import axios from "axios";

	interface Response {
		config: object,
		data: object[],
		headers: object,
		request?: XMLHttpRequest,
		status: number,
		statusText: string
	}

	/* refs */
	const kb = ref()
	const grid = ref()


	const keys = ref([])
	const clickedKey = ref("")
	let result: Response
	// https://wordle-348917.lm.r.appspot.com
	const server: string = "https://wordle-348917.lm.r.appspot.com/api/random"

	const onKey = (key: string) => {
		console.log("key is : ", key)
		grid.value.controllerWord(key.toUpperCase())
	}
	const onEnter = () => {
		grid.value.handleKeyDown('enter')
	}
	const onBackspace = () => {
		grid.value.handleKeyDown('backspace')
	}
	const onRestart = async () => {
		await axios.get("https://wordle-348917.lm.r.appspot.com/api/refresh")
	}
	const onSubmit = async (res: any) => {
		try {
			result = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${res}`)
			console.log(result.data)
			const response = await axios.get(`${server}/${res.toLowerCase()}`)
			console.log(response.data)
			grid.value.onSubmitSuccess(response.data)
		} catch (err) {
			console.error(err)
			grid.value.err()
		}
	}
	onMounted(() => {
		keys.value = kb.value.keys_all
	})
</script>
<template>
	<div id="game" class="w-full game-container">
		<div class="divider"></div>
		<Grid ref="grid" :keys="keys" @submit="onSubmit" @onRestart="onRestart"/>
		<Keyboard ref="kb" @onKey="onKey" @onEnter="onEnter" @onBackspace="onBackspace"/>
	</div>
</template>

<style scoped>
.divider {
	width: 100%;
	height: 2px;
	background: gray;
}
.game-container {
	transition: all 1s;
}
</style>