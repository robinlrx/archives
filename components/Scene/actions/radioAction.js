import { gsap, Power3 } from 'gsap'
import * as THREE from 'three'

const radioClipsList = [
  'sounds/radio/extrait1/1.mp3',
  'sounds/radio/extrait2/1.mp3',
  'sounds/radio/extrait3/1.mp3',
  'sounds/radio/extrait4/1.mp3',
  'sounds/radio/extrait5/1.mp3',
  'sounds/radio/extrait1/2.mp3',
  'sounds/radio/extrait2/2.mp3',
  'sounds/radio/extrait3/2.mp3',
  'sounds/radio/extrait4/2.mp3',
  'sounds/radio/extrait5/2.mp3',
  'sounds/radio/extrait1/3.mp3',
  'sounds/radio/extrait2/3.mp3',
  'sounds/radio/extrait3/3.mp3',
  'sounds/radio/extrait4/3.mp3',
  'sounds/radio/extrait5/3.mp3',
]

const aiguillePositions = [
  0.68, 0.58, 0.29, 0.01, -0.22, 0.68, 0.58, 0.29, 0.01, -0.22, 0.68, 0.58,
  0.29, 0.01, -0.22,
]

const wheelRotation = [
  0, 0.6, 2.4, 3.5, 4.9, 0, 0.6, 2.4, 3.5, 4.9, 0, 0.6, 2.4, 3.5, 4.9,
]
let index = 0
let currentAiguillePosition = new THREE.Vector3(
  aiguillePositions[index],
  0.6,
  -0.67
)
let currentWheelRotation = new THREE.Vector3(0, 0, wheelRotation[index])
let currentRadioClip = radioClipsList[index]

export function initRadio() {}

export function changeFrequence(radio) {
  if (index === radioClipsList.length) {
    index = 0
  } else index++

  currentAiguillePosition = new THREE.Vector3(
    aiguillePositions[index],
    0.6,
    -0.67
  )
  currentWheelRotation = new THREE.Vector3(0, 0, wheelRotation[index])

  currentRadioClip = radioClipsList[index]

  const aiguille = radio.container.getObjectByName('Aiguille')
  const wheel = radio.container.getObjectByName('Wheel_2')

  radio.sound.stop()
  radio.sound.setLoop(false)

  radio.audioLoader.load(`sounds/radio/transition-radio.mp3`, (buffer) => {
    radio.sound.setBuffer(buffer)
    radio.sound.play()

    gsap.to(aiguille.position, {
      x: currentAiguillePosition.x,
      y: currentAiguillePosition.y,
      z: currentAiguillePosition.z,
      duration: 0.5,
      ease: Power3,
    })
    gsap.to(wheel.rotation, {
      x: currentWheelRotation.x,
      y: currentWheelRotation.y,
      z: currentWheelRotation.z,
      duration: 0.5,
      ease: Power3,
    })
    radio.sound.onEnded = () => {
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
