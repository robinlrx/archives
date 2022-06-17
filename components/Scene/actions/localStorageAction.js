// dataviz media de confiance
const incrementTV = () => {
	let incremenntTV = parseInt(localStorage.getItem("incremenntTV"));
	localStorage.setItem("incremenntTV", ++incremenntTV);
}
export {incrementTV}