<template>
	<div style="gap: 10px" class="flex flex-col w-full justify-center items-center mt-10">
		<div v-for="(row, i) in rows" :id="row.id" class="w-full">
			<div style="gap: 10px" class="flex flex-row justify-center">
				<div class="box" v-for="idx in 5" :id="row.id + '-' + idx"></div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const rows = reactive([
	{ id: "first-row", value: "" },
	{ id: "second-row", value: "" },
	{ id: "third-row", value: "" },
	{ id: "forth-row", value: "" },
	{ id: "fifth-row", value: "" },
])
</script>

<style scoped>
.box {
	max-width: 80px;
	min-width: 50px;
	aspect-ratio: 1;
	border: 1px solid rgb(255, 255, 255);
	flex-grow: 1;
}
</style>