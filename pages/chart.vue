<template>
	<div>
		<h1>Pensez-vous avoir été objectif ?</h1>
		<section>
			<h2>Data 1: Omar est-il le meurtrier ?</h2>
			<div class="dataviz dataviz-no">
				<div ref='yesChart' class="chart chart-yes"></div>
				<p ref='yesText' class="yes-text"></p>
			</div>
			<div class="dataviz dataviz-yes">
				<div ref='noChart' class="chart chart-no"></div>
				<p ref='noText' class="no-text"></p>
			</div>
			<div class="dataviz dataviz-jsp">
				<div ref='jspChart' class="chart chart-jsp"></div>
				<p ref='jspText' class="jsp-text"></p>
			</div>
		</section>
	</div>
</template>

<script>
	// import { getFirestore, doc, getDoc} from "firebase/firestore";
	// import { app } from '../js/firebase-config.js';

	// constants
	// const db = getFirestore(app);
	// const docRef = doc(db, "murder", "nbz24O9VmlyMaxGnRQuc");

	export default {
		
	}
</script>

<style scoped>
body {
	font-family: Arial, Helvetica, sans-serif;
}

h1 {
	text-align: center;
}

section {
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-direction: column;
}

.dataviz {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
}

.chart {
	height: 100px;
	margin: 20px;
}

.chart-yes {
	background-color: green;
}

.chart-no {
	background-color: red;
}

.chart-jsp {
	background-color: orange;
}

p{
	text-align: center;
	font-weight: bold;
}
</style>