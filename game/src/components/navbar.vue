<template>
	<div class="bg-gray-700 w-full h-12 text-light-50 relative flex flex-row">
		<div class="absolute w-full top-0 left-0 flex justify-center">
			<h1 class="text-center text-lg font-bold tracking-widest mt-3 text-green-400">WORDLE</h1>
		</div>
		<i class="fa-solid fa-square-w fa-2x ml-4 text-green-400"></i>
		<div style="gap: 20px;" class="flex flex-row mr-5 m-auto">
			<button class="btn-icon">
				<i class="fa-regular fa-circle-question"></i>
			</button>
			<button class="btn-icon">
				<i class="fa-light fa-chart-line"></i>
			</button>
			<button class="btn-icon">
				<i class="fa-duotone fa-gear"></i>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped>
</style>