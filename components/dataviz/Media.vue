<template>
	<section>
		<Box title="Et l’opinion publique dans tout ça :" width="60%">

			<div class='media-container'>
				<h2 class="text-bold">Avez-vous consulté des<br> <span>médias de confiance ?</span></h2>
				<div class="separator separator-2"></div>
				<p>L’Union européenne de radio-télévision, alliance de médias de service public, a étudié la confiance dans les médias dans son rapport Trust in Media 201817. Elle y constate qu’il devient de plus <span> en plus difficile de maintenir un haut niveau de confiance, du fait notamment de l’essor de la désinformation.</span></p>
				<div class="link">
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
					<a href="https://rm.coe.int/prems-077520-fra-2018-nex-media-new-regulation-txt-a4-web/16809efcca" target="_blank">En lire plus sur le sujet</a>
				</div>
			</div>

		</Box>
	</section>
</template>

<script>
import Box from './Box.vue';
export default {
	name: 'Media',
	components: {
		Box
	}
}
</script>

<style scoped>
@import '../../css/general.css';
@import url('https://fonts.googleapis.com/css2?family=Almarai:wght@700&display=swap');

section {
	margin-bottom: 200px;
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


</style>