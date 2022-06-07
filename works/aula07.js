import * as THREE from 'three';
import GUI from '../libs/util/dat.gui.module.js'
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js';
import { TeapotGeometry } from '../build/jsm/geometries/TeapotGeometry.js';
import {
	InfoBox,
	createGroundPlane,
	createLightSphere,
	onWindowResize,
	degreesToRadians
} from "../libs/util/util.js";
import { FlatShading } from '../build/three.module.js';

// Create main scene
var scene = new THREE.Scene();

// Create camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0.0, 4, 6.5);

// Set all renderers
let renderer = new THREE.WebGLRenderer();
document.getElementById("webgl-output").appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
  	renderer.shadowMap.type  = THREE.PCFShadowMap; // default

// Listen window size changes
window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);

//---------------------------------------------------------
// Default light position
var lightPosition = new THREE.Vector3(2, 1.0, 2);

// Sphere to represent the light
var lightSphere = createLightSphere(scene, 0.05, 10, 10, lightPosition);

//---------------------------------------------------------
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

// Create and set the spotlight
var dirLight = new THREE.DirectionalLight("rgb(255,255,255)");
dirLight.position.copy(lightPosition);
dirLight.castShadow = true;
// Shadow Parameters
dirLight.shadow.mapSize.width = 256;
dirLight.shadow.mapSize.height = 256;
dirLight.shadow.camera.near = .1;
dirLight.shadow.camera.far = 8;
dirLight.shadow.camera.left = -2.5;
dirLight.shadow.camera.right = 2.5;
dirLight.shadow.camera.bottom = -2.5;
dirLight.shadow.camera.top = 2.5;

// Just for VSM - to be added in threejs.r132
scene.add(dirLight);

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);

// Create helper for the spotlight shadow
const shadowHelper = new THREE.CameraHelper(dirLight.shadow.camera);
shadowHelper.visible = false;
scene.add(shadowHelper);

createScene();
render();

//-----------------------------------------------------------------------------
function createScene() {
	var groundPlane = createGroundPlane(10, 10);
	groundPlane.rotateX(degreesToRadians(-90));
	scene.add(groundPlane);

	// Create cylinder
	var cylinderGeometry = new THREE.CylinderGeometry(0.1, 0.5, 2.3, 16);
	var cylinderMaterial = new THREE.MeshPhongMaterial({ color: "lightblue", flatShading: true });
	var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);		
		cylinder.castShadow = true;
		cylinder.shadow = true;

	cylinder.position.set(1.5, 0.75, 1.5);
	
	scene.add(cylinder);
	
	// Create teapot
	var teapotGeometry = new TeapotGeometry(0.5);
	var teapotMaterial = new THREE.MeshPhongMaterial({ color: "rgb(255,0,0)", shininess: "200" });
	var teapot = new THREE.Mesh(teapotGeometry, teapotMaterial);		
		teapot.castShadow = true;
		teapot.receiveShadow = true;

	teapot.position.set(0.0, 0.5, 0.0);
	
	scene.add(teapot);

	// Create sphere
	var sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);
	var sphereMaterial = new THREE.MeshLambertMaterial({ color: "lightgreen", shininess: "200" });
	var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);		
		sphere.castShadow = true;
		sphere.receiveShadow = true;

	sphere.position.set(-1.5, 0.5, -1.5);
	
	scene.add(sphere);
}

function render() {
	trackballControls.update();
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}