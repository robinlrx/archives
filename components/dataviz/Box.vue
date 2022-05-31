<template>
	<div class="stats" :style="{width: width}" :class="addclass">
		<div class="onglet">
			<p :style="{backgroundColor: iconBackground, color: iconColor}">{{icon}}</p>
			<p>{{title}}</p>
		</div>
		<slot />
	</div>
</template>

<script>
export default {
	name: "Box",
	props: {
		width: {
			type: String,
			required: false,
			default: '70%'
		},
		title: {
			type: String,
			required: false,
			default: "Alors monsieur l'enquêteur ?"
		},
		icon: {
			type: String,
			required: false,
			default: "?"
		},
		iconBackground: {
			type: String,
			required: false,
			default: "#649F8E"
		},
		iconColor: {
			type: String,
			required: false,
			default: 'black'
		},
		addclass: {
			type: String,
			require: false,
			default: undefined,
		}
	}
}
</script>

<style>
@import '../../css/general.css';

.stats {
	/* width: 70%; */
	border: solid var(--black);
	/* padding: 30px; */
}

.stats .onglet {
	display: flex;
	/* justify-content: center; */
	align-items: center;
	border-bottom: solid var(--black);
	font-family: 'Georgia-bold';
	height: 25px;
}

.onglet p:first-of-type {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 25px;
	height: 100%;
	text-align: center;
}

.onglet p:last-of-type {
	margin-left: 20px;
	/* margin-top: 5px;
	margin-bottom: 5px; */
}

.stats .onglet p:first-of-type {
	/* background-color: var(--green); */
	border-right: solid var(--black);
}
</style>