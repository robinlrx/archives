// import { gsap, Power3 } from 'gsap'

export const currentRadioClip = 'sounds/radio/extrait1/1.mp3'
export function initRadio() {}

export function changeFrequence(radio) {
  // const aiguille = radio.container.getObjectByName('Aiguille')

  // gsap.to(aiguille.position, {
  //   z: 30,
  //   duration: 1,
  //   ease: Power3,
  //   onUpdate: () => {
  //     this.controls.getObject().updateProjectionMatrix()
  //   },
  //   onComplete: () => {
  //     this.isZoomed = true
  //     window.addEventListener('click', this.currentAction)
  //   }
  // })

  radio.sound.stop()
  radio.sound.setLoop(false)
  console.log(radio.sound)

  radio.audioLoader.load(`sounds/radio/transition-radio.mp3`, (buffer) => {
    radio.sound.setBuffer(buffer)
    radio.sound.play()
    radio.sound.onEnded = function () {
      console.log('aaaa')
      radio.sound.stop()
      radio.audioLoader.load(`${currentRadioClip}`, (buffer) => {
        radio.sound.setBuffer(buffer)
        radio.sound.play()
      })
    }
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
