<template>
	<div class="box" :style="{width: width}" :class="addclass">
		<div class="onglet">
			<p :style="{backgroundColor: iconBackground, color: iconColor}">{{icon}}</p>
			<p>{{title}}</p>
			<div class="triangle"></div>
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
			default: '900px' // 80%
		},
		title: {
			type: String,
			required: false,
			default: "Alors, inspecteur D. Chevrai, observons vos résultats..."
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

.box {
	/* width: 70%; */
	border: solid var(--black);
	/* padding: 30px; */
	/* background-color: var(--cream); */
}

.box .onglet {
	display: flex;
	/* justify-content: center; */
	align-items: center;
	border-bottom: solid var(--black);
	font-family: 'Georgia-bold';
	height: 25px;
	position: relative;
}

.onglet p:first-of-type {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 25px;
	height: 100%;
	text-align: center;
	position: relative;
}

.onglet p:last-of-type {
	margin-left: 20px;
	/* margin-top: 5px;
	margin-bottom: 5px; */
}

.box .onglet p:first-of-type {
	/* background-color: var(--green); */
	border-right: solid var(--black);
}

.triangle {
	width: 0; 
	height: 0; 
	border-top: 25px solid var(--black);
	border-bottom: 25px solid transparent;
	border-left: 25px solid transparent;
	position: absolute;
	right: 0;
	top: 0;
}
</style>