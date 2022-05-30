// import * as THREE from 'three'

export const currentRadioClip = 'sounds/radio/extrait1/1.mp3'
export function initRadio(){

}

export function changeFrequence(radio) {
  radio.sound.stop()
  radio.audioLoader.load(`${currentRadioClip}`, (buffer) => {
    radio.sound.setBuffer(buffer)
    radio.sound.play()
  })
}

// Now we want to create a filter
// const filter = radio.sound.context.createBiquadFilter();
// radio.sound.source.connect(filter); //and of course connect it
// filter.type = "lowshelf"; //this is a lowshelffilter (try excuting filter1.LOWSHELF in your console)
// filter.frequency.value = 95; //as this is a lowshelf filter, it strongens all sounds beneath this frequency
// filter.gain.value = 30; //the gain with which it should increase

// //now we want to connect that to the output
// filter.connect(radio.sound.context.destination);
