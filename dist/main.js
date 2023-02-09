
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg")
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera );

const geometry = new THREE.BoxGeometry(10, 10, 10);
const raycaster = new THREE.Raycaster();
const cubeMaterials = [
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( 'textures\\cube\\px.png') }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( 'textures\\cube\\nx.png') }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( 'textures\\cube\\py.png') }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( 'textures\\cube\\ny.png') }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( 'textures\\cube\\pz.png') }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( 'textures\\cube\\nz.png') }),
];

const cube_mesh = new THREE.Mesh( geometry, cubeMaterials );

scene.add(cube_mesh);

document.addEventListener( 'click', function(event){ 

  var vector = new THREE.Vector3( 
     ( event.clientX / window.innerWidth ) * 2 - 1, 
     - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
  vector.unproject( camera );
  raycaster.set( camera.position, vector.sub( camera.position ).normalize() );

  var intersects = raycaster.intersectObject( cube_mesh );
  if ( intersects.length > 0 ) {
     var index = Math.floor( intersects[0].faceIndex / 2 );
     switch (index) {
      //document.location.href = 'cs4.html';
        case 0: console.log(index);
        case 1: console.log(index);
        case 2: console.log(index);
        case 3: console.log(index);
        case 4: console.log(index);
        case 5: console.log(index);
     }
  }
  
}, false);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(20, 20, 20);

scene.add(ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.maxDistance = 25;
controls.minDistance = 15;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;
controls.mouseButtons = {	
	MIDDLE: THREE.MOUSE.DOLLY,
	RIGHT: THREE.MOUSE.ROTATE
};

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff } );
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 200 ));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(300).fill().forEach(addStar);


function animate() {
  requestAnimationFrame( animate );

  controls.update();
  
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  
  renderer.render( scene, camera );
}

animate();