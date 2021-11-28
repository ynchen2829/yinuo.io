import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from "https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader";



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
const spaceTexture = new THREE.TextureLoader().load('./images/space.png');
scene.background = spaceTexture;

//create torus object
// const geometry = new THREE.TorusGeometry(10,3,16,100)
// const material = new THREE.MeshStandardMaterial(({color: 0xFF6347}))
// const torus = new THREE.Mesh(geometry,material);
//scene.add(torus)

//add models
let donutMesh;
const loader = new GLTFLoader();
loader.load('./models/donut.gltf',function(gltf){
    donutMesh = gltf.scene;
    donutMesh.scale.set(50,50,50);
    scene.add(donutMesh);
    donutMesh.position.set(-4,0,15)
    console.log("donunt added")
},undefined,function(error){
    console.log(error);
});

//add models
let robotMesh;
loader.load('./models/robot.gltf',function(gltf){
    robotMesh = gltf.scene;
    robotMesh.rotation.x += 3.14159;
    robotMesh.rotation.y += 3.8;
    scene.add(robotMesh);
    robotMesh.scale.set(1,1,1);
    robotMesh.position.set(1.5,0,26)
    console.log("robot added")
},undefined,function(error){
    console.log(error);
});




// Photo of Myself
const yinuoTexture = new THREE.TextureLoader().load('./images/me.jpg')
const yinuo = new THREE.Mesh(
    new THREE.BoxGeometry(12.8,17,1),
    new THREE.MeshBasicMaterial({map: yinuoTexture})
)
yinuo.position.set(15,0,-10)
scene.add(yinuo)


//lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(20,20,20)
scene.add(pointLight,ambientLight)


/**------------------------------------function sections ---------------------------------**/
//camera animation
function moveCamera(){
    const t = document.body.getBoundingClientRect().top;

     camera.position.z = t * -0.01;
     camera.position.x = t * -0.0002;
     camera.rotation.y = t * -0.0002;

}
document.body.onscroll = moveCamera;
moveCamera();


//animation function for donut
var up = true;
function animate(){
    requestAnimationFrame(animate);

    donutMesh.rotation.x += 0.01;
    donutMesh.rotation.y += 0.01;
    donutMesh.rotation.z += 0.01;

     var targetPosition = -0.5;
    // Check the object's X position
    if(up === true){
        if(robotMesh.position.y < 0){
            robotMesh.position.y+= 0.05;
        }else{
            up = false;
        }
    }else{
         if(robotMesh.position.y >targetPosition){
            robotMesh.position.y-= 0.05;
        }else{
            up = true;
        }
    }

    controls.update()

    renderer.render(scene, camera)
}

animate();


