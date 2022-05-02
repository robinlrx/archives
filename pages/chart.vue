<template>
	<div>
		<h1>Pensez-vous avoir été objectif ?</h1>
		<section>
			<h2>Data 1: Omar est-il le meurtrier ?</h2>
			<div class="dataviz dataviz-no">
				<div ref='yesChart' class="chart chart-yes" :style="{ width: `${yesPourcentage}%` }"></div>
				<p ref='yesText' class="yes-text">Comme {{ yesPourcentage }}% de la pop, <br> vous avez répondu OUI</p>
			</div>
			<div class="dataviz dataviz-yes">
				<div ref='noChart' class="chart chart-no" :style="{ width: `${noPourcentage}%` }"></div>
				<p ref='noText' class="no-text">Comme {{ noPourcentage }}% de la pop, <br> vous avez répondu NON</p>
			</div>
			<div class="dataviz dataviz-jsp">
				<div ref='jspChart' class="chart chart-jsp" :style="{ width: `${jspPourcentage}%` }"></div>
				<p ref='jspText' class="jsp-text">Comme {{ jspPourcentage }}% de la pop, <br> vous avez répondu NE SAIS PAS</p>
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
	data() {
		return {
			yesPourcentage: undefined,
			noPourcentage: undefined,
			jspPourcentage: undefined,
		}
	},
	mounted() {
		this.fetchDocument()
	},
	methods: {
		// see https://github.com/nuxt-community/firebase-module/issues/89
		async fetchDocument() {
			const ref = this.$fire.firestore
				.collection('dataviz')
				.doc('meurtrier')
			try {
				await ref.get().then((doc) => {
					const yesValue = doc.data().yes
					const noValue = doc.data().no
					const jspValue = doc.data().jsp

					this.yesPourcentage = ((yesValue / (noValue + yesValue + jspValue)) * 100).toFixed()
					this.noPourcentage = ((noValue / (noValue + yesValue + jspValue)) * 100).toFixed()
					this.jspPourcentage = ((jspValue / (noValue + yesValue + jspValue)) * 100).toFixed()
				})
			} catch (e) {
				console.error(e)
			}
		},
	},
}
</script>

<style scoped>
body {
	margin: 0 !important;
}

h1 {
	text-align: center;
	font-family: Arial, Helvetica, sans-serif;
}

section {
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-direction: column;
	font-family: Arial, Helvetica, sans-serif;
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

p {
	text-align: center;
	font-weight: bold;
}
</style>