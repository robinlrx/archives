<template>
	<div class="card" :style="{left: left}">
		<div class="dot">
			<img src="images/active-dot.svg" alt="" class="line-dot">
			<div class="point"></div>
			<div class="trait"></div>
		</div>
		<div class="card-content">
			<img :src="picto" alt="">
			<div class="date">
				<p class="text-bold">{{date}}</p>
			</div>
			<div class="card-text">
				<p class="card-title">{{title}}</p>
				<div class="link">
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="18" height="18" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
					<a :href="url" target="_blank">Lien</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Card',
	props: {
		picto: {
			type: String,
			required: true,
			default: "/images/picto-radio.svg"
		},
		date: {
			type: String,
			required: false,
			default: "2021"
		},
		title: {
			type: String,
			required: false,
			default: "La Dépêche du Midi"
		},
		url: {
			type: String,
			required: false,
			default: "#"
		},
		left: {
			type: String,
			required: false,
			default: undefined
		}
	}
}
</script>

<style scoped>
@import '../../css/general.css';

.card {
	width: 90px;
	/* height: 320px; */
	height: auto;
	/* border: solid 1px red; */
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 75.7%;
}

.card .dot {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	position: relative;
}

.trait {
	width: 2px;
	height: 40px;
	background-color: var(--black);
}

.point, .line-dot {
	width: 15px;
	height: 15px;
	/* left: -3.5%;
	position: absolute;
	top: -6.5%; */
}

.point {
	background-color: var(--black);
	border-radius: 50%;
	z-index: 2;
	position: absolute;
	top: 0;
}

.card-content {
	background-color:  var(--cream);
	width: 100%;
	border: solid var(--black);
	height: 240px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.card-content img {
	width: 60%;
}

.date {
	width: 100%;
	border: solid var(--black);
	background-color:  var(--green);
	text-align: center;
	padding: 5px 0;
}

.card-text {
	align-self: start;
	margin-left: 5px;
	font-family: 'Almarai', sans-serif;
	padding: 10px 0;
}

.card-title {
	margin-top: 0px;
	font-size: 0.9rem;
}

.link {
	font-size: 0.9rem;
}
</style>