import * as THREE from 'three'

import { gsap, Power3 } from 'gsap'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
import Model from './Model'

class SceneInit {
  constructor({ rootEl }) {
    this.canvas = document.createElement('canvas')
    this.root = rootEl
    this.background = 0x000
    this.raycaster = new THREE.Raycaster()
    this.cameraDefaultPosition = new THREE.Vector3(0, 12, -5)
    this.params = {
      exposure: 1,
      bloomStrength: 1.5,
      bloomThreshold: 2,
      bloomRadius: 2
    }
    this.init()
    this.update()
    this.bindEvents()
  }

  init() {
    this.initScene()
    this.initManager()
    this.initLights()
    this.initCamera()
    this.initRenderer()
    this.setControls()
    this.initAudio()
    this.initModels()
    this.setRaycast()
    this.root.appendChild(this.canvas)
  }

  initAudio() {
    this.listener = new THREE.AudioListener()
    this.camera.add(this.listener)
  }

  initModels() {
    this.tasse = new Model({
      src: 'tasse',
      audioSrc: 'videos/france2-proces.mp4',
      listener: this.listener,
      loadingManager: this.manager
    })
    this.scene.add(this.tasse.container)
    this.office = new Model({
      src: 'office',
      loadingManager: this.manager,
      material: new THREE.MeshDepthMaterial({ color: 0xffffff })
    })
    this.scene.add(this.office.container)
  }

  initScene() {
    this.scene = new THREE.Scene()
  }

  initManager() {
    const currentPercent = 0

    this.loadDiv = document.querySelector('.loaderScreen')
    this.loadModels = this.loadDiv.querySelector('.loaderScreen__load')
    this.progressBar = this.loadDiv.querySelectorAll('.loaderScreen__progress')
    this.manager = new THREE.LoadingManager()

    this.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      this.progressBar.forEach((el) => {
        el.style.width = this.loadModels.innerHTML = `${
          Math.floor((itemsLoaded / itemsTotal) * 100) +
          Math.floor((1 / itemsTotal) * currentPercent)
        }%`
      })

      if (itemsTotal === itemsLoaded) {
        setTimeout(() => {
          this.loadDiv.style.opacity = 0
          setTimeout(() => {
            this.loadDiv.remove()
          }, 550)
        }, 1000)
      }
    }
  }

  initLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.9)
    // const point = new THREE.PointLight(0xcccccc, 0.1, 10)
    // const directional = new THREE.DirectionalLight(0xffffff, 0.5)

    this.scene.add(ambient)
    // this.scene.add(point)
    // this.scene.add(directional)
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      1,
      1000
    )

    this.camera.position.x = 0
    this.camera.position.y = 12
    this.camera.position.z = -5

    this.camera.updateProjectionMatrix()
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.outputEncoding = THREE.sRGBEncoding

    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(this.background, 1)

    this.canvas = this.renderer.domElement
  }

  setControls() {
    this.controls = new PointerLockControls(
      this.camera,
      this.renderer.domElement
    )
    this.controls.pointerSpeed = 0.15
    this.controls.smooth = true
    // this.controls.smoothspeed = 0.95
    // const blocker = document.getElementById('blocker')
    const instructions = document.getElementById('instructions')

    instructions.addEventListener('click', () => {
      this.controls.lock()
      this.scene.getObjectByName('Screen').material.map.image.play()
      this.scene.getObjectByName('ScreenTV2_2').material.map.image.play()
    })

    // this.controls.addEventListener('lock', () => {
    //   instructions.style.display = 'none'
    //   blocker.style.display = 'none'
    // })

    // this.controls.addEventListener('unlock', () => {
    //   blocker.style.display = 'block'
    //   instructions.style.display = ''
    // })
    this.scene.add(this.controls.getObject())
  }

  render() {
    this.camera.lookAt(this.scene.position)

    this.renderer.render(this.scene, this.camera)
  }

  update() {
    requestAnimationFrame(() => this.update())

    this.renderer.render(this.scene, this.camera)
  }

  add(model) {
    this.scene.add(model)
  }

  remove(objName) {
    const object = this.scene.getObjectByName(objName)

    if (object) {
      this.scene.remove(object)
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

  setRaycast() {
    document.addEventListener(
      'wheel',
      (event) => {
        this.raycaster.setFromCamera(new THREE.Vector2(), this.camera)
        const intersects = this.raycaster.intersectObject(this.tasse.container)

        if (intersects.length > 0) {
          document
            .querySelector('.cursor-circle')
            .classList.add('cursor-circle-focus')
          if (event.deltaY < 0 && !this.isZoomed) {
            gsap.to(this.controls.getObject().position, {
              x: 11,
              y: 11,
              z: -0.5,
              duration: 1.5,
              ease: Power3,
              onComplete: () => {
                this.isZoomed = true
              }
            })
          } else if (event.deltaY > 0 && this.isZoomed) {
            gsap.to(this.controls.getObject().position, {
              // fov: 30,
              x: this.cameraDefaultPosition.x,
              y: this.cameraDefaultPosition.y,
              z: this.cameraDefaultPosition.z,
              duration: 2,
              ease: Power3,
              onComplete: () => {
                this.isZoomed = false
              }
            })
          }
        }
      },
      false
    )
  }
}

// To call our class as a function
const sceneInit = (args) => new SceneInit(args)

export default sceneInit
