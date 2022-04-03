<template>
	<div class="flex flex-col mt-10 font-bold w-full">
		<div style="gap: 10px" class="flex flex-row justify-center content-center w-full">
			<div v-for="(key, i) in keys_first_row" class="h-20 w-20 min-h-5 max-h-40 min-w-5 max-w-40 bg-dark-500 text-light-50 rounded-md flex items-center justify-center">
				<span class="p-2">{{ key.toUpperCase() }}</span>
			</div>
		</div>
		<div style="gap: 10px" class="flex flex-row justify-center content-center w-full mt-5">
			<div v-for="(key, i) in keys_second_row" class="h-20 w-20 min-h-5 max-h-40 min-w-5 max-w-40 bg-dark-500 text-light-50 rounded-md flex items-center justify-center">
				<span class="p-2">{{ key != 'i' ? key.toUpperCase() : key }}</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const keys_first_row = reactive([
	"q", "w", "e", "r", "t", "y", "u", "ı", "o", "p", "ğ", "ü"
])
const keys_second_row = reactive([
	"a", "s", "d", "f", "g", "h", "j", "k", "l", "ş", "i"
])
</script>

<style scoped>
</style>