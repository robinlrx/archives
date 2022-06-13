<template>
	<section class="question body-light">
		<h2>Alors inpecteurs, pensez-vous que <br> Omar Raddad est le meutrier ?</h2>
		<div class="button-group">
			<button ref="yes" @click='updateDocument(yes), stockValue(yes)'>Oui</button>
			<button ref="jsp" @click='updateDocument(jsp), stockValue(jsp)'>Indécis</button>
			<button ref="no" @click='updateDocument(no), stockValue(no)'>Non</button>
		</div>
	</section>
</template>

<script>
// import { getFirestore, updateDoc, doc, increment } from "firebase/firestore";
// import { app } from '../js/firebase-config';

// const db = getFirestore(app);
// const docRef = doc(db, "murder", "nbz24O9VmlyMaxGnRQuc");

export default {
	data() {
		return {
			// param : 'field of firebase doc'
			yes: 'yes',
			no: 'no',
			jsp: 'jsp'
		}
	},
	methods: {

		async updateDocument(documentField) {
			const ref = this.$fire.firestore.collection('dataviz').doc('meurtrier')
			const increment = this.$fireModule.firestore.FieldValue.increment(1)
			try {
			await ref.update({
				[`${documentField}`]: increment
				})
				.then(() => {
					this.$nuxt.$router.push('/dataviz') 
				})
			} catch (e) {
				return Promise.reject(e)
			}
		},

		stockValue(val) {
			localStorage.setItem('data1', val)
			console.log(localStorage.getItem('data1'))
		}
	}
}


</script>

<style>
	@import '../css/general.css';
</style>

<style scoped>

section {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 100vh;
	font-family: 'Georgia-regular';
	background-image: url('../static/images/fond-question.png');
	background-color: var(--black);
	background-size: cover;
	background-position: center;
	color: var(--cream);
}

h2 {
	font-size: 1.375rem;
	text-align: center;
}

section div {
	display: flex;
	justify-content: center;
	align-items: center;
}

button {
	outline: none;
	color: var(--cream);
	border: solid 1px transparent;
	background-color: transparent;
	cursor: pointer;
	margin: 10px;
	font-family: 'Strong-concrete';
	font-size: 1rem;
}

.button-group:hover button{
	opacity: 0.2;
}

.button-group:hover button:hover {
	border-bottom: solid 1px var(--cream);
	opacity: 1;
}
</style>