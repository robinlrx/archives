<template>
	<div>
		<header>
			<img src="/images/logo.svg" alt="">
		</header>
		<section>
			<div class="container">
				<img src="/images/logo.svg" alt="" class="logo-big">
				<div class="content">
					<div class="case">
						<p class='text-bold date'>19<br>91</p>
						<div class="separator"></div>
						<img src="/images/omar.png" alt="">
						<div class="separator"></div>
						<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet</p>
					</div>
					<div class="stats">
						<div class="onglet">
							<p>?</p>
							<p>Alors monsieur l'enquêteur ?</p>
						</div>
						<div class='stats-container'>
							<h2 class="text-bold"><span>Omar</span> est-il <br> le meurtrier ?</h2>
							<div class="separator"></div>
							<p>Lorem ipsum dolor sit amet</p>

							<div class="dataviz">
								<div class="chart chart-yes" :style="{ width: `${yesPourcentage}%` }">
									<p>{{yesPourcentage}}%</p>
								</div>
								<div class="chart chart-no" :style="{ width: `${noPourcentage}%` }">
									<p>{{noPourcentage}}%</p>
								</div>
								<div class="chart chart-jsp" :style="{ width: `${jspPourcentage}%` }">
									<p>{{jspPourcentage}}%</p>
								</div>
							</div>

							<div class="bottom-content">

								<div class="legend-container">
									<div class="onglet">
										<p>i</p>
										<p>Légendes</p>
									</div>

									<div class="legend-item">
										<div class="picto chart-yes"></div>
										<p>Oui</p>
									</div>
									<div class="legend-item">
										<div class="picto chart-no"></div>
										<p>Non</p>
									</div>
									<div class="legend-item">
										<div class="picto chart-jsp"></div>
										<p>Je ne sais pas</p>
									</div>
								</div>
								<div class="big-data">

								</div>
							</div>

						</div>
					</div>
				</div>
				<!-- <div class="dataviz dataviz-jsp">
					<div ref='jspChart' class="chart chart-jsp" :style="{ width: `${jspPourcentage}%` }"></div>
					<p ref='jspText' class="jsp-text">Comme {{ jspPourcentage }}% de la pop, <br> vous avez répondu NE SAIS PAS</p>
				</div> -->
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

<style>

@font-face {
	font-family: 'Strong-concrete';
	src: url('../static/fonts/StrongConcrete-Bold.woff2') format('woff2'),
		url('../static/fonts/StrongConcrete-Bold.woff') format('woff');
	font-weight: bold;
	font-style: normal;

}
@font-face {
	font-family: 'Georgia-regular';
	src: url('../static/fonts/Georgia.woff2') format('woff2'),
		url('../static/fonts/Georgia.woff') format('woff');
	font-weight: normal;
	font-style: normal;

}
@font-face {
	font-family: 'Georgia-bold';
	src: url('../static/fonts/Georgia-Bold.woff2') format('woff2'),
		url('../static/fonts/Georgia-Bold.woff') format('woff');
	font-weight: bold;
	font-style: normal;

}

@font-face {
	font-family: 'Akira';
	src: url('../static/fonts/akira_expanded.woff2') format('woff2'),
		url('../static/fonts/akira_expanded.woff') format('woff');
	font-weight: bold;
	font-style: normal;

}

body {
	margin: 0;
	background-color: #FCFCF5;
}

header {
	height: 70px;
	border-bottom: solid 1px black;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 80px;
}

p {
	margin: 0;
}

.text-bold {
	font-family: 'Strong-concrete';
	text-transform: uppercase;
	margin: 0;
}

header img {
	width: 200px;
	margin-left: 20px;
}

section {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.container {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	/* border: solid blue; */
	width: 80%;
}

.logo-big {
	width: 50%;
	margin-bottom: 20px;
}

.content {
	display: flex;
	justify-content: space-around;
	align-items: flex-start;
	/* border: solid yellow; */
	width: 100%;
}


.case {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 20%;
	border-bottom: solid 2.5px black;
}

.case img {
	width: 100%;
	/* height: 80px; */
}

.date {
	font-size: 6rem;
	margin: 0;
}

.separator {
	width: 100%;
	height: 2px;
	background-color: black;
	margin: 20px 0;
}

.stats {
	width: 70%;
	border: solid black;
	/* padding: 30px; */
}

.stats .onglet {
	display: flex;
	/* justify-content: center; */
	align-items: center;
	border-bottom: solid black;
	font-family: 'Georgia-bold';
	height: 25px;
}

.stats .onglet p:first-of-type {
	background-color: #649F8E;
	width: 25px;
	height: 100%;
	text-align: center;
	border-right: solid black;
}

.stats .onglet p:last-of-type {
	margin-left: 30px;
	/* margin-top: 5px;
	margin-bottom: 5px; */
}
.stats-container {
	padding: 50px;
}

.stats-container h2 {
	font-size: 4rem;
}

.stats-container h2 span {
	font-size: 6rem;
}

.dataviz {
	display: flex;
	margin-top: 10px;
	margin-bottom: 20px;
}

.chart {
	height: 50px;
	border: solid black;
	position: relative;
}

.chart p {
	position: absolute;
	bottom: 0;
	right: 0;
	font-family: 'Akira';
	padding: 3px;
}

.chart-yes {
	background-color: transparent;
}

.chart-yes p {
	color: black;
}

.chart-no {
	background-color: black;
	border-left: none;
	border-right: none;
}

.chart-no p {
	color: #FCFCF5;
}

.chart-jsp {
	background-image: repeating-linear-gradient( -45deg, transparent, transparent 7px, black 8px, black 10px );
}

.chart-jsp p {
	color: black;
	background-color: #FCFCF5;
	padding: 3px;
	border-top: solid black;
	border-left: solid black;
}

.bottom-content {
	display: flex;
	flex-direction: row;
}

.legend-container {
	border: solid black;
	height: 150px;
	width: 50%;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
}

.legend-container .onglet {
	display: flex;
	/* justify-content: center; */
	align-items: center;
	border-bottom: solid black;
	font-family: 'Georgia-bold';
	height: 25px;
}

.legend-container .onglet p:first-of-type {
	background-color: #000000;
	width: 25px;
	height: 100%;
	text-align: center;
	border-right: solid black;
	color: #FCFCF5;
}

.legend-container .onglet p:last-of-type {
	margin-left: 30px;
	/* margin-top: 5px;
	margin-bottom: 5px; */
}

.legend-item {
	display: flex;
	justify-content: start;
	align-items: center;
	margin: 5px 10px;
}

.picto {
	border: solid black;
	width: 50px;
	height: 20px;
	margin-right: 20px;
}

.big-data {
	width: 50%;
	border: solid blue;
}



/* .dataviz {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
} */
</style>