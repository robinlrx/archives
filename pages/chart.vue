<template>
	<div v-show="showDataviz">
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
						<p>L’affaire Omar Raddad commence avec le meurtre de Ghislaine Marshal en 1991, dans sa propre villa. “OMAR M’A TUER” est inscrit en lettres de sang sur 2 surfaces, ce qui mène à l’arrestation d’Omar Raddad.</p>
					</div>
					<Box>
						<div class='stats-container'>
							<h2 class="text-bold"><span>Omar</span> est-il <br> le meurtrier ?</h2>
							<div class="separator"></div>
							<p>Lorem ipsum dolor sit amet</p>

							<div class="dataviz">
								<div v-show="yesPourcentage != 0" class="chart chart-yes" :style="{ width: `${yesPourcentage}%` }">
									<p>{{yesPourcentage}}%</p>
								</div>
								<div v-show="noPourcentage != 0" class="chart chart-no" :style="{ width: `${noPourcentage}%` }">
									<p>{{noPourcentage}}%</p>
								</div>
								<div v-show="jspPourcentage != 0" class="chart chart-jsp" :style="{ width: `${jspPourcentage}%` }">
									<p>{{jspPourcentage}}%</p>
								</div>
							</div>

							<div class="bottom-content">
								<Box addclass="legend-container" width="50%" icon="i" title="Légendes" icon-background="black" icon-color="#FCFCF5">
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
								</Box>
								<!-- <div class="legend-container">
									<div class="onglet">
										<p>i</p>
										<p>Légendes</p>
									</div> -->

								<div class="big-data">
									<span v-if="data1 === 'yes'" >
										<p class="number">{{yesPourcentage}}%</p>
										<p>des utilisateurs pensent comme vous, qu'Omar Raddad à bel et bien tué Ghislaine Marshal.</p>
									</span>
									<span v-else-if="data1 === 'no'" >
										<p class="number">{{noPourcentage}}%</p>
										<p>des utilisateurs pensent comme vous, qu'Omar Raddad n'a pas tué Ghislaine Marshal.</p>
									</span>
									<span v-else >
										<p class="number">{{jspPourcentage}}%</p>
										<p>des utilisateurs pensent comme vous, ils ne savent pas. </p>
									</span>
									
								</div>
							</div>

						</div>
					</Box>
				</div>

			</div>
		</section>
	</div>
</template>

<script>
import {gsap, Power1} from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger'; // https://greensock.com/forums/topic/29801-getting-error-cannot-use-import-statement-outside-a-module-when-importing-flip/
import Box from '../components/dataviz/Box.vue';
gsap.registerPlugin(ScrollTrigger);

export default {
	components: {
		Box
	},
	data() {
		return {
			yesPourcentage: undefined,
			noPourcentage: undefined,
			jspPourcentage: undefined,
			showDataviz: false,
			counter: 0,
			// data1: localStorage.getItem("data1")
		}
	},
	mounted() {
		this.fetchDocument()
		// this.showElements()
	},
	methods: {
		// see https://github.com/nuxt-community/firebase-module/issues/89
		async fetchDocument() {
			const ref = this.$fire.firestore
				.collection('dataviz')
				.doc('meurtrier')
			try {
				await ref.onSnapshot((doc) => { // old: ref.get().then((doc) - onSnapshot: auto reload fetched values
					const yesValue = doc.data().yes
					const noValue = doc.data().no
					const jspValue = doc.data().jsp

					this.yesPourcentage = ((yesValue / (noValue + yesValue + jspValue)) * 100).toFixed()
					this.noPourcentage = ((noValue / (noValue + yesValue + jspValue)) * 100).toFixed()
					this.jspPourcentage = ((jspValue / (noValue + yesValue + jspValue)) * 100).toFixed()

					this.counter = this.counter + 1
					console.log('this.counter:', this.counter)
					if (this.counter === 1) { // execute showElements once
						this.showElements()
					}
				})
			} catch (e) {
				console.error(e)
			}
		},
		showElements() {
			const showTL = gsap.timeline()
			this.showDataviz = true
			showTL.fromTo('header', { opacity: 0 }, { opacity: 1, duration: 1, delay: 1 })
			showTL.fromTo('section', { opacity: 0, y: 400}, { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: Power1.easeIn} )
			// showTL.to('.logo-big', { rotate: 720, scale: 2, duration: 0.5} )
			// showTL.fromTo('.case', { opacity: 0, }, { opacity: 1, duration: 1} )
			// showTL.fromTo('.stats', { opacity: 0, }, { opacity: 1, duration: 1} )
			// showTL.fromTo('.dataviz', { width: 0, opacity: 0 }, { width: 'auto', opacity: 1, duration: 1, ease: Power1.easeIn} )

			// if showElements() is in fetchDocument()
			showTL.fromTo('.dataviz .chart-yes', { width: 0, opacity: 0 }, { width: `${this.yesPourcentage}%`, opacity: 1, duration: 0.5, ease: Power1.easeInOut} )
			showTL.fromTo('.dataviz .chart-no', { width: 0, opacity: 0 }, { width: `${this.noPourcentage}%`, opacity: 1, duration: 0.5, ease: Power1.easeInOut} )
			showTL.fromTo('.dataviz .chart-jsp', { width: 0, opacity: 0 }, { width: `${this.jspPourcentage}%`, opacity: 1, duration: 0.5, ease: Power1.easeInOut} )

			return showTL
		}
	},
}
</script>

<style>
	@import '../css/general.css';
</style>

<style scoped>

header {
	height: 70px;
	border-bottom: solid 1px var(--black);
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
	margin-bottom: 10%;
}

.content {
	display: flex;
	justify-content: space-around;
	align-items: flex-start;
	/* border: solid yellow; */
	width: 100%;
	height: 600px;
}

.case, .stats {
	height: 100%;
}


.case {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 20%;
	border-bottom: solid 2.5px var(--black);
}

.case img {
	width: 100%;
	/* height: 80px; */
}

.date {
	font-size: 6rem;
	margin: 0;
	justify-self: baseline;
}

.separator {
	width: 100%;
	height: 2px;
	background-color: var(--black);
	margin: 10px 0;
}

.stats-container {
	padding: 50px;
}

.stats-container h2 {
	font-size: 4rem;
}

.stats-container h2 span {
	font-size: 7rem;
}

.dataviz {
	display: flex;
	margin-top: 10px;
	margin-bottom: 20px;
}

.chart {
	height: 50px;
	border: solid var(--black);
	position: relative;
	transition: width 0.2s ease-out;
}

.chart p {
	position: absolute;
	bottom: 0;
	right: 0;
	font-family: 'Akira';
	padding: 3px;
	font-size: 1.125rem;
	letter-spacing: 1px;
}

.chart-yes {
	background-color: transparent;
}

.chart-yes p {
	color: var(--black);
}

.chart-no {
	background-color: var(--black);
	border-left: none;
	border-right: none;
}

.chart-no p {
	color: var(--cream);
}

.chart-jsp {
	background-image: repeating-linear-gradient( -45deg, transparent, transparent 7px, var(--black) 8px, var(--black) 10px );
}

.chart-jsp p {
	color: var(--black);
	background-color: var(--cream);
	padding: 3px;
	border-top: solid var(--black);
	border-left: solid var(--black);
}

.bottom-content {
	display: flex;
	flex-direction: row;
}

.legend-container {
	display: flex;
	justify-content: space-between;
	flex-direction: column;
}

.legend-item {
	display: flex;
	justify-content: start;
	align-items: center;
	margin: 5px 10px;
}

.picto {
	border: solid var(--black);
	width: 50px;
	height: 20px;
	margin-right: 20px;
}

.big-data {
	width: 50%;
	height: 150px;
	margin-left: 30px;
	/* border: solid blue; */
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.big-data .number {
	font-family: 'Akira';
	font-size: 6rem;
}

</style>