import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { gsap, Power3, Power4 } from 'gsap'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
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
    this.initLights()
    this.initCamera()
    this.initRenderer()
    this.setControls()
    this.setRaycast()
    this.setBloom()

    this.root.appendChild(this.canvas)
  }

  initScene() {
    this.scene = new THREE.Scene()
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
      60,
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

  setBloom() {
    const renderScene = new RenderPass(this.scene, this.camera)

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    )
    bloomPass.threshold = this.params.bloomThreshold
    bloomPass.strength = this.params.bloomStrength
    bloomPass.radius = this.params.bloomRadius

    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(renderScene)
    this.composer.addPass(bloomPass)
  }

  update() {
    requestAnimationFrame(() => this.update())

    this.renderer.render(this.scene, this.camera)

    // if (this.isZoomed) {
    //   this.camera.lookAt(this.scene.getObjectByName('TV1').position)
    //   this.camera.updateProjectionMatrix()
    // }

    // this.controls.update()

    // this.render()
  }

  loadModel(model, callback) {
    this.loader = new GLTFLoader()

    this.loader.load(model, (gltf) => {
      if (typeof callback === 'function') {
        callback(gltf.scene)
      }

      this.scene.add(gltf.scene)
    })
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
        const intersects = this.raycaster.intersectObject(
          this.scene.getObjectByName('TV1')
        )

        if (intersects.length > 0) {
          document
            .querySelector('.cursor-circle')
            .classList.add('cursor-circle-focus')
          if (event.deltaY < 0 && !this.isZoomed) {
            gsap.to(this.controls.getObject().position, {
              // fov: 30,
              x: intersects[0].object.parent.parent.camPosition.x,
              y: intersects[0].object.parent.parent.camPosition.y,
              z: intersects[0].object.parent.parent.camPosition.z,
              duration: 1.5,
              ease: Power3,
              onComplete: () => {
                this.isZoomed = true
              }
            })
            document.addEventListener('click', () => {
              gsap.to(this.controls.getObject().position, {
                // fov: 30,
                x: this.scene.getObjectByName('TV2').parent.camPosition.x,
                y: this.scene.getObjectByName('TV2').parent.camPosition.y,
                z: this.scene.getObjectByName('TV2').parent.camPosition.z,
                duration: 1.2,
                ease: Power4,
                onComplete: () => {
                  this.isZoomed = true
                }
              })
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

	applySpacialSound(videoSound, model, playStatue) {
		// create an AudioListener and add it to the camera
		const listener = new THREE.AudioListener();
		this.camera.add( listener );
		console.log('sapcial sound')

		// create the PositionalAudio object (passing in the listener)
		const sound = new THREE.PositionalAudio( listener );

		// load a sound and set it as the PositionalAudio object's buffer
		const audioLoader = new THREE.AudioLoader();
		audioLoader.load( videoSound, function( buffer ) {
			sound.setBuffer( buffer );
			sound.setVolume(1)
			sound.setRefDistance(1);
			sound.loop = true
			sound.play();
		});

		model.add( sound );
	}
}

// To call our class as a function
const sceneInit = (args) => new SceneInit(args)

export default sceneInit
