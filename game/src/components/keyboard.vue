<script setup lang="ts">
import { reactive, ref, onMounted, defineEmits } from 'vue';
	const keys_first_row = ref([
		"q", "w", "e", "r", "t", "y", "u", "ı", "o", "p", "ğ", "ü"
	])
	const keys_second_row = ref([
		"a", "s", "d", "f", "g", "h", "j", "k", "l", "ş", "i"
	])
	const keys_third_row = ref([
		"z", "x", "c", "v", "b", "n", "m", "ö", "ç"
	])
	const keys_all: any = ref([keys_first_row.value, keys_second_row.value, keys_third_row.value].flat())

	const emit = defineEmits(["test"])
	function firstEmit() {
		emit('test', 'deneme')
	}
	onMounted(() => {
		setTimeout(() => {
			firstEmit()
		}, 1000);
	})

	defineExpose({
		keys_all
	})
</script>
<template>
	<div class="flex flex-col mt-10 font-bold w-full">
		<div style="gap: 10px" class="flex flex-row justify-center content-center w-full cursor-pointer">
			<div
				v-for="(key, i) in keys_first_row"
				class="h-20 w-20 min-h-5 max-h-40 min-w-5 max-w-40 bg-dark-500 text-light-50 rounded-md flex items-center justify-center key"
			>
				<span class="p-2">{{ key.toUpperCase() }}</span>
			</div>
		</div>
		<div style="gap: 10px" class="flex flex-row justify-center content-center w-full mt-5">
			<div
				v-for="(key, i) in keys_second_row"
				class="h-20 w-20 min-h-5 max-h-40 min-w-5 max-w-40 bg-dark-500 text-light-50 rounded-md flex items-center justify-center"
			>
				<span class="p-2">{{ key != 'i' ? key.toUpperCase() : key }}</span>
			</div>
		</div>
		<div style="gap: 10px" class="flex flex-row justify-center content-center w-full mt-5">
			<div
				v-for="(key, i) in keys_third_row"
				class="h-20 w-20 min-h-5 max-h-40 min-w-5 max-w-40 bg-dark-500 text-light-50 rounded-md flex items-center justify-center"
			>
				<span class="p-2">{{ key != 'i' ? key.toUpperCase() : key }}</span>
			</div>
		</div>
	</div>
</template>

<style scoped>
</style>