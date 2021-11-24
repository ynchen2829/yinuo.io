import './style.css'

import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {MeshStandardMaterial} from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30)

//controls
//function: listen to mouse event and update camera location accordingly
const controls = new OrbitControls(camera,renderer.domElement);

//stary background generation
function addStar(){
    const geometry = new THREE.SphereGeometry(0.25,24,24);
    const material = new THREE.MeshStandardMaterial({color:0xffffff})
    const star = new THREE.Mesh(geometry, material)

    //randomization function
    const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
    star.position.set(x,y,z);
    scene.add(star)
    console.log("star added")
}

Array(200).fill().forEach(addStar);


//space texture
const spaceTexture = new THREE.TextureLoader().load('./images/space.jpg');
scene.background = spaceTexture;

//create object
const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial(({color: 0xFF6347}))
const torus = new THREE.Mesh(geometry,material);

//scene.add(torus)

//add models
const loader = new GLTFLoader();
loader.load('./models/donut.glb',function(gltf){
    scene.add(gltf.scene);
},undefined,function(error){
    console.log(error);
});

//lights
const pointLight = new THREE.PointLight(0xfffff);
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xfffff);
ambientLight.position.set(20,20,20)
scene.add(pointLight,ambientLight)


//animation function
function animate(){
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    torus.rotation.z += 0.01;

    controls.update()

    renderer.render(scene, camera)
}

animate()