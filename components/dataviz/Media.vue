<template>
	<section>
		<Box title="Et l’opinion publique dans tout ça :" width="850px">

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

		<Box width="500px" icon-background="var(--black)" icon-color="var(--cream)" icon="i" title="Légendes">
			<div class="picto-wrapper">
				<div class="picto-group">
					<LegendItem pictolegend="url('images/picto-pp.svg'), var(--black)" boldname="Presse <br>Papier" name="Journal/Photo <br>d’archive" pictoheight="80px" pictowidth="80px" />
					<LegendItem pictolegend="url('images/picto-rs.svg'), var(--black)" boldname="Réseau <br>Social" pictoheight="80px" pictowidth="80px" />
					<LegendItem pictolegend="url('images/picto-pw.svg'), var(--black)" boldname="Presse <br>Web" pictoheight="80px" pictowidth="80px" />
				</div>
				<div class="picto-group">
					<LegendItem pictolegend="url('images/picto-tv.svg'), var(--black)" boldname="TV" name="Journal Télévisé/<br>Interview/film/<br>Documentaire" pictoheight="80px" pictowidth="80px" />
					<LegendItem pictolegend="url('images/picto-radio.svg'), var(--black)" boldname="Radio" pictoheight="80px" pictowidth="80px" />
					<LegendItem pictolegend="var(--green)" boldname="Taux de <br>confiance" pictoheight="80px" pictowidth="80px" />
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
	}
}
</script>

<style scoped>
@import '../../css/general.css';
@import url('https://fonts.googleapis.com/css2?family=Almarai:wght@700&display=swap');

section {
	margin-bottom: 200px;
	border: solid blue;
}

.media-container {
	padding: 30px;
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

.link {
	display: flex;
	/* justify-content: center; */
	align-items: center;
}

.link a {
	font-family: 'Almarai', sans-serif;
	color: var(--black);
	text-decoration: none;
	margin-left: 10px;
	background-image: linear-gradient(90deg, var(--cream), var(--cream)), linear-gradient(90deg, var(--black), var(--black));
	background-size: 100px 1.5px, 100% 1.5px;
	background-repeat: no-repeat;
	background-position-x: calc(100px * -1), 0;
	background-position-y: 100%;
	transition: background-position-x 0.5s ease;

}

.link a:hover {
	background-position-x: calc(100% + 100px), 0;
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


</style>