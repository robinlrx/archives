import * as THREE from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
// import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'

export default class Model {
  constructor({
    src,
    audioSrc,
    audioVolume = 1,
    audioDistance = 1,
    loadingManager,
    listener,
    material,
    videoContainer,
    videoSrc,
    camPos,
    action,
    index,
    isNotPositional,
    addDefaultPosition,
    scene2,
    scene1,
    website,
    camera,
  }) {
    this.src = src
    this.audioSrc = audioSrc
    this.audioVolume = audioVolume
    this.audioDistance = audioDistance
    this.material = material
    this.loadingManager = loadingManager
    this.listener = listener
    this.videoContainer = videoContainer
    this.videoSrc = videoSrc
    this.container = new THREE.Object3D()
    this.container.name = this.src
    this.camPos = camPos
    this.action = action
    this.index = index
    this.isNotPositional = isNotPositional
    this.addDefaultPosition = addDefaultPosition
    this.scene2 = scene2
    this.scene1 = scene1
    this.website = website
    this.camera = camera
    this.init()
  }

  init() {
    this.loadModel()
  }

  initSound(target) {
    if (this.isNotPositional) this.sound = new THREE.Audio(this.listener)
    else this.sound = new THREE.PositionalAudio(this.listener)
    this.sound.name = 'PositionalAudio'
    this.audioLoader = new THREE.AudioLoader()
    this.audioLoader.load(`${this.audioSrc}`, (buffer) => {
      if (!this.isNotPositional) this.sound.setRefDistance(this.audioDistance)
      this.sound.setLoop(true)
      this.sound.setBuffer(buffer)
      this.sound.setVolume(this.audioVolume)
    })
    target.add(this.sound)
  }

  initVideoTexture(target) {
    const video = document.createElement('video')
    video.src = this.videoSrc
    video.setAttribute('loop', '')
    video.muted = true
    video.load() // must call after setting/changing source
    const texture = new THREE.VideoTexture(video)

    texture.format = THREE.RGBAFormat
    const videoMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide,
    })
    target.material = videoMaterial
    texture.flipY = false
    this.video = target.material.map.image
  }

  // initIframe(target) {
  //   // create the plane mesh
  //   const material = new THREE.MeshBasicMaterial({
  //     side: THREE.DoubleSide,
  //     color: 0x049ef4,
  //   })
  //   const geometry = new THREE.PlaneGeometry()
  //   const planeMesh = new THREE.Mesh(geometry, material)
  //   planeMesh.name = 'meshTV'
  //   planeMesh.position.copy(target.position)
  //   planeMesh.rotation.copy(target.rotation)
  //   planeMesh.scale.copy(target.scale)
  //   // target.material = material
  //   // add it to the WebGL scene
  //   target.parent.add(planeMesh)

  //   const html = [
  //     `<iframe id="iframe" src=${this.website} width="1000px" height=500px" frameborder="0">`,
  //     '</iframe>',
  //   ].join('\n')
  //   const div = document.createElement('div')
  //   div.innerHTML = html
  //   // create the object3d for this element
  //   const cssObject = new CSS3DObject(div)
  //   cssObject.name = 'iframeTV'
  //   cssObject.flipY = false
  //   // we reference the same position and rotation
  //   cssObject.rotation.copy(planeMesh.rotation)
  //   // cssObject.quaternion.copy(  planeMesh.quaternion );
  //   cssObject.position.copy(planeMesh.position)
  //   cssObject.scale.copy(planeMesh.scale)
  //   cssObject.lookAt(this.camera)
  //   console.log(cssObject.position)
  //   // add it to the css scene
  //   this.scene2.add(cssObject)
  //   cssObject.element.onclick = function () {
  //     console.log('element clicked!')
  //   }
  // }

  initImage(target) {
    const texture = new THREE.TextureLoader()
    const imageTexture = texture.load(this.website)
    // create the plane mesh
    const material = new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
      map: imageTexture,
    })
    imageTexture.flipY = false
    target.material = material
    imageTexture.needsUpdate = true
  }

  loadModel(callback) {
    const dracoLoader = new DRACOLoader()

    dracoLoader.setDecoderPath('draco/')

    dracoLoader.preload()
    const loader = new GLTFLoader(this.loadingManager)
    loader.setDRACOLoader(dracoLoader)

    loader.load(`models/${this.src}.gltf`, (gltf) => {
      if (typeof callback === 'function') {
        callback(gltf.scene)
      }

      if (gltf.animations) {
        this.mixer = new THREE.AnimationMixer(gltf.scene)
        gltf.animations.forEach((clip) => {
          this.mixer.clipAction(clip).play()
        })
      }
      gltf.scene.traverse((child) => {
        child.objectName = this.src

        if (this.addDefaultPosition) {
          child.defaultPosition = child.getWorldPosition(new THREE.Vector3())
          child.defaultRotation = child.getWorldQuaternion(
            new THREE.Quaternion()
          )
        }
        if (child.isMesh) {
          child.material.side = THREE.DoubleSide
          child.castShadow = true
          child.receiveShadow = true
        }
        if (this.videoSrc && child.name === this.videoContainer) {
          this.initVideoTexture(child)
        }
        if (this.material && child.name !== this.videoContainer) {
          child.material = this.material
        }
        // if (
        //   this.scene1 &&
        //   this.scene2 &&
        //   this.camera &&
        //   child.name === this.videoContainer
        // ) {
        //   this.initIframe(child)
        //   console.log(child)
        // }
        if (this.website && child.name === this.videoContainer) {
          this.initImage(child)
        }
      })

      //   this.scene.add(gltf.scene)
      if (this.audioSrc) this.initSound(gltf.scene.children[0])
      this.container.add(gltf.scene)
      this.container.position.set(0, 6, -30)
      this.container.rotation.y = Math.PI
    })
  }
}
