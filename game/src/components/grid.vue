<template>
	<div style="gap: 10px" class="flex flex-col w-full justify-center items-center mt-10">
		<div v-for="(row, i) in rows" :id="row.id" class="w-full">
			<div style="gap: 10px" class="flex flex-row justify-center">
				<div class="box text-light-800 flex justify-center items-center font-bold text-[2.23rem]" v-for="idx in 5" :id="row.id + '-' + idx">{{ word[idx - 1] }}</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { reactive, onMounted, ref } from 'vue';
	const rows = reactive([
		{ id: "first-row", value: "" },
		{ id: "second-row", value: "" },
		{ id: "third-row", value: "" },
		{ id: "forth-row", value: "" },
		{ id: "fifth-row", value: "" },
	])
	const props = defineProps({
		keys: {
			type: Array,
			default: []
		}
	})
	const word = ref("")
	function controllerWord(key: string) {
		if(word.value.length >= 5) return

		word.value += key
		console.log(word.value)
	}
	onMounted(() => {
		document.getElementsByTagName('html')[0].addEventListener('keydown', (e) => {
			if(props.keys.includes(e.key)) {
				controllerWord(e.key.toUpperCase())
			}
		})
	})
</script>

<style scoped>
.box {
	max-width: 80px;
	min-width: 50px;
	aspect-ratio: 1;
	border: 1px solid rgb(255, 255, 255);
	flex-grow: 1;
}
</style>