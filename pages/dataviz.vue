<template>
	<section class="question">
		<h2>Pensez-vous qu’Omar Raddad est le meutrier inspecteur ?</h2>
		<div>
			<button ref="yes" @click='updateDocument()'>OUI</button>
			<button ref="no">NON</button>
			<button ref="jsp">NE SAIS PAS</button>
		</div>
	</section>
</template>

<script>
import { getFirestore, updateDoc, doc, increment } from "firebase/firestore";
import { app } from '../js/firebase-config';

const db = getFirestore(app);
const docRef = doc(db, "murder", "nbz24O9VmlyMaxGnRQuc");

export default {
	// mounted() {
	// 	console.log('$nuxt.$route.path:', this.$nuxt.$route.path)
	// },
	methods: {
		updateDocument() {
			updateDoc(docRef, {
				yes: increment(1)
			}).then(function() {
				window.location.href = '/chart';
			});
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