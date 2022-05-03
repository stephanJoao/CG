import * as THREE from  'three';
import Stats from       '../build/jsm/libs/stats.module.js';
import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        InfoBox,
        onWindowResize,
        createGroundPlaneXZ} from "../libs/util/util.js";

var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // View function in util/utils
var camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
initDefaultBasicLight(scene);

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls( camera, renderer.domElement );

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

// create the ground plane
let plane = createGroundPlaneXZ(20, 20)
scene.add(plane);

// material
var material = new THREE.MeshLambertMaterial({color: "rgb(200, 0, 0)"});

// create a cube
var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
var cube = new THREE.Mesh(cubeGeometry, material);

// position the cube
cube.scale.set(11, 0.3, 6);
cube.translateY(3.15)

// create the cylinders
var cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 720);

var cylinder = new THREE.Mesh(cylinderGeometry, material);

// position the cylinder
cylinder.scale.set(0.1, 3, 0.1);
cylinder.translateX(5.4);
cylinder.translateY(1.5);
cylinder.translateZ(2.9);


var cylinder2 = new THREE.Mesh(cylinderGeometry, material);

// position the cylinder2
cylinder2.scale.set(0.1, 3, 0.1);
cylinder2.translateX(-5.4);
cylinder2.translateY(1.5);
cylinder2.translateZ(2.9);


var cylinder3 = new THREE.Mesh(cylinderGeometry, material);

// position the cylinde3r
cylinder3.scale.set(0.1, 3, 0.1);
cylinder3.translateX(-5.4);
cylinder3.translateY(1.5);
cylinder3.translateZ(-2.9);


var cylinder4 = new THREE.Mesh(cylinderGeometry, material);

// position the cylinde4r
cylinder4.scale.set(0.1, 3, 0.1);
cylinder4.translateX(5.4);
cylinder4.translateY(1.5);
cylinder4.translateZ(-2.9);



// add the cube to the scene
scene.add(cube);
scene.add(cylinder);
scene.add(cylinder2);
scene.add(cylinder3);
scene.add(cylinder4);


// Use this to show information onscreen
var controls = new InfoBox();
  controls.add("Basic Scene");
  controls.addParagraph();
  controls.add("Use mouse to interact:");
  controls.add("* Left button to rotate");
  controls.add("* Right button to translate (pan)");
  controls.add("* Scroll to zoom in/out.");
  controls.show();

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

render();
function render()
{
  trackballControls.update(); // Enable mouse movements
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}