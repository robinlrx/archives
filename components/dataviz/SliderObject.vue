<template>
	<div id="slider1" class="splide reveal-1">
		<div class="splide__arrows arrow-container">
			<button class="splide__arrow splide__arrow--prev slide-arrows">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40" focusable="false"><path d="m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z"></path></svg>
			</button>
			<button class="splide__arrow splide__arrow--next slide-arrows">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40" focusable="false"><path d="m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z"></path></svg>
			</button>
		</div>
		<div class="splide__track">
				<div class="splide__list">
					<div class="splide__slide">
						<img src="~/assets/images/france.png" alt="" class="object">
						<p class="fact">Guislaine Marchal partageait son temps entre sa résidence principale, en Suisse, et <span>sa villa La Chamade, qu'elle avait fait construire dans le sud de la France, sur les hauteurs de Mougins.</span> Une villa bien entretenue par des emploiyés de maison dont fait partie Omar Raddad, le jardinier.</p>
					</div>
					<div class="splide__slide">
						<img src="~/assets/images/phone.png" alt="" class="object">
						<p class="fact">Le dimanche 23 juin 1991 vers 11 h 48, Ghislaine Marchal, sortant juste de la douche, est au téléphone avec son amie Erika S. Son amie vient déjeuner le lendemain lundi. Ghislaine Marchal se dit pressée car elle doit se préparer pour aller déjeuner chez ses amis, M et Mme K. à 13 h. C’est la dernière fois que l’un de ses proches entendra sa voix.</p>
					</div>
					<div class="splide__slide">
						<img src="~/assets/images/billets.png" alt="" class="object">
						<p class="fact">Le lundi 24 juin, Erika S. arrive vers 11 h 30 comme convenu. Elle sonne, insiste, en vain. Alertée par Mmes Erika S. et Colette K., une troisième amie, Francine P., fait dépêcher sur place un employé de la compagnie de gardiennage en début d’après-midi. <span>La maison, sombre et silencieuse, on retrouve des bijoux, un sac à main ouvert mais nulle trace de la propriétaire.</span></p>
					</div>
					<div class="splide__slide">
						<img src="~/assets/images/sang.png" alt="" class="object">
						<p class="fact">Dans la chaufferie, au fond de la cave, Ghislaine Marchal est allongée de tout son long, face contre terre, vêtue de son seul peignoir de bain ensanglanté. <span>Sur le côté gauche du couloir, « OMAR M'A TUER » est inscrit en lettres de sang bien formées</span>, à 1 m du sol, sur une porte blanche fermée à clé menant à une cave à vin.</p>
					</div>
				</div>
		</div>
	</div>
</template>

<script>
// eslint-disable-next-line import/no-named-as-default
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
export default {
	name: 'SliderObject',
	mounted() {
		const splide = new Splide( '#slider1', {
			classes: {
				page: 'splide__pagination__page page-dot',
				pagination: 'splide__pagination splide__pagination--on-left',
			},
			type: 'loop',
			direction: 'ttb', // slider direction
			paginationDirection: 'ttb', // dot placement
			height: '550px',
			focus: 'center',
			autoHeight: true,
		});

		splide.mount();
	}
}
</script>

<style>
	@import '../../css/general.css';
</style>

<style scoped>

.splide {
	/* background-color: red; */
	/* width: 80%; */
	width: 1000px;
	margin: auto;
	/* border: solid red; */
	margin-bottom: 100px;
}

.splide__slide {
	height: 100%;
	/* border: solid aqua; */
	display: flex;
	justify-content: space-around;
	align-items: center;
	overflow: hidden;
}

.object {
	width: 400px;
	height: 80%;
}

.fact {
	font-family: 'Georgia-bold';
	display: block;
	text-align: center;
	position: relative;
	line-height: 1.5em;
	font-size: 1.0625rem;
}
.fact span {
	text-decoration: underline 3px var(--orange-lime);
	text-decoration-skip-ink: none;
}

figcaption p {
	margin: 0
}

.nom {
	font-family: 'Strong-concrete';
	font-size: 2rem;
}

.profession {
	font-family: 'Georgia-bold';
	padding-bottom: 10px;
	border-bottom: solid var(--black);
	width: 300px;
	margin: 5px 0;
	font-size: 1.125rem;
}

.contexte {
	font-family: 'Georgia-bold';
	font-size: 0.8rem;
	padding-top: 5px;
}

.arrow-container {
	position: absolute;
	left: 0.7%;
	/* margin-left: auto; */
	/* border: solid red; */
	height: 45%;
	top: 27%;
}
</style>