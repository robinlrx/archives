<template>
	<div class="legend-item">
		<div class="picto" :style="{background: pictolegend, width: pictowidth, height: pictoheight}"></div>
		<div>
			<p class="bold-name" v-html="boldname"></p>
			<p class="name" v-html="name"></p>
		</div>
	</div>
</template>

<script>
export default {
	name: "LegendItem",
	props: {
		pictolegend: {
			type: String,
			required: false,
			default: "none"
		},
		pictowidth: {
			type: String,
			required: false,
			default: "50px"
		},
		pictoheight: {
			type: String,
			required: false,
			default: "20px"
		},
		boldname: {
			type: String,
			required: false,
			default: undefined,
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
	/* height: 30px; */
}

p {
	margin: 0;
}

.bold-name {
	font-family: 'Georgia-bold';
	font-size: 1.2rem;
}

.name {
	font-family: 'Georgia-regular';
}

.picto {
	border: solid var(--black);
	margin-right: 20px;
	background-size: 80% 80% !important;
	background-repeat: no-repeat !important;
	background-position: center !important;
}
</style>
