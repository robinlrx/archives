<template>
	<section>
		<img src="images/frise2.png" alt="">
		<div class="date-wrapper">

			<div class="date-item date-item-1">
				<div class="dot">
					<div class="point"></div>
					<div class="timeline"></div>
				</div>
				<div class="date">
					<p>1991</p>
					<div class="line"></div>
				</div>
				<div class="text-content">
					<p class="explication">Le 24 juin 1991, les gendarmes découvrent le corps sans vie de Ghislaine Marchal dans la cave de son domicile de Mougins. Près du corps, la phrase accusatrice « Omar m'a tuer » est retrouvée, écrite en lettres de sang sur une porte. Elle semble imputer le crime à Omar Raddad, son jardiner.</p>
				</div>
			</div>
			<div class="date-item date-item-2">
				<div class="date">
					<p>1994</p>
					<div class="line"></div>
				</div>
				<div class="text-content">
					<p class="explication">Le 2 février 1994, Omar Raddad alors défendu par Me Jacques Vergès, est déclaré coupable du meurtre de Ghislaine Marchal.</p>
				</div>
				<div class="dot">
					<div class="timeline"></div>
					<div class="point"></div>
				</div>
			</div>
			<div class="date-item date-item-3">
				<div class="dot">
					<div class="point"></div>
					<div class="timeline"></div>
				</div>
				<div class="date">
					<p>1996</p>
					<div class="line"></div>
				</div>
				<div class="text-content">
					<p class="explication">Le 23 mai 1996, le président Jacques Chirac signe un décret pour accorder une grâce partielle. Sa peine est réduite de quatre ans et huit mois. Omar Raddad est libéré le 4 septembre 1998 de la centrale de Muret (Haute-Garonne) après avoir purgé plus de sept ans de prison.</p>
				</div>
			</div>
			<div class="date-item date-item-4">
				<div class="date">
					<p>2015</p>
					<div class="line"></div>
				</div>
				<div class="text-content">
					<p class="explication">Le 5 novemenbre 2015, la nouvelle avocate d'Omar Raddad, Mme Sylvie Noachovitch demande de nouveaux travaux sur les pièces du procès.</p>
				</div>
				<div class="dot">
					<div class="timeline"></div>
					<div class="point"></div>
				</div>
			</div>
			<div class="date-item date-item-5">
				<div class="dot">
					<div class="point"></div>
					<div class="timeline"></div>
				</div>
				<div class="date">
					<p>2021</p>
					<div class="line"></div>
				</div>
				<div class="text-content">
					<p class="explication">Le 24 juin 2021, Me Noachovitch dépose une nouvelle requête en révision sur la base des nouvelles analyses de des traces d'ADN. Selon un expert, ces dernières renforcent l'hypothèse d'un dépôt des empreintes au moment des faits, et non d'une «pollution» ultérieure.</p>
				</div>
			</div>

		</div>
	</section>
</template>

<script>
export default {
	name: "Frise",
	mounted() {
		const dot = this.$el.getElementsByClassName('point')
		console.log(dot);
		Array.from(dot).forEach(element => {
			const line = element.closest('.date-item').querySelector('.date .line')
			const textContent = element.closest('.date-item').querySelector('.text-content')

			element.addEventListener('mouseover', () => {
				// console.log(element)
				element.style.opacity = 0
				console.log(line)
				line.classList.add('active')
				textContent.classList.add('active')
			})

			element.addEventListener('mouseleave', () => {
				element.style.opacity = 1
				line.classList.remove('active')
				textContent.classList.remove('active')
			})
		});
	}
}
</script>

<style scoped>
@import '../../css/general.css';

section {
	position: relative;
	/* display: flex;
	justify-content: center;
	align-items: center; */
	/* border: solid red; */
	height: 500px;
}

.date-wrapper {
	position: absolute;
	width: 100%;
	height: 100%;
	/* border: solid blue; */
}

.date-item {
	display: flex;
	flex-direction: column;
	/* border: solid pink; */
	position: absolute;
}

.point {
	width: 20px;
	height: 20px;
	background-color: var(--black);
	border-radius: 50%;
	position: relative;
	left: -3.5%;
	top: -6%;
}

.text-content {
	opacity: 0;
	transition: opacity ease-in-out 0.2s;
}

.text-content.active {
	opacity: 1;
}

.timeline {
	width: 2px;
	height: 40px;
	background-color: var(--black);
}

.date {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 20px;
}

.date p {
	font-family: 'Strong-concrete';
	font-size: 2.4rem;
	margin: 0;
	margin-right: 20px;
}

.line {
	width: 6px;
	height: 6px;
	margin-right: auto;
	background-color: var(--orange);
	transition: all ease-in-out 0.2s;
}

.line.active {
	width: 100%;
}

.explication {
	font-family: 'Georgia-bold';
	margin: 0;
	text-align: justify;
}

.date-item-1 {
	width: 270px;
	top: 63.5%;
	left: 26.8%;
}

.date-item-2 {
	width: 250px;
	/* height: 200px; */
	top: 25.3%;
	left: 39.5%;
	/* border: solid pink; */
}

.date-item-3 {
	width: 260px;
	top: 63.5%;
	left: 48.25%;
}

.date-item-4 {
	width: 250px;
	/* height: 200px; */
	top: 22.3%;
	left: 56.3%;
	/* border: solid pink; */
}

.date-item-5 {
	width: 260px;
	top: 63.5%;
	left: 69.5%;
}

</style>