// initialisation des localStorage
export const initLocalData = () => {
	// media de confiance
	localStorage.setItem('incremenntTV', 0) // tv
	localStorage.setItem('incremenntRS', 0) // réseau social
	localStorage.setItem('incremenntPW', 0) // presse web
	localStorage.setItem('incremenntRadio', 0) // radio
	localStorage.setItem('incremenntPP', 0) // presse papier
	// cards
	localStorage.setItem('cardMedia1', false)
	localStorage.setItem('cardMedia2', false)
	localStorage.setItem('cardMedia3', false)
	localStorage.setItem('cardMedia4', false)
	localStorage.setItem('cardMedia5', false)
	localStorage.setItem('cardMedia6', false)
	localStorage.setItem('cardMedia7', false)
	localStorage.setItem('cardMedia8', false)
	localStorage.setItem('cardMedia9', false)
	localStorage.setItem('cardMedia10', false)
	localStorage.setItem('cardMedia11', false)
	localStorage.setItem('cardMedia12', false)
	localStorage.setItem('cardMedia13', false)
	localStorage.setItem('cardMedia14', false)
	localStorage.setItem('cardMedia15', false)
	localStorage.setItem('cardMedia16', false)
	localStorage.setItem('cardMedia17', false)
	localStorage.setItem('cardMedia18', false)

	// todo data increment pie chart
	localStorage.setItem('pieJT', 0)
	localStorage.setItem('piePhoto', 0)
	localStorage.setItem('piePW', 0)
	localStorage.setItem('pieDocu', 0)
	localStorage.setItem('pieFilm', 0)
	localStorage.setItem('pieRadio', 0)
	localStorage.setItem('pieRS', 0)
	localStorage.setItem('pieInterview', 0)
	localStorage.setItem('piePP', 0)
}

// dataviz media de confiance
export const incrementMedia = (name) => {
	let incremennt = parseInt(localStorage.getItem(`incremennt${name}`));
	// console.log('incremennt:', incremennt)
	localStorage.setItem(`incremennt${name}`, ++incremennt);
	// console.log(localStorage.setItem(`incremennt${name}`, incremennt + 1))
}

// dataviz media de confiance
export const incrementPieMedia = (name) => {
	let pieIncremennt = parseInt(localStorage.getItem(`pie${name}`));
	localStorage.setItem(`pie${name}`, ++pieIncremennt);
}