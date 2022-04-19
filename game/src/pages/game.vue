<script setup lang="ts">
	import Navbar from "@/components/navbar.vue"
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

	const onKey = (key: string) => {
		grid.value.controllerWord(key.toUpperCase())
	}
	const onSubmit = async (res: any) => {
		try {
			result = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${res}`)
			console.log(result.data)
			const response = await axios.get(`http://localhost:8081/api/random/${res.toLowerCase()}`)
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
	<div class="w-full">
		<Navbar />
		<div class="divider"></div>
		<Grid ref="grid" :keys="keys" @submit="onSubmit"/>
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