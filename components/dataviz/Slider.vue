<template>
	<div class="splide">
		<div class="splide__track">
				<div class="splide__list">
					<div class="splide__slide" style="width: 150px">
						<img src="images/jacques.png" alt="" class="personnage">
					</div>
					<div class="splide__slide" style="width: 250px">Slide 02</div>
					<div class="splide__slide" style="width: 200px">Slide 03</div>
					<div class="splide__slide" style="width: 200px">Slide 04</div>
				</div>
		</div>
	</div>
</template>

<script>
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
export default {
	name: 'Slider',
	mounted() {
		const splide = new Splide( '.splide', {
			type: 'loop',
			direction: 'ttb',
			height: '400px',
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
	width: 80%;
	margin: auto;
	/* border: solid red; */
}

.splide__slide {
	height: 100%;
	border: solid aqua;
}

.personnage {
	width: 350px;
	height: 100%;
}

</style>