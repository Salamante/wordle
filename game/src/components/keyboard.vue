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

	const emit = defineEmits(["onKey", "onEnter", "onBackspace"])
	function onKey(key: string) {
		emit('onKey', key)
	}
	function onEnter() {
		emit('onEnter')
	}
	function onBackspace() {
		emit('onBackspace')
	}
	onMounted(() => {
	})

	defineExpose({
		keys_all
	})
</script>
<template>
	<div class="flex flex-col mt-10 font-bold w-full">
		<div style="gap: 5px" class="flex flex-row justify-center content-center w-full">
			<a
				role="button"
				v-for="(key, i) in keys_first_row"
				:id="`key-${key}`"
				class="h-8 w-8 bg-dark-500 text-light-50 rounded-md flex items-center justify-center key"
				@click="onKey(key)"
			>
				<span>{{ key.toUpperCase() }}</span>
			</a>
		</div>
		<div style="gap: 5px" class="flex flex-row justify-center content-center w-full mt-2">
			<a
				v-for="(key, i) in keys_second_row"
				role="button"
				:id="`key-${key}`"
				class="h-8 w-8 bg-dark-500 text-light-50 rounded-md flex items-center justify-center key"
				@click="onKey(key)"
			>
				<span>{{ key != 'i' ? key.toUpperCase() : key }}</span>
			</a>
		</div>
		<div style="gap: 5px" class="flex flex-row justify-center content-center w-full mt-2">
			<a
				class="h-8 w-16 bg-dark-500 text-light-50 rounded-md flex items-center justify-center key"
				@click="onBackspace"
			>
				<i class="fa-regular fa-delete-left"></i>
			</a>
			<a
				v-for="(key, i) in keys_third_row"
				role="button"
				:id="`key-${key}`"
				class="h-8 w-8 bg-dark-500 text-light-50 rounded-md flex items-center justify-center key"
				@click="onKey(key)"
			>
				<span>{{ key != 'i' ? key.toUpperCase() : key }}</span>
			</a>
			<a
				class="h-8 w-16 bg-dark-500 text-light-50 rounded-md flex items-center justify-center key"
				role="button"
				@click="onEnter"
			>
				<span>ENTER</span>
			</a>
		</div>
	</div>
</template>

<style scoped>
</style>