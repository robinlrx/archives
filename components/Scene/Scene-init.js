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
    this.enabledRaycast = true
    this.isZoomed = false
    this.currentAction = undefined
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
    this.root.appendChild(this.canvas)
  }

  initAudio() {
    this.listener = new THREE.AudioListener()
    this.camera.add(this.listener)
  }

  tasseAction() {
    console.log('aaaaa')
  }

  TV1Action() {
    console.log('sale con')
  }

  initModels() {
    this.targetableObjects = new THREE.Object3D()
    this.objectsList = []
    const matcapTexture = new THREE.TextureLoader().load(
      'textures/7A7A7A_D0D0D0_BCBCBC_B4B4B4-512px.png'
    )
    matcapTexture.encoding = THREE.sRGBEncoding

    const previewMaterial = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture,
      side: THREE.DoubleSide
    })
    this.tasse = new Model({
      src: 'tasse',
      loadingManager: this.manager,
      action: this.tasseAction
    })
    this.objectsList.push(this.tasse)
    this.targetableObjects.add(this.tasse.container)
    this.office = new Model({
      src: 'office',
      loadingManager: this.manager,
      material: previewMaterial
    })
    this.scene.add(this.office.container)
    this.TV1 = new Model({
      src: 'TV1',
      loadingManager: this.manager,
      audioSrc: 'videos/france2-proces.mp4',
      audioVolume: 3,
      listener: this.listener,
      videoSrc: 'videos/france2-proces.mp4',
      videoContainer: 'Screen',
      material: previewMaterial,
      action: this.TV1Action
    })
    this.objectsList.push(this.TV1)
    this.targetableObjects.add(this.TV1.container)
    this.scene.add(this.targetableObjects)
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

    if (this.enabledRaycast) {
      this.raycaster.setFromCamera(new THREE.Vector2(), this.camera)

      // calculate objects intersecting the picking ray
      const intersects = this.raycaster.intersectObjects(
        this.targetableObjects.children
      )

      if (intersects.length > 0) {
        const intersect = intersects[0].object
        console.log(intersect)
        this.currentAction = this.objectsList.find(
          (element) => element.src === intersect.name
        ).action

        window.addEventListener('click', this.currentAction)

        if (!this.isZoomed) {
          gsap.to(this.camera, {
            fov: 30,
            duration: 1,
            ease: Power3,
            onUpdate: () => {
              this.controls.getObject().updateProjectionMatrix()
            },
            onComplete: () => {
              this.isZoomed = true
            }
          })
        }
      } else {
        window.removeEventListener('click', this.currentAction)
        gsap.to(this.camera, {
          fov: 65,
          duration: 1,
          onUpdate: () => {
            this.controls.getObject().updateProjectionMatrix()
          },
          onComplete: () => {
            this.isZoomed = false
          }
        })
      }
      // const outlineMaterial1 = new THREE.MeshBasicMaterial({
      //   color: 0xff0000,
      //   side: THREE.BackSide
      // })
      // const outlineMesh1 = new THREE.Mesh(
      //   intersect.geometry,
      //   outlineMaterial1
      // )
      // outlineMesh1.position.set(intersect.position)
      // outlineMesh1.scale.multiplyScalar(1.05)
      // this.outlineMesh1.add(outlineMesh1)
      // console.log(outlineMesh1)
      // console.log(intersect)
      // intersects[0].object.parent.material.color.set(0xff0000)
    }
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

  // setRaycast() {
  //   document.addEventListener(
  //     'wheel',
  //     (event) => {
  //       this.raycaster.setFromCamera(new THREE.Vector2(), this.camera)
  //       const intersects = this.raycaster.intersectObject(this.tasse.container)

  //       if (intersects.length > 0) {
  //         document
  //           .querySelector('.cursor-circle')
  //           .classList.add('cursor-circle-focus')
  //         if (event.deltaY < 0 && !this.isZoomed) {
  //           gsap.to(this.controls.getObject().position, {
  //             x: 11,
  //             y: 11,
  //             z: -0.5,
  //             duration: 1.5,
  //             ease: Power3,
  //             onComplete: () => {
  //               this.isZoomed = true
  //             }
  //           })
  //         } else if (event.deltaY > 0 && this.isZoomed) {
  //           gsap.to(this.controls.getObject().position, {
  //             // fov: 30,
  //             x: this.cameraDefaultPosition.x,
  //             y: this.cameraDefaultPosition.y,
  //             z: this.cameraDefaultPosition.z,
  //             duration: 2,
  //             ease: Power3,
  //             onComplete: () => {
  //               this.isZoomed = false
  //             }
  //           })
  //         }
  //       }
  //     },
  //     false
  //   )
  // }
}

// To call our class as a function
const sceneInit = (args) => new SceneInit(args)

export default sceneInit
