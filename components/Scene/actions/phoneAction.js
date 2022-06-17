const phoneClips = [
  'sounds/phone/phone1.mp3',
  'sounds/phone/phone2.mp3',
  'sounds/phone/phone3.mp3',
  'sounds/phone/phone4.mp3',
]
export function phoneSound(phone, range) {
  //   const aiguille = phone.container.getObjectByName('telephone-combine')

  phone.audioLoader.load(`${phoneClips[range]}`, (buffer) => {
    phone.sound.setBuffer(buffer)
    phone.sound.setLoop(false)
    phone.sound.play()
  })
}
