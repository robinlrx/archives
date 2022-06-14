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
				<!-- 1995 -->
				<!-- eslint-disable-next-line vue/no-lone-template -->
				<span>
					<Card v-show="showCard" title="Photo" date="1991" picto="images/picto-pp.svg" url="https://www.police-scientifique.com/omar-raddad/le-blocage-de-porte" left="5.6%"/>
				</span>
				
				<Card v-show="showCard" title="Sources multiples" date="1995"  picto="images/picto-tv.svg" left="15.8%"/>
				<!-- 2001 -->
				<Card v-show="showCard" title="Le Monde" date="2001" picto="images/picto-pp.svg" left="31.5%"/>
				<Card v-show="showCard" title="Le Parisien" date="2001" url="https://www.leparisien.fr/faits-divers/un-temoin-cle-pret-a-se-soumettre-au-test-adn-22-02-2001-2001975981.php" picto="images/picto-pw.svg" left="33.2%"/>
				<!-- 2008 -->
				<Card v-show="showCard" title="France Inter" date="2008" url="https://podcasts.apple.com/fr/podcast/2-omar-raddad-lhistoire-secr%C3%A8te/id1465111348?i=1000441988790" left="49.7%"/>
				<!-- 2011 -->
				<Card v-show="showCard" title="Omar m'a tuer" date="2011" picto="images/picto-tv.svg" left="57.5%"/>
				<Card v-show="showCard" title="Souces multiples" date="2011" picto="images/picto-tv.svg" left="59.2%"/>
				<!-- 2019 -->
				<Card v-show="showCard" title="Les voix du crimes" date="2019" url="https://www.radiofrance.fr/franceinter/podcasts/affaires-sensibles/affaires-sensibles-du-jeudi-02-septembre-2021-3608970" left="78.1%"/>
				<Card v-show="showCard" title="Souces multiples" date="2019" picto="images/picto-tv.svg" left="80%"/>
				<!-- 2021 -->
				<Card v-show="showCard" title="La Dépêche du Midi" date="2021" picto="images/picto-pp.svg" left="83.5%"/>
				<Card v-show="showCard" title="Le Monde" date="2021" url="https://www.lemonde.fr/societe/article/2021/12/17/condamnation-d-omar-raddad-un-complement-d-information-qui-pourrait-mener-a-une-saisine-de-la-cour-de-revision_6106379_3224.html" picto="images/picto-pp.svg" left="85%"/>
				<Card v-show="showCard" title="France Culture" date="2021" left="86%"/>
				<Card v-show="showCard" title="France Culture" date="2021" url="https://www.radiofrance.fr/franceculture" left="87.2%"/>
				<Card v-show="showCard" title="L'intégrale" date="2021" url="https://www.rtl.fr/actu/justice-faits-divers/omar-raddad-l-espoir-d-un-nouveau-proces-7900106692" left="88.45%"/>
				<Card v-show="showCard" title="Twitter" date="2021" picto="images/picto-rs.svg" left="89.9%"/>
				<!-- 2022 -->
				<Card v-show="showCard" title="Le Point" date="2022" url="https://www.ccme.org.ma/images/stories/Le_Point_Omar_Raddad.pdf" picto="images/picto-pp.svg" left="91.5%"/>
				<Card v-show="showCard" title="Reddit" date="2022" url="https://www.reddit.com/r/UnresolvedMysteries/comments/79cjcz/omar_ma_tuer_who_killed_ghislaine_marchal/" picto="images/picto-rs.svg" left="93%"/>
			</div>
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
	},
	data() {
		return {
			showCard: true // localStorage.getItem("mediaX") : true or false
		}
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