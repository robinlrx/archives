/* jshint sub:true */
import * as THREE from 'three'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'

import { gsap, Power3 } from 'gsap'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
// import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
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
    this.clock = new THREE.Clock()

    this.enabledRaycast = true
    this.isLoaded = false
    this.isZoomed = false
    this.currentAction = undefined

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
    this.initAudio()
    // this.initModels()
    this.root.appendChild(this.canvas)
  }

  initAudio() {
    this.listener = new THREE.AudioListener()
    this.camera.add(this.listener)
  }

  initBackgroundNoise() {
    const backgroundNoise = new THREE.Audio(this.listener)
    const backgroundNoiseLoader = new THREE.AudioLoader()
    backgroundNoiseLoader.load('sounds/BACKGROUND_NOISE.mp3', (buffer) => {
      backgroundNoise.setBuffer(buffer)
      backgroundNoise.setLoop(true)
      backgroundNoise.setVolume(0.3)
      backgroundNoise.play()
    })
  }

  radioAction = () => {
    changeFrequence(this.radio)
  }

  TV1Action() {
    console.log('sale con')
  }

  PC2Action() {
	// this.controls.unlock();
	console.log('hahahahaha')
	// const iframe = document.getElementById('iframe');
	// console.log('iframe:', iframe)
	// const a = iframe.contentWindow;
   	// console.log(a);
  	// a.scrollBy(0, 100);
	// iframe.scrollBy(0, 100);
	document.addEventListener('dblclick', () => {
		// this.controls.lock();
		console.log('yess man')
	});
	
  }

  initModels() {
    this.targetableObjects = new THREE.Object3D()
    this.objectsList = []
    this.animationMixers = []
    const matcapTexture = new THREE.TextureLoader().load(
      'textures/7A7A7A_D0D0D0_BCBCBC_B4B4B4-512px.png'
    )
    matcapTexture.encoding = THREE.sRGBEncoding

    // const previewMaterial = new THREE.MeshMatcapMaterial({
    //   matcap: matcapTexture,
    //   side: THREE.DoubleSide,
    // })

    this.office = new Model({
      scene: this.scene,
      src: 'office',
      loadingManager: this.manager,
    })
    this.animationMixers.push(this.office.mixer)
    this.scene.add(this.office.container)

    this.fan = new Model({
      scene: this.scene,
      src: 'fan',
      loadingManager: this.manager,
    })
    this.animationMixers.push(this.fan.mixer)
    this.scene.add(this.fan.container)

    this.radio = new Model({
      scene: this.scene,
      src: 'radio',
      loadingManager: this.manager,
      audioSrc: 'sounds/radio/extrait1/1.mp3',
      audioVolume: 1,
      listener: this.listener,
      action: this.radioAction,
    })
    this.objectsList.push(this.radio)
    this.targetableObjects.add(this.radio.container)

    this.TV1 = new Model({
      src: 'TV-1',
      loadingManager: this.manager,
      audioSrc: 'videos/VideoJT.mp4',
      audioVolume: 2,
      listener: this.listener,
      videoSrc: 'videos/VideoJT.mp4',
      videoContainer: 'TV-1-Screen',
    })
    this.objectsList.push(this.TV1)
    this.targetableObjects.add(this.TV1.container)

    this.TV2 = new Model({
      src: 'TV-2',
      loadingManager: this.manager,
      audioSrc: 'videos/VideoInterview1.mp4',
      audioVolume: 2,
      listener: this.listener,
      videoSrc: 'videos/VideoInterview1.mp4',
      videoContainer: 'TV-2-Screen',
    })
    this.objectsList.push(this.TV2)
    this.targetableObjects.add(this.TV2.container)

    this.TV3 = new Model({
      src: 'TV-3',
      loadingManager: this.manager,
      audioSrc: 'videos/VideoInterview2.mp4',
      audioVolume: 2,
      listener: this.listener,
      videoSrc: 'videos/VideoInterview2.mp4',
      videoContainer: 'TV-3-Screen',
    })
    this.objectsList.push(this.TV3)
    this.targetableObjects.add(this.TV3.container)

    this.TV4 = new Model({
      src: 'TV-4',
      loadingManager: this.manager,
      audioSrc: 'videos/france2-proces.mp4',
      audioVolume: 2,
      listener: this.listener,
      videoSrc: 'videos/france2-proces.mp4',
      videoContainer: 'TV-4-Screen',
    })
    this.objectsList.push(this.TV4)
    this.targetableObjects.add(this.TV4.container)

    this.TV5 = new Model({
      src: 'TV-5',
      loadingManager: this.manager,
      audioSrc: 'videos/france2-lucet.mp4',
      audioVolume: 2,
      listener: this.listener,
      videoSrc: 'videos/france2-lucet.mp4',
      videoContainer: 'TV-5-Screen',
    })
    this.objectsList.push(this.TV5)
    this.targetableObjects.add(this.TV5.container)

    this.TV6 = new Model({
      src: 'TV-6',
      loadingManager: this.manager,
      audioSrc: 'videos/Documentaire.mp4',
      audioVolume: 2,
      listener: this.listener,
      videoSrc: 'videos/Documentaire.mp4',
      videoContainer: 'TV-6-Screen',
    })
    this.objectsList.push(this.TV6)
    this.targetableObjects.add(this.TV6.container)

	this.PC2 = new Model({
		src: 'PC-2',
		loadingManager: this.manager,
		scene1: this.scene,
		scene2: this.scene2,
		camera: this.camera.position,
		// website: 'iframe/internet.html',
		website: 'https://www.youtube.com/embed/o_jWNAh_aQA',
		videoContainer: 'PC-2-Screen',
		action: this.PC2Action,
	})
	this.objectsList.push(this.PC2)
	this.targetableObjects.add(this.PC2.container)
	console.log('this.PC2', this.PC2)

    this.scene.add(this.targetableObjects)
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
  }

  initScene() {
    this.scene = new THREE.Scene()
	this.scene2 = new THREE.Scene();
  }

  initManager() {
    const currentPercent = 0

    this.loadDiv = document.querySelector('.loaderScreen')
    this.loadModels = this.loadDiv.querySelector('.loaderScreen__load')
    this.manager = new THREE.LoadingManager()

    this.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      if (document.querySelector('.loaderScreen__progressBar'))
        document.querySelector(
          '.loaderScreen__progressBar'
        ).style.backgroundColor = '#F1EFE5'
      document.querySelector('.loaderScreen__progressBar').style.width = `${
        Math.floor((itemsLoaded / itemsTotal) * 100) +
        Math.floor((1 / itemsTotal) * currentPercent)
      }%`

      if (itemsTotal === itemsLoaded) {
        this.isLoaded = true
		// init renderer2 for iframe and scene2
		this.renderer2 = new CSS3DRenderer();
		this.renderer2.setSize( window.innerWidth, window.innerHeight );
		this.renderer2.domElement.style.position = 'absolute';
		// this.renderer2.domElement.style.zIndex = 5;
		this.renderer2.domElement.style.top = 0;
		this.root.appendChild( this.renderer2.domElement );
        setTimeout(() => {
          document.querySelector('.wakeUpButton').classList.add('active-button')
        }, 1200)
      }
    }
  }

  initLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 1)
    this.scene.add(ambient)
    const pointLight = new THREE.PointLight(0x00ffab, 1, 100)
    pointLight.position.set(10, 10, 10)
    this.scene.add(pointLight)

    const sphereSize = 1
    const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize)
    this.scene.add(pointLightHelper)
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1,
      1000
    )
    this.camera.position.x = 0
    this.camera.position.y = 10
    this.camera.position.z = -11
    this.camera.rotation.x = -0.9
    // this.camera.position.x = 0
    // this.camera.position.y = 12
    // this.camera.position.z = -5

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
	// this.renderer2 = new CSS3DRenderer();
	// this.renderer2.setSize( window.innerWidth, window.innerHeight );
	// this.renderer2.domElement.style.position = 'absolute';
	// // this.renderer2.domElement.style.zIndex = 5;
	// this.renderer2.domElement.style.top = 0;
	// this.root.appendChild( this.renderer2.domElement );

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

	// control2 for scene2
	// this.controls2 = new TrackballControls( this.camera, this.renderer2.domElement );
  }

  playMedias() {
    setTimeout(() => {
      this.controls.lock()
    }, 3000)
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

    // const delta = this.clock.getDelta()
    // if (this.animationMixers) {
    //   this.animationMixers.forEach((mixer) => {
    //     mixer.update(delta)
    //   })
    // }

    this.composer.render()

    if (this.enabledRaycast && this.isLoaded) {
      this.raycaster.setFromCamera(new THREE.Vector2(), this.camera)

	  this.renderer2.render( this.scene2, this.camera );

      // calculate objects intersecting the picking ray
      const intersects = this.raycaster.intersectObjects(
        this.targetableObjects.children
      )

      if (intersects.length > 0) {
        document
          .querySelector('.cursor-circle')
          .classList.add('cursor-circle-focus')
        const intersect = intersects[0].object

        const wholeObject = this.objectsList.find(
          (element) => element.src === intersect.objectName
        )
        console.log(intersect.objectName)

        this.currentAction = wholeObject.action
        document.addEventListener('wheel', this.zoomCamera)
      } else {
        document
          .querySelector('.cursor-circle')
          .classList.remove('cursor-circle-focus')
        document.removeEventListener('wheel', this.zoomCamera)
      }
    }
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.renderer.setSize(window.innerWidth, window.innerHeight)
	this.renderer2.setSize(window.innerWidth, window.innerHeight)
    this.camera.updateProjectionMatrix()
  }

  bindEvents() {
    window.addEventListener('resize', () => this.onResize())
  }
}

// To call our class as a function
const sceneInit = (args) => new SceneInit(args)

export default sceneInit
