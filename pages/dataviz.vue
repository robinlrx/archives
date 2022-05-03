<template>
	<section class="question">
		<h2>Pensez-vous qu’Omar Raddad est le meutrier inspecteur ?</h2>
		<div>
			<button ref="yes" @click='updateDocument(yes)'>OUI</button>
			<button ref="no" @click='updateDocument(no)'>NON</button>
			<button ref="jsp" @click='updateDocument(jsp)'>NE SAIS PAS</button>
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
					this.$nuxt.$router.push('/chart') 
				})
			} catch (e) {
				return Promise.reject(e)
			}
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
}

h2 {
	font-size: 2rem;
}

section div {
	display: flex;
	justify-content: center;
	align-items: center;
}

button {
	outline: none;
	width: 200px;
	height: 100px;
	border: solid var(--black) 3px;
	background-color: var(--cream);
	cursor: pointer;
	margin: 10px;
	font-family: 'Strong-concrete';
	font-size: 2rem;
}
</style>