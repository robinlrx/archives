<template>
	<section class="timeline-section">
		<Box title="Quelle époque vous parle le plus :" width="1000px">
			<div class="search-container">
				<h2 class="text-bold"><span>Sur quelle période</span> avez-vous basé <br><span>vos recherches ?</span></h2>
				<div class="separator separator-2"></div>
				<div class="text-container">
					<p><span>Sur le long terme, d’après l’Union européenne de radio-télévision, le niveau de confiance dans les médias en Europe a considérablement varié.</span> La confiance dans la télévision et les autres médias a décliné dans de nombreux pays, sans que celle placée dans internet augmente pour autant – d’où une atmosphère de défiance généralisée.</p>
					<p><span>Ces cinq dernières années, la confiance dans internet a fortement</span> baissé dans la plus grande partie de l’Europe. Lorsque les médias traditionnels inspirent moins la confiance, cela s’explique souvent par le degré d’indépendance dont ils semblent jouir et par la présence plus ou moins forte des médias de service public.</p>
				</div>
				<div class="timeline"></div>
				<img src="images/timeline-data.svg" alt="" class="timeline-img">
			</div>
			<Card title="Photo" date="1991" url="https://www.police-scientifique.com/omar-raddad/le-blocage-de-porte" left="18.5%"/>
			<Card title="Sources multiples" date="1995" url="#" picto="images/picto-tv.svg" left="25.7%"/>
		</Box>
	</section>
</template>

<script>
import Box from './Box.vue';
import Card from './Card.vue';
export default {
	name: 'Search',
	components: {
		Box,
		Card
	}
}
</script>

<style scoped>
@import '../../css/general.css';

.timeline-section {
	position: relative;
}

.search-container {
	padding: 20px;
	height: 450px;
	position: relative;
}

.text-bold span:last-of-type {
	font-size: 2.5rem;
}

.text-container {
	display: flex;
	width: 100%;
	justify-content: flex-start;
	align-items: flex-start;
	font-family: 'Georgia-bold';
	padding-bottom: 100px;
}

.text-container p {
	margin: 15px 10px;
	text-align: justify;
}

.text-container p span {
	text-decoration: underline 3px var(--green-lime);
	text-decoration-skip-ink: none;
}

.timeline {
	width: 100%;
	height: 2px;
	background-color: var(--black);
}

.timeline-img {
	position: absolute;
	top: 22%;
	width: 96%;
}

</style>