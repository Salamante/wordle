<template>
	<div style="gap: 10px" class="flex flex-col w-full justify-center items-center mt-10">
		<div v-for="(row, i) in rows" :id="row.id" :key="i" class="w-full">
			<div style="gap: 10px" class="flex flex-row justify-center">
				<div
					class="box text-light-800 flex justify-center items-center font-bold text-[2.23rem]"
					:class="{'box-full' : !!row.value[idx - 1]}"
					v-for="idx in 5"
					:id="row.id + '-' + (idx - 1)"
					:key="idx"
				>{{ row.value[idx - 1] }}</div>
			</div>
		</div>
		<Alert ref="alert" :text="'Invalid Word'"/>
		<div id="lottie" style="position: absolute; width: 100vw; height: 100vh;"></div>
	</div>
</template>

<script setup lang="ts">
import Alert from './helpers/alert.vue'
import Lottie from 'lottie-web'
import { reactive, onMounted, ref, computed } from 'vue';
interface Keys {
	match: boolean,
	contains: boolean
}
const rows = reactive([
	{ id: "row-0", value: "" },
	{ id: "row-1", value: "" },
	{ id: "row-2", value: "" },
	{ id: "row-3", value: "" },
	{ id: "row-4", value: "" },
])
const props = defineProps({
	keys: {
		type: Array,
		default: []
	}
})
const emits = defineEmits(['submit'])
const activeRow = ref(0)
const alert = ref()
function controllerWord(key: string) {
	if(rows[activeRow.value].value.length < 5) {
		rows[activeRow.value].value += key
	}
}
function controllerRow() {}
async function onSubmitSuccess(values: Keys[]) {
	let isFound: number = 0
	for (let i = 0; i < values.length; i++) {
		await (function sleep() {
			return new Promise((resolve) => {
				setTimeout(resolve, 300)
			})
		})()
		const el: any = document.querySelector<HTMLElement>(`#row-${activeRow.value}-${i}`)
		if(!values[i].contains) {
			anim(el, "gray")
			continue
		}
		if(!values[i].match && values[i].contains) {
			anim(el, "#ccca58")
		} else {
			anim(el, "#509c4b")
			isFound += 1
		}
	}
	if(isFound === 5) {
		stopListen()
		firework()
	}
	activeRow.value += 1
}
async function handleKeyDown(e: KeyboardEvent) {
	console.log(e.key)
	if(e.key.toLowerCase() == 'backspace') {
		rows[activeRow.value].value = rows[activeRow.value].value.slice(0, -1)
		return
	}
	if(e.key.toLowerCase() == 'enter') {
			emits('submit', rows[activeRow.value].value)
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
const err = () => {
	alert.value.animate()
}
const anim = (el: HTMLElement, color: string) => {
	el.classList.toggle("rotate")
	el.style.background = color
}
const firework = () => {
	Lottie.loadAnimation({
		container: document.getElementById("lottie"),
		renderer: "svg",
		loop: false,
		autoplay: true,
		path: "src/assets/lottie/data.json",
	})
}
onMounted(() => {
	listenKey()
})

defineExpose({
	controllerWord,
	onSubmitSuccess,
	err
})
</script>

<style scoped>
.box {
	max-width: 50px;
	aspect-ratio: 1;
	border: 2px solid rgb(179, 179, 179);
	flex-grow: 1;
	transition: background 0.3s, transform 2s ;
}
.box-full {
	background: rgb(32, 32, 32);
}
.rotate {
	transform: rotate3d(0, 0.5, 0, 360deg);
}
</style>