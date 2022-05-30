import * as THREE from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

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
    action,
	scene2,
	scene1,
	iframeId,
	website,
	camera
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
    this.action = action
	this.scene2 = scene2
	this.scene1 = scene1
	this.iframeId = iframeId
	this.website = website
	this.camera = camera
    this.init()
  }

  init() {
    this.loadModel()
  }

  initSound(target) {
    this.sound = new THREE.PositionalAudio(this.listener)
    this.sound.name = 'PositionalAudio'
    const audioLoader = new THREE.AudioLoader()
    audioLoader.load(`${this.audioSrc}`, (buffer) => {
      this.sound.setLoop(true)
      this.sound.setBuffer(buffer)
      this.sound.setVolume(this.audioVolume)
      this.sound.setRefDistance(this.audioDistance)
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
      side: THREE.DoubleSide
    })
    target.material = videoMaterial
    texture.flipY = false
    this.video = target.material.map.image

	console.log('salut videoTexture');
  }

  initIframe(target) {

	// const plane = this.createPlane(target);
    // this.scene1.add(plane);
    // const cssObject = this.createCssObject();
    // this.scene2.add(cssObject);

	// ESSAI 2
	// create the plane mesh
	const material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, color: 0x049ef4});
	const geometry = new THREE.PlaneGeometry();
	const planeMesh = new THREE.Mesh( geometry, material );
	planeMesh.name = 'meshTV';
	planeMesh.position.copy( target.position );
	planeMesh.rotation.copy( target.rotation );
	planeMesh.scale.copy( target.scale );
	target.material = material
	// add it to the WebGL scene
	this.scene1.add(planeMesh);

	// create the dom Element
	// const element = document.createElement( 'iframe' );
	// element.src = 'http://handivity.robinleroux.fr/';
	// element.style.width = '50%';
	// element.style.height = '30%';
	// element.style.border = '0px';
	const html = [
		'<iframe id="iframe" src="iframe/internet.html" width="800px" height=500px">',
		'</iframe>',
	  ].join('\n');
	const div = document.createElement('div');
	div.innerHTML = html;
	// create the object3d for this element
	const cssObject = new CSS3DObject( div );
	cssObject.name = 'iframeTV';
	cssObject.flipY = false;
	// we reference the same position and rotation 
	cssObject.rotation.copy(  target.parent.rotation );
	cssObject.quaternion.copy(  target.parent.quaternion );
	cssObject.position.copy( target.parent.position );
	cssObject.scale.copy(  target.parent.scale );
	cssObject.lookAt(this.camera)
	console.log(cssObject.position)
	// add it to the css scene
	this.scene2.add(cssObject);
	cssObject.element.onclick = function() {
		console.log("element clicked!");
	}

	console.log('iframe ta mere')

  }

  initImage(target) {

	const texture = new THREE.TextureLoader();
	const imageTexture = texture.load(this.website);
	// create the plane mesh
	const material = new THREE.MeshStandardMaterial({
		side: THREE.DoubleSide,
		map: imageTexture
	});
	// const geometry = new THREE.PlaneGeometry();
	// const planeMesh = new THREE.Mesh( geometry, material );
	// planeMesh.name = 'meshTV';
	// planeMesh.position.copy( target.position );
	// planeMesh.rotation.copy( target.rotation );
	// planeMesh.scale.copy( target.scale );
	// target.material = imageTexture
    imageTexture.flipY = false
    // this.website = target.material.map.image
	target.material = material
	// add it to the WebGL scene
	// target.add(planeMesh);

	console.log('image ta mere')

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

      gltf.scene.traverse((child) => {
        child.objectName = this.src
        if (this.videoSrc && child.name === this.videoContainer) {
          this.initVideoTexture(child)
        }
        if (this.scene1 && this.scene2 && this.camera && child.name === this.videoContainer) {
          this.initIframe(child)
		  console.log(child);
        }
        if (this.website && child.name === this.videoContainer) {
          this.initImage(child)
		//   console.log(child);
        }
        if (this.material && child.name !== this.videoContainer) {
          child.material = this.material
        }
      })

      //   this.scene.add(gltf.scene)
      if (this.audioSrc) this.initSound(gltf.scene.children[0])
      this.container.add(gltf.scene)
    })
  }
}
