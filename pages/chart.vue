<template>
	<div v-show="showDataviz" class="body-light">
		<!-- <img src="/images/fond-dataviz.png" alt="" class="fond"> -->
		<header class="reveal-1">
			<img src="/images/logo.svg" alt="">
		</header>
		<section>
			<div class="container">
				<div class="separator reveal-1"></div>
				<img src="/images/logo.svg" alt="" class="logo-big reveal-1">
				<div class="separator reveal-1"></div>
				<div class="content">
					<!-- left side -->
					<div class="case">
						<p class='text-bold date reveal-1'>19<br>91</p>
						<!-- <div class="separator"></div> -->
						<img src="/images/omar.png" alt="" class="omar reveal-1">
						<!-- <div class="separator"></div> -->
						<p class="resume reveal-1">L’affaire Omar Raddad commence avec le meurtre de Ghislaine Marshal en 1991, dans sa propre villa. “OMAR M’A TUER” est inscrit en lettres de sang sur 2 surfaces, ce qui mène à l’arrestation d’Omar Raddad.</p>
					</div>
					<!-- right side -->
					<Box addclass="reveal-1 stats">

						<div class='stats-container'>
							<h2 class="text-bold reveal-1"><span>Omar</span> est-il <br> le meurtrier ?</h2>
							<div class="separator separator-2 reveal-1"></div>
							<p class="reveal-1">Lorem ipsum dolor sit amet</p>

							<div class="dataviz-first reveal-1">
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

								<Box addclass="legend-container reveal-1" width="50%" icon="i" title="Légendes" icon-background="black" icon-color="#FCFCF5">
									<LegendItem pictocolor="transparent" name="Oui" />
									<LegendItem pictocolor="black" name="Non" />
									<LegendItem pictocolor="repeating-linear-gradient( -45deg, transparent, transparent 7px, var(--black) 8px, var(--black) 10px )" name="Indécis" />
								</Box>

								<div class="big-data">
									<span v-if="data1 === 'yes'" class="reveal-1">
										<p class="number">{{yesPourcentage}}%</p>
										<p>des utilisateurs pensent comme vous, qu'Omar Raddad à bel et bien tué Ghislaine Marshal.</p>
									</span>
									<span v-else-if="data1 === 'no'" class="reveal-1">
										<p class="number">{{noPourcentage}}%</p>
										<p>des utilisateurs pensent comme vous, qu'Omar Raddad n'a pas tué Ghislaine Marshal.</p>
									</span>
									<span v-else class="reveal-1">
										<p class="number">{{jspPourcentage}}%</p>
										<p>des utilisateurs pensent comme vous, ils ne savent pas. </p>
									</span>
									
								</div>
							</div>

						</div>

					</Box>

				</div>

				<!-- conclusion 1 -->
				<div class="dataviz-first-conclusion">
					<div class="no-box reveal-1">
						<p>NON</p>
						<p>De nombreux indices semblent innocenter Omar, ou incriminer d’autres individus. Par exemple des récentes analyses ADN</p>
					</div>
					<div class="yes-box reveal-1">
						<p>OUI</p>
						<p>Juger coupable 1994 / L’ecriture en sang / Partiellement gracié mais pas innocenté</p>
					</div>
				</div>

			</div>
		</section>
		<SliderObject />
		<section class="section-pie">
			<!-- chart box -->
			<Box addclass="reveal-1" title="Votre couverture de terrain !" width="900px" >
				<div class="pie-wrapper">
					<h2 class="text-bold reveal-1"><span>Combien</span> de médias<br>avez-vous consulté ?</h2>
					<div class="pie-content">
						<canvas id="myChart" class="pie"></canvas>
						<div class="big-data">
							<p class="number">{{jspPourcentage}}%</p>
							<p>des utilisateurs pensent comme vous, ils ne savent pas. </p>
						</div>
					</div>
				</div>
			</Box>
			<!-- legend box -->
			<Box addclass="legend-container legend-container--pie reveal-1" width="500px" icon="i" title="Légendes" icon-background="black" icon-color="#FCFCF5">
				<LegendItem pictocolor="transparent" name="Journal Télévisé" />
				<LegendItem pictocolor="var(--black)" name="Photo" />
				<LegendItem pictocolor="repeating-linear-gradient( -45deg, transparent, transparent 7px, var(--black) 8px, var(--black) 10px );" name="Presse Web" />
				<LegendItem pictocolor="var(--green)" name="Documentaire" />
				<LegendItem pictocolor="#B0B0AC" name="Film" />
				<LegendItem pictocolor="#554726" name="Radio" />
				<LegendItem pictocolor="#A8A185" name="Réseau social" />
				<LegendItem pictocolor="#B8D4BE" name="Interview" />
				<LegendItem pictocolor="url('images/pie-cross.png')" name="Presse papier" />
			</Box>
		</section>
		<Frise />
		<Media />
		<SliderPerson />
	</div>
</template>

<script>
// import {gsap} from 'gsap'; // Power1
// import ScrollTrigger from 'gsap/dist/ScrollTrigger'; // https://greensock.com/forums/topic/29801-getting-error-cannot-use-import-statement-outside-a-module-when-importing-flip/
import Chart from 'chart.js/auto';
import * as pattern from 'patternomaly';
import Box from '../components/dataviz/Box.vue';
import Frise from '../components/dataviz/Frise.vue';
import SliderPerson from '../components/dataviz/SliderPerson.vue';
import SliderObject from '../components/dataviz/SliderObject.vue';
import LegendItem from '../components/dataviz/LegendItem.vue';
import Media from '../components/dataviz/Media.vue';
// gsap.registerPlugin(ScrollTrigger);

export default {
	components: {
		Box,
		Frise,
		// eslint-disable-next-line vue/no-unused-components
		SliderPerson,
		SliderObject,
		LegendItem,
		Media
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
		this.pieChart()
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
			// const showTL = gsap.timeline()
			this.showDataviz = true
			// showTL.fromTo('header', { opacity: 0 }, { opacity: 1, duration: 1, delay: 1 })
			// showTL.fromTo('section', { opacity: 0, y: 400}, { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: Power1.easeIn} )
			// showTL.to('.logo-big', { rotate: 720, scale: 2, duration: 0.5} )
			// showTL.fromTo('.case', { opacity: 0, }, { opacity: 1, duration: 1} )
			// showTL.fromTo('.stats', { opacity: 0, }, { opacity: 1, duration: 1} )
			// showTL.fromTo('.dataviz', { width: 0, opacity: 0 }, { width: 'auto', opacity: 1, duration: 1, ease: Power1.easeIn} )

			// if showElements() is in fetchDocument()
			// showTL.fromTo('.dataviz .chart-yes', { width: 0, opacity: 0 }, { width: `${this.yesPourcentage}%`, opacity: 1, duration: 0.5, ease: Power1.easeInOut} )
			// showTL.fromTo('.dataviz .chart-no', { width: 0, opacity: 0 }, { width: `${this.noPourcentage}%`, opacity: 1, duration: 0.5, ease: Power1.easeInOut} )
			// showTL.fromTo('.dataviz .chart-jsp', { width: 0, opacity: 0 }, { width: `${this.jspPourcentage}%`, opacity: 1, duration: 0.5, ease: Power1.easeInOut} )

			// return showTL

			const ratio = 0.1; // 10%
			const options = {
				root: null,
				rootMargin: "0px",
				threshold: .1
			};
			const callback = function (entries, observe) {
				entries.forEach(function (entrie) {
					// eslint-disable-next-line no-unused-expressions
					entrie.intersectionRatio > ratio && (entrie.target.classList.add("reveal-visible"), observe.unobserve(entrie.target))
				})
			};
			const observer = new IntersectionObserver(callback, options);
			
			const items = document.querySelectorAll('[class*="reveal-"]')
			items.forEach(function (item) {
				observer.observe(item)
			});
		},
		pieChart() {
			// shadow
			// const shadowPlugin = {
			// 	beforeDraw: (chart, args, options) => {
			// 		const { ctx } = chart;
			// 		ctx.shadowColor = '#E3E3DD';
			// 		// ctx.shadowBlur = 10;
			// 		ctx.shadowOffsetX = 10;
			// 		ctx.shadowOffsetY = 5;
			// 	},
			// };

			// pie chart
			const ctx = document.getElementById('myChart').getContext('2d');
			// eslint-disable-next-line no-unused-vars
			const pieChart = new Chart(ctx, {
				type: 'pie',
				data: {
					labels: ['Journal Télévisé', 'Photo', 'Presse web', 'Documentaire', 'Film', 'Radio', 'RS', 'Interview', 'Presse papier'],
					datasets: [{
						label: '# of Votes',
						data: [12, 19, 30, 5, 2, 3, 10, 5, 8],
						backgroundColor: [
							'#FCFCF5',
							'#000000',
							pattern.draw('diagonal', '#FCFCF5', '#000000'), // (symbol, bgc)
							'#649F8D',
							'#B0B0AC',
							'#554726',
							'#A8A185',
							'#B8D4BE',
							pattern.draw('cross', '#FCFCF5', '#000000')
						],
						borderColor: ['#000000'],
						borderWidth: 2
					}]
				},
				options: {
					responsive: false,
					plugins: {
						legend: {
							display: false,
						}
					},
					scales: {
						y: {
							grid: {
								display: false,
								drawBorder: false,
							},
							ticks: {
								display: false
							}
						},
						x: {
							grid: {
								display: false,
								drawBorder: false,
							},
							ticks: {
								display: false
							}
						}
					},
				},
				// plugins: [shadowPlugin]
			});
		}
	},
}
</script>

<style>
	@import '../css/general.css';
</style>

<style scoped>

.body-light {
	background-color: var(--cream);
	background-image: url('../static/images/fond-dataviz.png');
	background-size: 240% 100%; /* cover */
	background-position: center;
}

.fond {
	position: absolute;
	z-index: 2;
	object-fit: cover;
}

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
	/* padding: 5%; */
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
	margin-bottom: 3%;
	margin-top: 3%;
}

.content {
	display: flex;
	justify-content: center;
	align-items: center;
	/* border: solid yellow; */
	width: 100%;
	height: 600px;
	margin-top: 50px;
}

.case, .stats {
	height: 100%;
}

.stats {
	margin-left: 50px;
}


.case {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	/* width: 20%; */
	width: 300px;
	border-bottom: solid 2.5px var(--black);
}

.case .omar {
	width: 100%;
	height: 40%;
	padding: 15px 0;
	border-bottom: solid 2.5px var(--black);
	border-top: solid 2.5px var(--black);
}

.case .resume {
	padding: 15px 0;
	text-align: justify;
	font-family: 'Georgia-regular';
	/* background-color: red; */
}

.date {
	font-size: 6rem;
	margin: 0;
	justify-self: baseline;
}

/* data 1 */
.stats-container {
	padding: 50px;
	justify-content: space-around;
}

.stats-container h2 {
	font-size: 4rem;
}

.stats-container .text-bold span {
	font-size: 7rem;
}

.dataviz-first {
	display: flex;
	margin-top: 10px;
	margin-bottom: 20px;
	box-shadow: 10px 8px 0px var(--grey);
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

.big-data {
	width: 50%;
	height: 150px;
	margin-left: 30px;
	/* border: solid blue; */
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-family: 'Georgia-regular';
}

.big-data .number {
	font-family: 'Akira';
	font-size: 6rem;
}

section:first-of-type {
	padding-bottom:  10vh;
}

.dataviz-first-conclusion {
	width: 100%;
	/* border: solid red; */
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 40px;
	font-family: 'Georgia-bold';
}

.no-box, .yes-box {
	box-shadow: 10px 8px 0px var(--black);
}

.no-box {
	/* width: 70%; */
	width: 800px;
	height: 130px;
	color: var(--cream);
	background-color: var(--black);
	padding: 20px ;
	border-bottom: solid 3px var(--cream);
	border-right: solid 3px var(--cream);
} 

.no-box p:first-of-type, .yes-box p:first-of-type {
	font-family: 'Strong-concrete';
	font-size: 3rem;
	width: 100%;
	border-bottom: solid var(--cream);
	margin-bottom: 20px;
	padding-bottom: 10px;
}

.yes-box {
	/* width: 70%; */
	width: 400px;
	height: 130px;
	/* color: var(--cream); */
	/* background-color: var(--black); */
	padding: 20px ;
	border: solid var(--black);
	margin-left: 30px;
}

.yes-box p:first-of-type {
	border-bottom: solid var(--black);
}

/* pie data 2 */

.section-pie {
	flex-direction: row;
	position: relative;
	margin: 0 auto;
	margin-bottom: 10%;
	width: 80%;
	border: solid red;
}

.pie-wrapper {
	padding: 50px;
}

.pie-wrapper h2 {
	font-size: 3rem;
}

.pie-wrapper h2 span {
	font-size: 4rem;
}

.pie {
	width: 450px !important;
	height: 450px !important;
	position: relative;
	top: 13vh;
	right: 50px;
}

.pie-content {
	display: flex;
	justify-content: center;
	align-items: center;
}

.pie-content .big-data {
	padding-right: 20%;
}

.legend-container--pie {
	position: relative;
	z-index: 2;
	right: 5%;
	background-color: var(--cream);
}
</style> 