<template>
	<section class="timeline-section">
		<Box title="Quelle époque vous parle le plus :" width="1000px" addclass="search-box reveal-1">
			<div class="search-container">
				<h2 class="text-bold"><span>Sur quelle période</span> avez-vous basé <br><span>vos recherches ?</span></h2>
				<div class="separator separator-2"></div>
				<div class="text-container">
					<p><span>Sur le long terme, d’après l’Union européenne de radio-télévision, le niveau de confiance dans les médias en Europe a considérablement varié.</span> La confiance dans la télévision et les autres médias a décliné dans de nombreux pays, sans que celle placée dans internet augmente pour autant – d’où une atmosphère de défiance généralisée.</p>
					<p><span>Ces cinq dernières années, la confiance dans internet a fortement</span> baissé dans la plus grande partie de l’Europe. Lorsque les médias traditionnels inspirent moins la confiance, cela s’explique souvent par le degré d’indépendance dont ils semblent jouir et par la présence plus ou moins forte des médias de service public.</p>
				</div>
				<div class="timeline"></div>
				<img src="~/assets/images/timeline-data.svg" alt="" class="timeline-img">

				<!-- eslint-disable-next-line vue/no-unused-vars -->
				<span v-for="(item, index) in cardData" :key="item.id">
					<Card v-show="showCard(item.id)" :title="item.title" :date="item.date" :picto="require(`~/assets/images/${item.picto}`)" :url="item.url" :left="item.left"/> 
				</span>
			</div>
		</Box>
		<div class="box-shadow reveal-1"></div>
		<img src="~/assets/images/line-search.svg" alt="" class="line-date">
	</section>
</template>

<script>
import cardJson from '../../static/json/card.json';
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
			// showCard: true, // localStorage.getItem("cardMediaX") : true or false
			// showCardUser: [
			// 	{true}
			// ],
			cardData: cardJson.cardData,
			showCard: (x) =>  {
				if(process.client) return JSON.parse( localStorage.getItem(`cardMedia${x}`) );
			}
		}
	},
	mounted() {
		// this.setCardLocalStorage()
		// localStorage.setItem('incremennt', 0)
	},
	methods: {
		// getCardLocalStorage(x) {
		// 	return JSON.parse( localStorage.getItem(`cardMedia${x}`) );
			
		// }
		// increment() {
		// 	let incremennt = parseInt(localStorage.getItem("incremennt"));
		// 	localStorage.setItem("incremennt", ++incremennt);
		// 	console.log(incremennt);
		// }
	}
}
</script>

<style scoped>
@import '../../css/general.css';

.timeline-section {
	position: relative;
}

.search-box {
	position:relative;
	z-index: 1;
	background-color: var(--cream);
}

.search-container {
	padding: 20px;
	height: 450px;
	position: relative;
}

.text-bold span:last-of-type {
	font-size: 3.5rem;
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
	top: 64%;
	width: 96%;
	height: 100px;
}

.box-shadow {
	width: 1000px;
	height: 517px;
	border: solid var(--black);
	box-shadow: 10px 8px 0px var(--black);
	position: absolute;
	z-index: 0;
	/* top: 10%;
	right: 10%; */
	transform: translate(5%, 7%);
}

.line-date {
	position: absolute;
	z-index: 3;
	top: 24%;
	pointer-events: none;
}

</style>