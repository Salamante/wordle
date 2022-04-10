<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
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

	const emit = defineEmits(["onKey"])
	function onClickKey(key: string) {
		emit('onKey', key)
	}
	onMounted(() => {
	})

	defineExpose({
		keys_all
	})
</script>
<template>
	<div class="flex flex-col mt-10 font-bold w-full">
		<div style="gap: 5px" class="flex flex-row justify-center content-center w-full cursor-pointer">
			<div
				v-for="(key, i) in keys_first_row"
				class="h-8 w-8 bg-dark-500 text-light-50 rounded-md flex items-center justify-center key"
				@click="onClickKey(key)"
			>
				<span>{{ key.toUpperCase() }}</span>
			</div>
		</div>
		<div style="gap: 5px" class="flex flex-row justify-center content-center w-full mt-2 cursor-pointer">
			<div
				v-for="(key, i) in keys_second_row"
				class="h-8 w-8 bg-dark-500 text-light-50 rounded-md flex items-center justify-center key"
				@click="onClickKey(key)"
			>
				<span>{{ key != 'i' ? key.toUpperCase() : key }}</span>
			</div>
		</div>
		<div style="gap: 5px" class="flex flex-row justify-center content-center w-full mt-2 cursor-pointer">
			<div
				v-for="(key, i) in keys_third_row"
				class="h-8 w-8 bg-dark-500 text-light-50 rounded-md flex items-center justify-center key"
				@click="onClickKey(key)"
			>
				<span>{{ key != 'i' ? key.toUpperCase() : key }}</span>
			</div>
		</div>
	</div>
</template>

<style scoped>
</style>