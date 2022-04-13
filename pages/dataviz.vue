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
	// mounted() {
	// 	console.log('$nuxt.$route.path:', this.$nuxt.$route.path)
	// },
	data() {
		return {
			// param : 'field of firebase doc'
			yes: 'yes',
			no: 'no',
			jsp: 'jsp'
		}
	},
	methods: {
		// updateDocument() {
		// 	updateDoc(docRef, {
		// 		yes: increment(1)
		// 	}).then(function() {
		// 		window.location.href = '/chart';
		// 	});
		// }

		async updateDocument(documentField) {
			const ref = this.$fire.firestore.collection('murder').doc('nbz24O9VmlyMaxGnRQuc')
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

<style scoped>
body {
	margin: 0;
}

section {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 100vh;
	font-family: Arial, Helvetica, sans-serif;
}

button {
	outline: none;
	width: 150px;
	height: 80px;
	border: solid black;
	background-color: #fff;
	cursor: pointer;
	margin: 10px;
}
</style>