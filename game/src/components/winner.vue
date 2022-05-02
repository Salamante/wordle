<template>
	<transition name="fade">
		<div v-if="isShow" class="fixed top-0 flex modal-bg">
			<div class="w-80 bg-dark-500 rounded-lg block overflow-hidden shadow-xl shadow-current mt-40">
				<!-- Header::start -->
				<div class="p-2 relative w-full flex justify-center bg-gray-600">
					<div class="h-full absolute flex right-3 top-0 justify-center">
						<i role="button" class="fa-light fa-x text-light-50 m-auto fa-sm" @click="onClose"></i>
					</div>
					<h1 class="text-yellow-400 font-bold text-lg">You Won! <i class="fa-duotone fa-trophy-star"></i></h1>
				</div>
				<!-- Header::end -->
				<div class="flex flex-col justify-center items-center p-3 text-light-900 text-xs">
					<div class="btn" @click="onRestart">RESTART</div>
					<p>or press <span class="italic">enter</span></p>
					<div class="w-full p-2 mt-4 text-center bg-gray-500 rounded-lg btn">
						<p><i class="fa-thin fa-share-nodes"></i> Share</p>
					</div>
					<div class="w-full p-2 mt-4 mb-4 text-center bg-gray-500 rounded-lg btn">
						<p><i class="fa-thin fa-table-cells"></i> Copy your puzzle with emojis</p>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';


const emit = defineEmits(['onRestart'])
const isShow = ref(false)

const display = (bool: boolean) => {
	isShow.value = bool
}

const onClose = () => {
	isShow.value = false
}
const onRestart = () => {
	isShow.value = false
	emit('onRestart')
}

defineExpose({
	display
})

</script>

<style scoped>
.modal-bg {
	background: rgba(49, 49, 49, 0.4);
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: start;
}
</style>