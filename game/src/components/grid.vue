<template>
	<div style="gap: 10px" class="flex flex-col w-full justify-center items-center mt-10">
		<div v-for="(row, i) in rows" :id="row.id" class="w-full">
			<div style="gap: 10px" class="flex flex-row justify-center">
				<div
					class="box text-light-800 flex justify-center items-center font-bold text-[2.23rem]"
					:class="{'box-full' : !!row.value[idx - 1]}"
					v-for="idx in 5"
					:id="row.id + '-' + idx"
				>{{ row.value[idx - 1] }}</div>
			</div>
		</div>
		<Alert ref="alert" :text="'Invalid Word'"/>
	</div>
</template>

<script setup lang="ts">
import Alert from './helpers/alert.vue'
import { reactive, onMounted, ref, computed } from 'vue';
import axios from 'axios'
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
const activeRow = ref(0)
const alert = ref()
function controllerWord(key: string) {
	if(rows[activeRow.value].value.length < 5) {
		rows[activeRow.value].value += key
	}
}
async function handleKeyDown(e: KeyboardEvent) {
	console.log(e.key)
	if(e.key.toLowerCase() == 'backspace') {
		rows[activeRow.value].value = rows[activeRow.value].value.slice(0, -1)
		return
	}
	if(e.key.toLowerCase() == 'enter') {
		// make API call
		try {
			const result = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${rows[activeRow.value].value}`)
			console.log(result)
		} catch(err) {
			alert.value.animate()
			console.error(err)
		}
	}
	if (props.keys.includes(e.key)) {
		controllerWord(e.key.toUpperCase())
	}
}
const listenKey = () => {
	document.getElementsByTagName('html')[0].addEventListener('keydown', handleKeyDown)
}
const stopListen = () => {
	document.getElementsByTagName('html')[0].removeEventListener('keydown', handleKeyDown)
}
onMounted(() => {
	listenKey()
})

defineExpose({
	controllerWord
})
</script>

<style scoped>
.box {
	max-width: 50px;
	aspect-ratio: 1;
	border: 2px solid rgb(179, 179, 179);
	flex-grow: 1;
	transition: all 0.5s;
}
.box-full {
	background: rgb(32, 32, 32);
}
</style>