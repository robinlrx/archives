<template>
	<div class="legend-item">
		<div class="picto" :style="{background: pictocolor}"></div>
		<p>{{name}}</p>
	</div>
</template>

<script>
export default {
	name: "LegendItem",
	props: {
		pictocolor: {
			type: String,
			required: false,
			default: "none"
		},
		name: {
			type: String,
			required: true,
			default: undefined,
		}
	}
}
</script>

<style scoped>
@import '../../css/general.css';

.legend-item {
	display: flex;
	justify-content: start;
	align-items: center;
	margin: 5px 10px;
	font-family: 'Georgia-regular';
	height: 30px;
}

.picto {
	border: solid var(--black);
	width: 50px;
	height: 20px;
	margin-right: 20px;
	background-size: cover;
}
</style>
