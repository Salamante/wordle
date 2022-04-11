<template>
	<div class="w-auto h-11 bg-red-500 rounded-lg absolute flex justify-center items-center alert-box"
		:class="{ 'opacity-0': opacity }">
		<p class="text-black text-lg m-4 font-bold tracking-wider">{{ text }}</p>
	</div>
</template>

<script setup lang="ts">
	import { defineProps, ref, onMounted } from 'vue';

	const props: Object = defineProps({
		text: {
			type: String,
			default: "alert text",
		}
	})
	const opacity = ref(true)
	const animate = () => {
		const interval = setInterval(() => {
			opacity.value = !opacity.value
		},500)

		setTimeout(() => {
			clearInterval(interval)
			opacity.value = true
		}, 2000);
	}
	defineExpose({animate})
</script>

<style scoped>
.alert-box {
	transition: all 0.5s;
}
</style>