/* jshint sub:true */
import * as THREE from 'three'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'

import { gsap, Power3 } from 'gsap'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
import { CustomOutlinePass } from './shaders/CustomOutlinePass.js'
import Model from './Model'
import { changeFrequence } from './actions/radioAction'

class SceneInit {
  constructor({ rootEl }) {
    this.canvas = document.createElement('canvas')
    this.root = rootEl
    this.background = 0x000
    this.raycaster = new THREE.Raycaster()
    this.cameraDefaultPosition = new THREE.Vector3(0, 12, -5)

    this.enabledRaycast = false
    this.isLoaded = false
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
    setTimeout(() => {
      this.initModels()
    }, 5000)
    this.root.appendChild(this.canvas)
  }

  initAudio() {
    this.listener = new THREE.AudioListener()
    this.camera.add(this.listener)
  }

  radioAction = () => {
    changeFrequence(this.radio)
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

    // const previewMaterial = new THREE.MeshMatcapMaterial({
    //   matcap: matcapTexture,
    //   side: THREE.DoubleSide,
    // })

    this.office = new Model({
      src: 'scene',
      loadingManager: this.manager,
    })
    this.office.container.position.set(0, 6, -30)
    this.office.container.rotation.y = Math.PI
    this.scene.add(this.office.container)

    // this.radio = new Model({
    //   src: 'radio',
    //   loadingManager: this.manager,
    //   audioSrc: 'videos/VideoJT.mp4',
    //   audioVolume: 2,
    //   listener: this.listener,
    //   action: this.radioAction,
    // })
    // this.objectsList.push(this.radio)
    // this.targetableObjects.add(this.radio.container)
    // console.log(this.radio.container)
    // this.TV1 = new Model({
    //   src: 'TV1',
    //   loadingManager: this.manager,
    //   audioSrc: 'videos/VideoJT.mp4',
    //   audioVolume: 2,
    //   listener: this.listener,
    //   videoSrc: 'videos/VideoJT.mp4',
    //   videoContainer: 'Screen',
    //   material: previewMaterial,
    //   action: this.TV1Action
    // })
    // this.objectsList.push(this.TV1)
    // this.targetableObjects.add(this.TV1.container)
    // this.TV2 = new Model({
    //   src: 'TV2',
    //   loadingManager: this.manager,
    //   audioSrc: 'videos/VideoInterview1.mp4',
    //   audioVolume: 2,
    //   listener: this.listener,
    //   videoSrc: 'videos/VideoInterview1.mp4',
    //   videoContainer: 'Screen',
    //   material: previewMaterial
    // })
    // this.objectsList.push(this.TV2)
    // this.targetableObjects.add(this.TV2.container)
    // this.TV3 = new Model({
    //   src: 'TV3',
    //   loadingManager: this.manager,
    //   audioSrc: 'videos/VideoInterview2.mp4',
    //   audioVolume: 1,
    //   listener: this.listener,
    //   videoSrc: 'videos/VideoInterview2.mp4',
    //   videoContainer: 'Screen3',
    //   material: previewMaterial
    // })
    // this.targetableObjects.add(this.TV3.container)
    // this.objectsList.push(this.TV3)
    // this.TV4 = new Model({
    //   src: 'TV4',
    //   loadingManager: this.manager,
    //   audioSrc: 'videos/Documentaire.mp4',
    //   audioVolume: 1,
    //   listener: this.listener,
    //   videoSrc: 'videos/Documentaire.mp4',
    //   videoContainer: 'Screen2',
    //   material: previewMaterial
    // })
    // this.targetableObjects.add(this.TV4.container)
    // this.objectsList.push(this.TV4)
    // this.TV5 = new Model({
    //   src: 'TV5',
    //   loadingManager: this.manager,
    //   audioSrc: 'videos/VideoInterview2.mp4',
    //   audioVolume: 1,
    //   listener: this.listener,
    //   videoSrc: 'videos/VideoInterview2.mp4',
    //   videoContainer: 'Screen5',
    //   material: previewMaterial
    // })
    // this.targetableObjects.add(this.TV5.container)

    // this.objectsList.push(this.TV5)
    this.scene.add(this.targetableObjects)
  }

  initScene() {
    this.scene = new THREE.Scene()
  }

  initManager() {
    // const currentPercent = 0

    this.loadDiv = document.querySelector('.loaderScreen')
    this.loadModels = this.loadDiv.querySelector('.loaderScreen__load')
    this.progressBar = this.loadDiv.querySelector('.loaderScreen__progress')
    this.manager = new THREE.LoadingManager()

    this.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      if (Math.floor(itemsLoaded / itemsTotal) * 100 === 100) {
        this.isLoaded = true
        this.progressBar.style.width = '23%'
        setTimeout(() => {
          this.progressBar.style.width = '47%'
          setTimeout(() => {
            this.progressBar.style.width = '75%'
            setTimeout(() => {
              this.progressBar.style.width = '100%'
              setTimeout(() => {
                this.loadDiv
                  .querySelector('.loaderScreen__progressBar')
                  .classList.add('none-opacity')
                setTimeout(() => {
                  this.loadDiv
                    .querySelector('.loaderScreen__progressBar')
                    .remove()
                  document.querySelector('.startButton').style.display = 'block'
                }, 2000)
              }, 500)
            }, 2000)
          }, 1000)
        }, 2003)
      }

      if (itemsTotal === itemsLoaded) {
        setTimeout(() => {
          // this.loadModels.style.opacity = 0
        }, 1000)
      }
    }
  }

  initLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 1)
    this.scene.add(ambient)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    this.scene.add(directionalLight)
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
    console.log(renderTarget)

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
  }

  setControls() {
    this.controls = new PointerLockControls(
      this.camera,
      this.renderer.domElement
    )
    this.controls.pointerSpeed = 0.5
    this.controls.smooth = true
    // this.controls.smoothspeed = 0.95
    // const blocker = document.getElementById('blocker')

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

  playMedias() {
    this.controls.lock()
    setTimeout(() => {
      this.loadDiv.style.opacity = 0
      setTimeout(() => {
        this.loadDiv.remove()
      }, 550)
    }, 1000)
    this.objectsList.forEach((element) => {
      if (element.sound) {
        element.sound.play()
      }
      if (element.video) {
        element.video.play()
      }
    })
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
  }

  zoomCamera = () => {
    if (event.deltaY < 0 && !this.isZoomed) {
      document.querySelector('.focus').style.opacity = 1

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
    } else if (event.deltaY > 0 && this.isZoomed) {
      document.querySelector('.focus').style.opacity = 0
      gsap.to(this.camera, {
        fov: 65,
        duration: 1,
        onUpdate: () => {
          this.controls.getObject().updateProjectionMatrix()
        },
        onComplete: () => {
          this.isZoomed = false
          window.removeEventListener('click', this.currentAction)
        },
      })
    }
  }

  update() {
    requestAnimationFrame(() => this.update())

    // const time = this.clock.getElapsedTime()

    // this.camera.position.y += Math.sin(time*100) * 2

    // this.renderer.render(this.scene, this.camera)

    this.composer.render()

    if (this.enabledRaycast && this.isLoaded) {
      this.raycaster.setFromCamera(new THREE.Vector2(), this.camera)

      // calculate objects intersecting the picking ray
      const intersects = this.raycaster.intersectObjects(
        this.targetableObjects.children
      )

      if (intersects.length > 0) {
        const intersect = intersects[0].object

        const wholeObject = this.objectsList.find(
          (element) => element.src === intersect.objectName
        )

        this.currentAction = wholeObject.action
        document.addEventListener('wheel', this.zoomCamera(wholeObject))
      }
    } else {
      document.removeEventListener('wheel', this.zoomCamera)
    }
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
}

// To call our class as a function
const sceneInit = (args) => new SceneInit(args)

export default sceneInit
