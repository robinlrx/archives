<template>
	<section class="media-section">
		<Box title="Et l’opinion publique dans tout ça :" width="850px" addclass="media-info reveal-1">

			<div class='media-container'>
				<h2 class="text-bold">Avez-vous consulté des<br> <span>médias de confiance ?</span></h2>
				<div class="separator separator-2"></div>
				<p>L’Union européenne de radio-télévision, alliance de médias de service public, a étudié la confiance dans les médias dans son rapport Trust in Media 201817. Elle y constate qu’il devient de plus <span> en plus difficile de maintenir un haut niveau de confiance, du fait notamment de l’essor de la désinformation.</span></p>
				<div class="link">
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="20" height="20" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
					<a href="https://rm.coe.int/prems-077520-fra-2018-nex-media-new-regulation-txt-a4-web/16809efcca" target="_blank">En lire plus sur le sujet</a>
				</div>
			</div>

		</Box>

		<Box width="500px" icon-background="var(--black)" icon-color="var(--cream)" icon="i" title="Légende" addclass="media-legend reveal-1">
			<div class="picto-wrapper">
				<div class="picto-group">
					<LegendItem :pictolegend="`url(${require('~/assets/images/picto-pp.svg')}), var(--black)`" boldname="Presse <br>Papier" name="Journal/Photo <br>d’archive" pictoheight="60px" pictowidth="60px" />
					<LegendItem :pictolegend="`url(${require('~/assets/images/picto-rs.svg')}), var(--black)`" boldname="Réseau <br>Social" pictoheight="60px" pictowidth="60px" />
					<LegendItem :pictolegend="`url(${require('~/assets/images/picto-pw.svg')}), var(--black)`" boldname="Presse <br>Web" pictoheight="60px" pictowidth="60px" />
				</div>
				<div class="picto-group">
					<LegendItem :pictolegend="`url(${require('~/assets/images/picto-tv.svg')}), var(--black)`" boldname="TV" name="Journal Télévisé/<br>Interview/film/<br>Documentaire" pictoheight="60px" pictowidth="60px" />
					<LegendItem :pictolegend="`url(${require('~/assets/images/picto-radio.svg')}), var(--black)`" boldname="Radio" pictoheight="60px" pictowidth="60px" />
					<LegendItem pictolegend="var(--green)" boldname="Taux de <br>confiance" pictoheight="60px" pictowidth="60px" />
				</div>
			</div>
		</Box>

		<Box width="700px" icon-background="var(--black)" icon-color="var(--cream)" icon="☰" title="Voila à quoi vous avez fait confiance :" addclass="media-dataviz reveal-1">
			<div class="chart-wrapper">

				<div class="chart-meida-wrapper">
					<LegendItem :pictolegend="`url(${require('~/assets/images/picto-pp.svg')}), var(--black)`" pictoheight="40px" pictowidth="40px" class="legend-override" marginright="0"/>
					<div class="chart-meida-wrapper--item">
						<div class="chart-pp--user" :style="{width: dataPP > 100 ? '100%' : `${dataPP}%`}"></div>
						<div class="chart-trust chart-trust--pp">
							<div class="trust-explication">
								<p>51 <span>%</span></p>
								<p v-if="dataPP > 100">La population fait confiance à 51% des médias des réseaux sociaux. Votre consommation est elle de 100 %. </p>
								<p v-else>La population fait confiance à 51% des médias des réseaux sociaux. Votre consommation est elle de {{dataPP}} %. </p>
							</div>
						</div>
					</div>
				</div>

				<div class="chart-meida-wrapper">
					<LegendItem :pictolegend="`url(${require('~/assets/images/picto-rs.svg')}), var(--black)`" pictoheight="40px" pictowidth="40px" class="legend-override" marginright="0"/>
					<div class="chart-meida-wrapper--item">
						<div class="chart-rs--user" :style="{width: dataRS > 100 ? '100%' : `${dataRS}%`}"></div>
						<div class="chart-trust chart-trust--rs">
							<div class="trust-explication">
								<p>19 <span>%</span></p>
								<p v-if="dataRS > 100">La population fait confiance à 19% des médias télévisuel. Votre consommation est elle de 100 %. </p>
								<p v-else>La population fait confiance à 19% des médias télévisuel. Votre consommation est elle de {{dataRS}} %. </p>
							</div>
						</div>
					</div>
				</div>

				<div class="chart-meida-wrapper">
					<LegendItem :pictolegend="`url(${require('~/assets/images/picto-pw.svg')}), var(--black)`" pictoheight="40px" pictowidth="40px" class="legend-override" marginright="0"/>
					<div class="chart-meida-wrapper--item">
						<div class="chart-pw--user" :style="{width: dataPW > 100 ? '100%' : `${dataPW}%`}"></div>
						<div class="chart-trust chart-trust--pw">
							<div class="trust-explication">
								<p>35 <span>%</span></p>
								<p v-if="dataPW > 100">La population fait confiance à 35% des médias télévisuel. Votre consommation est elle de 100 %. </p>
								<p v-else>La population fait confiance à 35% des médias télévisuel. Votre consommation est elle de {{dataPW}} %. </p>
							</div>
						</div>
					</div>
				</div>

				<div class="chart-meida-wrapper">
					<LegendItem :pictolegend="`url(${require('~/assets/images/picto-radio.svg')}), var(--black)`" pictoheight="40px" pictowidth="40px" class="legend-override" marginright="0"/>
					<div class="chart-meida-wrapper--item">
						<div class="chart-radio--user" :style="{width: dataRadio > 100 ? '100%' : `${dataRadio}%`}"></div>
						<div class="chart-trust chart-trust--radio">
							<div class="trust-explication">
								<p>58 <span>%</span></p>
								<p v-if="dataRadio > 100">La population fait confiance à 58% des médias radiophonique. <br> Votre consommation est elle de 100 %. </p>
								<p v-else>La population fait confiance à 58% des médias radiophonique. <br> Votre consommation est elle de {{dataRadio}} %. </p>
							</div>
						</div>
					</div>
				</div>

				<div class="chart-meida-wrapper">
					<LegendItem :pictolegend="`url(${require('~/assets/images/picto-tv.svg')}), var(--black)`" pictoheight="40px" pictowidth="40px" class="legend-override" marginright="0"/>
					<div class="chart-meida-wrapper--item">
						<div class="chart-tv--user" :style="{width: dataTV > 100 ? '100%' : `${dataTV}%`}"></div>
						<div class="chart-trust chart-trust--tv">
							<div class="trust-explication">
								<p>51 <span>%</span></p>
								<p v-if="dataTV > 100">La population fait confiance à 51% des médias télévisuel. Votre consommation est elle de 100 %. </p>
								<p v-else>La population fait confiance à 51% des médias télévisuel. Votre consommation est elle de {{dataTV}} %. </p>
							</div>
						</div>
					</div>
				</div>

			</div>
		</Box>
	</section>
</template>

<script>
import Box from './Box.vue';
import LegendItem from './LegendItem.vue';
export default {
	name: 'Media',
	components: {
		Box,
		LegendItem
	},
	data() {
		return {
			dataTV: (100 / 6 * parseInt(localStorage.getItem('incremenntTV'))).toFixed(0), // 6 tv
			dataRS: (100 - localStorage.getItem('incremenntRS')).toFixed(0), // réseau social
			dataPW: (100 - localStorage.getItem('incremenntPW')).toFixed(0), // presse web
			dataRadio: (100 / 15 * parseInt(localStorage.getItem('incremenntRadio'))).toFixed(0), // 15 piste radio
			dataPP: (100 / 18 * localStorage.getItem('incremenntPP')).toFixed(0), // presse papier
		}
	},
	mounted() {
		const chartTrust = this.$el.getElementsByClassName('chart-trust')
		console.log(chartTrust);
		Array.from(chartTrust).forEach(element => {
			const trustExplication = element.querySelector('.trust-explication')

			element.addEventListener('mouseover', () => {
				// console.log(element)
				console.log(trustExplication)
				trustExplication.classList.add('active')
			})

			element.addEventListener('mouseleave', () => {
				trustExplication.classList.remove('active')
			})
		});
	}
}
</script>

<style scoped>
@import '../../css/general.css';

section {
	padding-bottom: 200px;
	/* border: solid blue; */
	position: relative;
	width: 80%;
	margin: 0 auto;
	height: 700px;
	background-image: url('~/assets/images/fond-media.png');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}

.media-info {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
}

.media-legend {
	position: absolute;
	top: 40%;
	left: 3%;
	z-index: 3;
	background-color: var(--cream);
}

.media-dataviz {
	position: absolute;
	top: 25%;
	left: 43%;
	z-index: 2;
	height: 450px;
	background-color: var(--cream);
}

.media-container {
	padding: 40px;
}

.media-container h2 {
	font-size: 2rem;
}

.media-container h2 span {
	font-size: 3rem;
}

.media-container p {
	font-family: 'Georgia-bold';
	width: 50%;
	text-align: justify;
}

.media-container p span {
	text-decoration: underline 3px var(--green-lime);
	text-decoration-skip-ink: none;
}

/* legende */
.picto-wrapper {
	display: flex;
	padding: 10px;
}

.picto-group {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	width: 50%;
	/* border: solid red; */
}

/* chart */

.chart-wrapper {
	padding: 30px;
	padding-right: 60px;
	/* display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column; */
	/* height: 100%; */
	/* border: solid red; */
}

.legend-override.legend-item {
	margin: 0;
}

.chart-meida-wrapper {
	width: 100%;
	height: 40px;
	border: solid var(--black);
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 10px 8px 0px var(--grey);
	margin-bottom: 30px;
}

.chart-trust {
	height: 100%;
	background-color: var(--green);
	border: solid var(--black);
	position: relative;
	margin-left: auto;
	bottom: 30px;
	right: -30px;
	box-shadow: 10px 8px 0px var(--grey);
	cursor: pointer;
}

.chart-meida-wrapper--item {
	width: 100%;
	height: 100%;
	background-color: var(--black);
}

.chart-pp--user {
	/* width: 20%; localhost nb media = nb percent */
	height: 100%;
	background-color: var(--cream);
}


.chart-trust--pp {
	width: 51%;
}

.chart-rs--user {
	/* width: 40%; localhost nb media = nb percent */
	height: 100%;
	background-color: var(--cream);
}

.chart-trust--rs {
	width: 19%;
}

.chart-pw--user {
	/* width: 60%; localhost nb media = nb percent */
	height: 100%;
	background-color: var(--cream);
}

.chart-trust--pw {
	width: 35%;
}

.chart-radio--user {
	/* width: 20%; localhost nb media = nb percent */
	height: 100%;
	background-color: var(--cream);
}

.chart-trust--radio {
	width: 58%;
}

.chart-tv--user {
	/* width: 30%; localhost nb media = nb percent */
	height: 100%;
	background-color: var(--cream);
}

.chart-trust--tv {
	width: 51%;
}

.trust-explication {
	width: 330px;
	height: 130px;
	background-color: var(--cream);
	box-shadow: 10px 8px 0px var(--black);
	padding: 15px 10px ;
	border: solid var(--black);
	position: absolute;
	bottom: 50%;
	opacity: 0;
	visibility: hidden;
	transition: all 0.2s ease-in-out;
}

.trust-explication.active {
	opacity: 1;
	visibility: visible
}

.trust-explication p:first-of-type {
	font-family: 'Strong-concrete';
	font-size: 2rem;
	border-bottom: solid var(--black);
	margin: 0;
}

.trust-explication p:last-of-type {
	font-family: 'Georgia-bold';
}

.chart-trust--pp .trust-explication, .chart-trust--radio .trust-explication, .chart-trust--tv .trust-explication {
	left: 5%;
}

.chart-trust--rs .trust-explication {
	right: 9%;
}

.chart-trust--pw .trust-explication {
	right: 2%;
}


</style>