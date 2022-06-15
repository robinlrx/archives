<template>
	<div id="slider2" class="splide reveal-1">
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
						<img src="~/assets/images/jacques.png" alt="" class="personnage">
						<figure class="bio">
							<blockquote>
								<p class="citation">Quelqu'un dont j'ai prouvé l'innocence vient d'être condamné à une peine qu'il ne mérite pas. C'est le 100e anniversaire de l'affaire Dreyfus. Il y a 100 ans, on condamnait un jeune officier qui avait le tort d'être juif, <span>aujourd'hui on condamne un jardinier qui a le tort d'être maghrébin</span></p>
							</blockquote>
							<figcaption>
								<p class="nom">Jacques Vergès</p>
								<p class="profession">L'avocat de la terreur</p>
								<p class="contexte">Avocat de la défense d’Omar Raddad en 1994. La cour d'assises des Alpes-Maritimes a déclaré Omar Raddad coupable du meurtre de Ghislaine Marchal et le condamna à 18 ans de réclusion criminelle.</p>
							</figcaption>
						</figure>
					</div>
					<div class="splide__slide">
						<img src="~/assets/images/omar-2.png" alt="" class="personnage">
						<figure class="bio">
							<blockquote>
								<p class="citation">C’était terrifiant de voir les portes se refermer sur moi, mais je restais encore confiant. La justice française ne pouvait continuer à se tromper indéfiniment. Le juge allait comprendre son erreur, appeler la prison et donner l'ordre de me faire sortir immédiatement. Ce ne fut pas le cas. Je n'ai quitté la prison que 7 ans, 2 mois et 8 jours plus tard...</p>
							</blockquote>
							<figcaption>
								<p class="nom">Omar Raddad</p>
								<p class="profession">Le jardinier</p>
								<p class="contexte">Jardinier à la Chamade sur les hauteurs de Mougins dans la villa de Ghilaine Marchal lors du meutre de cette dernière. Il est le principal accusé et condamné malgré ses protestations d'innocence et de nombreux éléments semant le doute.</p>
							</figcaption>
						</figure>
					</div>
					<div class="splide__slide">
						<img src="~/assets/images/sylvie.png" alt="" class="personnage">
						<figure class="bio">
							<blockquote>
								<p class="citation">Il s'agit d'une des plus grandes erreurs judiciaires du XXe siècle que nous allons rectifier grâce à la Cour de révision</p>
							</blockquote>
							<figcaption>
								<p class="nom">Sylvie Noachovitch</p>
								<p class="profession">Avocate</p>
								<p class="contexte">Nouvelle avocate du jardinier Omar Raddad. Elle permet de lancer de nouvelles investigations pour inocenter son client.</p>
							</figcaption>
						</figure>
					</div>
					<div class="splide__slide">
						<img src="~/assets/images/henri.png" alt="" class="personnage">
						<figure class="bio">
							<blockquote>
								<p class="citation">Omar Raddad est coupable. Il faut bien convenir que ce constat est une stricte vérité judiciaire puisque l'accusé désigné en lettres de sang s'il a bénéficié d'une grâce présidentielle partielle, n'a jamais obtenu la révision de son procès. Omar Raddad coupable !</p>
							</blockquote>
							<figcaption>
								<p class="nom">Henri Leclerc</p>
								<p class="profession">Juriste/Avocat</p>
								<p class="contexte">Ancien avocat de la famille Marchal et de la partie civile de l’affaire Omar Raddad.</p>
							</figcaption>
						</figure>
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
	name: 'SliderPerson',
	mounted() {
		const splide = new Splide( '#slider2', {
			classes: {
				page: 'splide__pagination__page page-dot',
			},
			type: 'loop',
			direction: 'ttb',
			height: '500px',
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
}

.splide__slide {
	height: 100%;
	/* border: solid aqua; */
	display: flex;
	justify-content: space-around;
	align-items: center;
	overflow: hidden;
}

.personnage {
	width: 400px;
	height: 100%;
}

figure {
	position: relative;
	z-index: -1;
	right: 3%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
}

.citation {
	font-family: 'Georgia-bold';
	display: block;
	text-align: center;
	position: relative;
	line-height: 1.5em;
	font-size: 1.0625rem;
}

.citation::before {
	content: url('/images/virgule-top.png');
	position: absolute;
	z-index: -1;
	top: -100px;
	left: -40px;
}

.citation::after {
	content: url('/images/virgule-bottom.png');
	position: absolute;
	z-index: -1;
	bottom: -50px;
	right: -40px;
}

.citation::first-letter {
	font-size: 3rem;
}

.citation span {
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
	right: 1.4%;
	/* margin-left: auto; */
	/* border: solid red; */
	height: 45%;
	top: 27%;
}

</style>