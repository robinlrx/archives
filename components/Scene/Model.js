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
	iframeId
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

//   createCssObject() {
//     const html = [
//       '<div>',
//       '<iframe src="https://handivity.robinleroux.fr/" width="50px" height="50px">',
//       '</iframe>',
//       '</div>'
//     ].join('\n');
//     const div = document.createElement('div');
//     div.innerHTML = html;
//     const cssObject = new CSS3DObject(div);
//     // cssObject.position.x = target.x;
//     // cssObject.position.y = target.y;
//     // cssObject.position.z = target.z;
//     cssObject.element.onclick = function() {
//        console.log("element clicked!");
//     }
//     return cssObject;
//   }

//   createPlane(target) {
//     const material = new THREE.MeshBasicMaterial({
//       color: 0x000000,
//       opacity: 0.0,
//       side: THREE.DoubleSide
//     });
//     const geometry = new THREE.PlaneGeometry();
//     const mesh = new THREE.Mesh(geometry, material);
// 	mesh.position.copy( target.position );
// 	mesh.rotation.copy( target.rotation );
// 	mesh.scale.copy( target.scale );
//     return mesh;
//   }

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
	target.add(planeMesh);

	// create the dom Element
	const element = document.createElement( 'iframe' );
	element.src = 'http://handivity.robinleroux.fr/';
	element.style.width = '100px';
	element.style.height = '150px';
	element.style.border = '0px';
	// create the object3d for this element
	const cssObject = new CSS3DObject( element );
	cssObject.name = 'iframeTV'
	// we reference the same position and rotation 
	cssObject.rotation.copy(  target.parent.rotation );
	cssObject.quaternion.copy(  target.parent.quaternion );
	cssObject.position.copy( target.parent.position );
	cssObject.scale.copy(  target.parent.scale );
	console.log(cssObject.position)
	// add it to the css scene
	this.scene2.add(cssObject);

	console.log('iframe ta mere')

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
        if (this.scene1 && this.scene2 && child.name === this.videoContainer) {
          this.initIframe(child)
		  console.log(child);
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
