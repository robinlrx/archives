const phoneClips = [
  'sounds/phone/phone1.mp3',
  'sounds/phone/phone2.mp3',
  'sounds/phone/phone3.mp3',
  'sounds/phone/phone4.mp3',
]

const phoneClipsBoolean = [false, false, false, true]
export function phoneSound(phone, range) {
  phone.audioLoader.load(`${phoneClips[range]}`, (buffer) => {
    phone.sound.setBuffer(buffer)
    phone.sound.setLoop(false)
    if (phoneClipsBoolean[range] === false) {
      phone.sound.play()
      phoneClipsBoolean[range] = true
    }
  })
}
