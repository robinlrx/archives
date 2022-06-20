/* jshint sub:true */
import * as THREE from 'three'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'

import { gsap, Power3, Power4 } from 'gsap'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'

import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'

import { CustomOutlinePass } from './shaders/CustomOutlinePass.js'

import Model from './Model'
import { changeFrequence } from './actions/radioAction'
import { phoneSound } from './actions/phoneAction'
import { initLocalData, incrementMedia } from './actions/localStorageAction'

class SceneInit {
  constructor({ rootEl }) {
    this.canvas = document.createElement('canvas')
    this.root = rootEl
    this.background = 0x000
    this.raycaster = new THREE.Raycaster()
    this.cameraDefaultPosition = new THREE.Vector3(0, 10, -11)
    this.threeClock = new THREE.Clock()

    this.enabledRaycast = true
    this.isPhoneSpeaking = false
    this.animatedPhone = false
    this.endingAnimation = false

    this.isLoaded = false
    this.isZoomed = false
    this.currentAction = undefined
    this.currentTarget = undefined

    this.isHolding = false

    this.init()
    this.update()
    this.bindEvents()
    // localhost dataviz
    this.countRadio = 0
  }

  init() {
    this.initScene()
    this.initLights()
    this.initCamera()
    this.initRenderer()
    this.setControls()
    this.initAudio()
    // this.initModels()
    this.root.appendChild(this.canvas)
    // localStorage.setItem('incremenntTV', 0)
    initLocalData()
  }

  initAudio() {
    this.listener = new THREE.AudioListener()
    this.camera.add(this.listener)
  }

  initBackgroundNoise() {
    this.backgroundNoise = new THREE.Audio(this.listener)
    const backgroundNoiseLoader = new THREE.AudioLoader()
    backgroundNoiseLoader.load('sounds/BACKGROUND_NOISE.mp3', (buffer) => {
      this.backgroundNoise.setBuffer(buffer)
      this.backgroundNoise.setLoop(true)
      this.backgroundNoise.setVolume(0.3)
      this.backgroundNoise.play()
    })
  }

  radioAction = () => {
    changeFrequence(this.radio)
    incrementMedia('Radio')
    this.countRadio = ++this.countRadio
    // when at least 2 extract ar listened
    if (this.countRadio === 6) localStorage.setItem('cardMedia12', true) // extrait 1
    if (this.countRadio === 7) localStorage.setItem('cardMedia13', true) // extrait 2
    if (this.countRadio === 8) localStorage.setItem('cardMedia14', true) // extrait 3
    if (this.countRadio === 9) localStorage.setItem('cardMedia8', true) // extrait 4
    if (this.countRadio === 10) localStorage.setItem('cardMedia5', true) // extrait 5
  }

  TVSwitch = () => {
    incrementMedia('TV')
    const nextTV = this.TVs[Math.round(Math.random() * this.TVs.length)]
    if (nextTV.index === this.currentTarget.index) this.TVSwitch()
    else if (nextTV.camPos) {
      gsap.to(this.camera.position, {
        x: nextTV.camPos.x,
        y: nextTV.camPos.y,
        z: nextTV.camPos.z,
        duration: 1,
        ease: Power3,
        onComplete: () => {
          if (nextTV.card) localStorage.setItem(nextTV.card, true)

          this.currentTarget = nextTV
          this.objectsList.forEach((element) => {
            if (element.sound && element.src !== this.currentTarget.src) {
              element.sound.setVolume(0.3)
            }
          })
          this.currentTarget.sound.setVolume(this.currentTarget.audioVolume)
        },
      })
    }
  }

  holdPapers = () => {
    if (!this.isHolding && this.holdObject.children.length === 0) {
      this.holdObject.attach(this.currentTarget)
      gsap.to(this.currentTarget.position, {
        x: this.holdObject.position.x,
        y: this.holdObject.position.y,
        z: this.holdObject.position.z,
        duration: 0.6,
        ease: Power4,
        onComplete: () => {
          console.log(this.currentTarget)
          if (this.currentTarget.card)
            localStorage.setItem(this.currentTarget.card, true)
          this.isHolding = true
          incrementMedia('PP')
        },
      })
    } else {
      const news = this.holdObject.children[0]
      this.newspapers.container.attach(news)
      gsap.to(news.quaternion, {
        x: news.defaultRotation.x,
        y: news.defaultRotation.y,
        z: news.defaultRotation.z,
        w: news.defaultRotation.w,
        duration: 0.7,
        ease: Power3,
      })
      gsap.to(news.position, {
        x: news.defaultPosition.x,
        y: news.defaultPosition.y,
        z: news.defaultPosition.z,
        duration: 0.7,
        ease: Power3,
        onComplete: () => {
          this.isHolding = false
        },
      })
    }
  }

  endCutscene = () => {
    phoneSound(this.phone, 3)
    gsap.to(this.camera.rotation, {
      x: -0.31,
      y: -0.99,
      z: -0.265,
      duration: 1.2,
      delay: 0.3,
      ease: Power3,
      onComplete: () => {
        document.querySelector('.canvas-container').style.opacity = 0

        setTimeout(() => {
          // this.$nuxt.$router.push('/question')
          window.location.href = '/question'

          this.stopMedias()
        }, 12000)
      },
    })
  }

  initModels() {
    this.targetableObjects = new THREE.Object3D()
    this.objectsList = []
    this.TVs = []
    this.animationMixers = []
    const matcapTexture = new THREE.TextureLoader().load(
      'textures/7A7A7A_D0D0D0_BCBCBC_B4B4B4-512px.png'
    )
    matcapTexture.encoding = THREE.sRGBEncoding

    this.office = new Model({
      scene: this.scene,
      src: 'office/office',
      loadingManager: this.manager,
    })
    this.animationMixers.push(this.office.mixer)
    this.scene.add(this.office.container)

    this.fan = new Model({
      scene: this.scene,
      src: 'fan',
      loadingManager: this.manager,
      audioSrc: 'sounds/fan.ogg',
      audioVolume: 3,
      listener: this.listener,
    })
    this.animationMixers.push(this.fan.mixer)
    this.scene.add(this.fan.container)

    this.clock = new Model({
      scene: this.scene,
      src: 'clock',
      loadingManager: this.manager,
      listener: this.listener,
    })
    this.animationMixers.push(this.clock.mixer)
    this.scene.add(this.clock.container)

    this.cat = new Model({
      scene: this.scene,
      src: 'cat',
      loadingManager: this.manager,
      listener: this.listener,
    })
    this.animationMixers.push(this.cat.mixer)
    this.scene.add(this.cat.container)

    this.phone = new Model({
      scene: this.scene,
      src: 'phone',
      loadingManager: this.manager,
      audioSrc: 'sounds/phone/phone1.mp3',
      audioVolume: 1,
      isNotPositional: true,
      autoPlay: false,
      listener: this.listener,
    })
    this.scene.add(this.phone.container)

    this.radio = new Model({
      scene: this.scene,
      src: 'radio',
      loadingManager: this.manager,
      audioSrc: 'sounds/radio/extrait1/1.mp3',
      audioVolume: 3,
      listener: this.listener,
      action: this.radioAction,
    })
    this.objectsList.push(this.radio)
    this.targetableObjects.add(this.radio.container)

    this.TV1 = new Model({
      src: 'TV-1',
      loadingManager: this.manager,
      audioSrc: 'videos/TV/Film.mp4',
      audioVolume: 2,
      listener: this.listener,
      videoSrc: 'videos/TV/Film.mp4',
      videoContainer: 'TV-1-Screen',
      camPos: new THREE.Vector3(8, 5, 20),
      action: this.TVSwitch,
      index: 1,
      card: 'cardMedia6',
    })
    this.objectsList.push(this.TV1)
    this.TVs.push(this.TV1)
    this.targetableObjects.add(this.TV1.container)

    this.TV2 = new Model({
      src: 'TV-2',
      loadingManager: this.manager,
      audioSrc: 'videos/TV/Interview1.mp4',
      audioVolume: 2,
      listener: this.listener,
      videoSrc: 'videos/TV/Interview1.mp4',
      videoContainer: 'TV-2-Screen',
      camPos: new THREE.Vector3(11, 3, 5),
      action: this.TVSwitch,
      index: 2,
      card: 'cardMedia7',
    })
    this.objectsList.push(this.TV2)
    this.TVs.push(this.TV2)
    this.targetableObjects.add(this.TV2.container)

    this.TV3 = new Model({
      src: 'TV-3',
      loadingManager: this.manager,
      audioSrc: 'videos/TV/Divers.mp4',
      audioVolume: 2,
      listener: this.listener,
      videoSrc: 'videos/TV/Divers.mp4',
      videoContainer: 'TV-3-Screen',
      camPos: new THREE.Vector3(13, 5, -6),
      action: this.TVSwitch,
      index: 3,
      card: 'cardMedia7',
    })
    this.objectsList.push(this.TV3)
    this.TVs.push(this.TV3)
    this.targetableObjects.add(this.TV3.container)

    this.TV4 = new Model({
      src: 'TV-4',
      loadingManager: this.manager,
      audioSrc: 'videos/TV/JT.mp4',
      audioVolume: 2,
      listener: this.listener,
      videoSrc: 'videos/TV/JT.mp4',
      videoContainer: 'TV-4-Screen',
      camPos: new THREE.Vector3(10, 14.7, 15),
      action: this.TVSwitch,
      index: 4,
      card: 'cardMedia2',
    })
    this.objectsList.push(this.TV4)
    this.TVs.push(this.TV4)
    this.targetableObjects.add(this.TV4.container)

    this.TV5 = new Model({
      src: 'TV-5',
      loadingManager: this.manager,
      audioSrc: 'videos/TV/Interview2.mp4',
      audioVolume: 2,
      listener: this.listener,
      videoSrc: 'videos/TV/Interview2.mp4',
      videoContainer: 'TV-5-Screen',
      camPos: new THREE.Vector3(17, 12, 5),
      card: 'cardMedia7',
      action: this.TVSwitch,
      index: 5,
    })
    this.objectsList.push(this.TV5)
    this.TVs.push(this.TV5)
    this.targetableObjects.add(this.TV5.container)

    this.TV6 = new Model({
      src: 'TV-6',
      loadingManager: this.manager,
      audioSrc: 'videos/TV/Documentaire.mp4',
      audioVolume: 2,
      listener: this.listener,
      videoSrc: 'videos/TV/Documentaire.mp4',
      videoContainer: 'TV-6-Screen',
      camPos: new THREE.Vector3(15, 16, -3),
      action: this.TVSwitch,
      index: 6,
      card: 'cardMedia9',
    })
    this.objectsList.push(this.TV6)
    this.TVs.push(this.TV6)
    this.targetableObjects.add(this.TV6.container)

    this.newsTarget = new Model({
      src: 'newsTarget',
      loadingManager: this.manager,
      camPos: new THREE.Vector3(-13, 7, 12),
      action: this.holdPapers,
    })
    this.newsTarget.container.visible = false
    this.objectsList.push(this.newsTarget)
    this.targetableObjects.add(this.newsTarget.container)

    this.newspapers = new Model({
      src: 'newspapers',
      loadingManager: this.manager,
      addDefaultPosition: true,
    })
    this.objectsList.push(this.newspapers)
    this.targetableObjects.add(this.newspapers.container)

    this.PC1 = new Model({
      src: 'PC-1',
      videoContainer: 'PC-1-Screen',
      loadingManager: this.manager,
    })

    this.objectsList.push(this.PC1)
    this.targetableObjects.add(this.PC1.container)

    this.PC2 = new Model({
      src: 'PC-2',
      videoContainer: 'PC-2-Screen',
      loadingManager: this.manager,
      // // scene1: this.scene,
      // // scene2: this.scene2,
      // // camera: this.camera.position,
      // website: 'iframe/internet.html',
      website: 'iframe/twitter-2.png',
    })
    this.objectsList.push(this.PC2)
    this.targetableObjects.add(this.PC2.container)

    this.scene.add(this.targetableObjects)
  }

  initScene() {
    this.scene = new THREE.Scene()

    this.scene2 = new THREE.Scene()
  }

  initManager() {
    const currentPercent = 0

    this.loadDiv = document.querySelector('.loaderScreen')
    this.loadModels = this.loadDiv.querySelector('.loaderScreen__load')
    this.manager = new THREE.LoadingManager()

    this.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      if (document.querySelector('.loaderScreen__progressBar')) {
        document.querySelector(
          '.loaderScreen__progressBar'
        ).style.backgroundColor = '#F1EFE5'
        document.querySelector('.loaderScreen__progressBar').style.width = `${
          Math.floor((itemsLoaded / itemsTotal) * 100) +
          Math.floor((1 / itemsTotal) * currentPercent)
        }%`
      }

      if (itemsTotal === itemsLoaded) {
        this.threeClock.start()
        setTimeout(() => {
          this.isLoaded = true
        }, 1200)
      }
    }
  }

  initLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.8)
    this.scene.add(ambient)
    const pointLight = new THREE.PointLight(0x00ffab, 0.4, 100)
    pointLight.position.set(10, 10, 10)
    this.scene.add(pointLight)

    // const sphereSize = 1
    // const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize)
    // this.scene.add(pointLightHelper)
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      1,
      1000
    )
    this.camera.position.x = 0
    this.camera.position.y = 10
    this.camera.position.z = -11
    this.camera.rotation.x = -0.9

    this.camera.updateProjectionMatrix()

    this.holdObject = new THREE.Object3D()
    this.holdObject.position.set(0, 0, -4)
    this.scene.add(this.holdObject)
    this.holdObject.parent = this.camera
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(this.background, 1)
    this.canvas = this.renderer.domElement

    // Set up post processing
    // Create a render target that holds a depthTexture so we can use it in the outline pass
    // See: https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderTarget.depthBuffer
    const depthTexture = new THREE.DepthTexture()
    const renderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight,
      {
        depthBuffer: true,
      }
    )
    renderTarget.depthTexture = depthTexture

    // Initial render pass.
    this.composer = new EffectComposer(this.renderer, renderTarget)
    const pass = new RenderPass(this.scene, this.camera)
    this.composer.addPass(pass)

    // Outline pass.
    const customOutline = new CustomOutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      this.scene,
      this.camera
    )
    this.composer.addPass(customOutline)

    // Antialias pass.
    const effectFXAA = new ShaderPass(FXAAShader)
    effectFXAA.uniforms.resolution.value.set(
      1 / window.innerWidth,
      1 / window.innerHeight
    )
    this.composer.addPass(effectFXAA)

    // init renderer2 for iframe and scene2
    this.renderer2 = new CSS3DRenderer()
    this.renderer2.setSize(window.innerWidth, window.innerHeight)
    this.renderer2.domElement.style.position = 'absolute'
    this.renderer2.domElement.style.zIndex = 5
    this.renderer2.domElement.style.top = 0
    this.root.appendChild(this.renderer2.domElement)
  }

  setControls() {
    this.controls = new PointerLockControls(
      this.camera,
      this.renderer.domElement
    )
    this.controls.pointerSpeed = 0.25
    this.controls.smooth = true
    const blocker = document.getElementById('tuto-container')

    blocker.addEventListener('click', () => this.controls.lock())

    this.controls.addEventListener('lock', () => {
      if (blocker.getAttribute('class') !== 'active') {
        blocker.style.display = 'none'
        blocker.style.opacity = '0'
      }
    })

    this.controls.addEventListener('unlock', () => {
      blocker.style.display = 'block'
      blocker.style.opacity = '1'
    })
    this.scene.add(this.controls.getObject())
  }

  playMedias = () => {
    setTimeout(() => {
      this.controls.lock()
    }, 3000)
    this.objectsList.forEach((element) => {
      if (element.sound && element.autoPlay !== false) {
        element.sound.play()
      }
      if (element.video && element.autoPlay !== false) {
        element.video.play()
      }
    })
    setTimeout(() => {
      phoneSound(this.phone, 0)
      // this.animatedPhone = true
    }, 60000)
    setTimeout(() => {
      phoneSound(this.phone, 1)
    }, 120000)
    setTimeout(() => {
      phoneSound(this.phone, 2)
    }, 150000)
    setTimeout(() => {
      this.endCutscene()
    }, 170000) // 4 min = 240000
  }

  stopMedias() {
    this.objectsList.forEach((element) => {
      if (element.sound) {
        element.sound.stop()
      }
      if (element.video) {
        element.video.pause()
      }
    })
    this.backgroundNoise.stop()
  }

  lowVolume = (target) => {
    this.objectsList.forEach((element) => {
      if (element.sound && element.src !== target.src) {
        element.sound.setVolume(0.3)
      }
    })
  }

  highVolume = () => {
    this.objectsList.forEach((element) => {
      if (element.sound) {
        element.sound.setVolume(element.audioVolume)
      }
    })
  }

  zoomCamera = () => {
    if (event.deltaY < 0 && !this.isZoomed) {
      if (this.currentTarget.src === 'newsTarget') this.papersInspection = true

      document.querySelector('.focus').style.opacity = 1
      if (!this.papersInspection) this.lowVolume(this.currentTarget)

      if (this.currentTarget.camPos !== undefined) {
        gsap.to(this.camera.position, {
          x: this.currentTarget.camPos.x,
          y: this.currentTarget.camPos.y,
          z: this.currentTarget.camPos.z,
          duration: 1,
          ease: Power3,
          onComplete: () => {
            this.isZoomed = true
            this.TVIndex = this.currentTarget.tvIndex
            window.addEventListener('click', this.currentAction)
          },
        })
      } else if (!this.papersInspection) {
        gsap.to(this.camera, {
          fov: 30,
          duration: 1,
          ease: Power3,
          onUpdate: () => {
            this.controls.getObject().updateProjectionMatrix()
          },
          onComplete: () => {
            this.isZoomed = true
            window.addEventListener('click', this.currentAction)
          },
        })
      }
    } else if (event.deltaY > 0 && this.isZoomed) {
      this.highVolume(this.currentTarget)

      if (
        this.currentTarget.camPos !== undefined ||
        this.camera.position.x !== this.cameraDefaultPosition.x
      ) {
        gsap.to(this.camera.position, {
          x: this.cameraDefaultPosition.x,
          y: this.cameraDefaultPosition.y,
          z: this.cameraDefaultPosition.z,
          duration: 1,
          onComplete: () => {
            this.isZoomed = false
            this.papersInspection = false
            window.removeEventListener('click', this.currentAction)
            this.currentAction = undefined
          },
        })
      } else if (!this.papersInspection) {
        gsap.to(this.camera, {
          fov: 65,
          duration: 1,
          onUpdate: () => {
            this.controls.getObject().updateProjectionMatrix()
          },
          onComplete: () => {
            this.isZoomed = false
            window.removeEventListener('click', this.currentAction)
            this.currentAction = undefined
          },
        })
      }
      document.querySelector('.focus').style.opacity = 0
    }
  }

  update() {
    requestAnimationFrame(() => this.update())

    this.composer.render()

    this.renderer2.render(this.scene2, this.camera)

    if (this.isLoaded) {
      const delta = this.threeClock.getDelta()
      this.fan.mixer.update(delta)
      this.clock.mixer.update(delta)
      this.cat.mixer.update(delta)

      if (this.animatedPhone) {
        this.phone.mixer.update(delta)
      }

      if (this.enabledRaycast) {
        this.raycaster.setFromCamera(new THREE.Vector2(), this.camera)

        let intersects = []
        if (this.papersInspection) {
          intersects = this.raycaster.intersectObjects(
            this.newspapers.container.children
          )
        } else {
          intersects = this.raycaster.intersectObjects(
            this.targetableObjects.children
          )
        }

        if (intersects.length > 0) {
          document
            .querySelector('.cursor-circle')
            .classList.add('cursor-circle-focus')
          const intersect = intersects[0].object

          const wholeObject = this.objectsList.find(
            (element) => element.src === intersect.objectName
          )

          if (this.papersInspection) this.currentTarget = intersect
          else this.currentTarget = wholeObject

          if (wholeObject.action) this.currentAction = wholeObject.action

          document.addEventListener('wheel', this.zoomCamera)
        } else {
          document
            .querySelector('.cursor-circle')
            .classList.remove('cursor-circle-focus')
          if (!this.papersInspection)
            document.removeEventListener('wheel', this.zoomCamera)
        }
      }
    }
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.updateProjectionMatrix()
  }

  bindEvents() {
    window.addEventListener('resize', () => this.onResize())
  }
}

// To call our class as a function
const sceneInit = (args) => new SceneInit(args)

export default sceneInit
