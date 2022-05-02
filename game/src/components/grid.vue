<template>
	<div style="gap: 10px" class="flex flex-col w-full justify-center items-center mt-10">
		<div v-for="(row, i) in rows" :id="row.id" :key="i" class="w-full">
			<div style="gap: 10px" class="flex flex-row justify-center">
				<div class="box box-border text-light-800 flex justify-center items-center font-bold text-[2.23rem] rounded-md"
					:class="{ 'box-full': !!row.value[idx - 1] }" v-for="idx in 5" :id="row.id + '-' + (idx - 1)" :key="idx">{{
						row.value[idx - 1]
					}}</div>
			</div>
		</div>
		<Alert ref="alert" :text="'Invalid Word'" />
		<div v-show="isLottie" id="lottie" style="position: fixed; width: 100vw; height: 100vh; top: 50px"></div>
		<Winner ref="winner" @onRestart="onRestart"/>
	</div>
</template>

<script setup lang="ts">
import Lottie from 'lottie-web'
import Alert from './helpers/alert.vue'
import { reactive, onMounted, ref, computed } from 'vue';
import Winner from "@/components/winner.vue"
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
const emits = defineEmits(['submit', 'onRestart'])
const activeRow = ref(0)
const alert = ref()
const isLottie = ref(false)
const winner = ref()
const canInput = ref(true)

function controllerWord(key: string) {
	if (rows[activeRow.value].value.length < 5) {
		rows[activeRow.value].value += key
	}
}

async function onSubmitSuccess(values: Keys[]) {
	return new Promise<void>(async (res) => {
		stopListen()
		canInput.value = false
		let isFound: number = 0
		for (let i = 0; i < values.length; i++) {
			await (function sleep() {
				return new Promise((resolve) => {
					setTimeout(resolve, 300)
				})
			})()
			const el: any = document.querySelector<HTMLElement>(`#row-${activeRow.value}-${i}`)
			if (!values[i].contains) {
				anim(el, "#3d4054")
				continue
			}
			if (!values[i].match && values[i].contains) {
				anim(el, "includes-bg")
			} else {
				anim(el, "success-bg")
				isFound += 1
			}
		}
		if (isFound === 5) {
			firework()
			winner.value.display(true)
		} else {
			listenKey()
			canInput.value = true
		}
		activeRow.value += 1
		res()
	})
}
async function handleKeyDown(e: any) {
	if(!canInput.value) {
		return
	}
	let key = e

	if(typeof e == 'object') key = e.key
	console.log(e.key)
	if (key.toLowerCase() == 'backspace') {
		rows[activeRow.value].value = rows[activeRow.value].value.slice(0, -1)
		return
	}
	if (key.toLowerCase() == 'enter') {
		emits('submit', rows[activeRow.value].value)
	}
	if (props.keys.includes(key)) {
		controllerWord(key.toUpperCase())
	}
}
const onRestart = () => {
	rows.forEach(e => e.value = "")
	activeRow.value = 0
	emits('onRestart')
	canInput.value = true
	isLottie.value = false
	listenKey()
}
const anim = (el: HTMLElement, cls: string) => {
	el.classList.toggle("rotate")
	el.classList.remove("box-border")
	el.classList.toggle(cls)
}
const firework = () => {
	isLottie.value = true
	Lottie.loadAnimation({
		container: document.getElementById("lottie"),
		renderer: "svg",
		loop: false,
		autoplay: true,
		path: "assets/lottie/data.json",
	})
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
onMounted(() => {
	listenKey()
})

defineExpose({
	controllerWord,
	onSubmitSuccess,
	handleKeyDown,
	err,
})
</script>

<style scoped>
.box {
	max-width: 50px;
	aspect-ratio: 1;
	flex-grow: 1;
	transition: background 0.3s, transform 1s;
}

.box-border {
	border: 2px solid rgb(179, 179, 179);
}

.box-full {
	background: rgb(32, 32, 32);
}

.rotate {
	transform: rotate3d(1, 0, 0, 360deg);
}
.success-bg {
	background: #6ac66a;
}
.includes-bg {
	background: #f3c237;
}
</style>