import * as THREE from 'three';
import GUI from '../libs/util/dat.gui.module.js'
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js';
import { TeapotGeometry } from '../build/jsm/geometries/TeapotGeometry.js';
import {ConvexGeometry} from '../build/jsm/geometries/ConvexGeometry.js';
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
var lightPosition = new THREE.Vector3(1, 1, 1);

//---------------------------------------------------------
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add(light);

// Create and set the spotlight
var dirLight = new THREE.DirectionalLight("rgb(255,255,255)");
dirLight.position.copy(lightPosition);
dirLight.castShadow = true;
// Shadow Parameters

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

	// Points
	var points =  [];
	points.push(new THREE.Vector3(2.0, 0.0, 2.0));
	points.push(new THREE.Vector3(-2.0, 0.0, 2.0));
	points.push(new THREE.Vector3(-2.0, 0.0, -2.0));
	points.push(new THREE.Vector3(2.0, 0.0, -2.0));
	points.push(new THREE.Vector3(-2.0, 1.0, 2.0));
	points.push(new THREE.Vector3(-2.0, 1.0, -2.0));
	points.push(new THREE.Vector3(0.0, 1.0, 2.0));
	points.push(new THREE.Vector3(0.0, 1.0, -2.0));

	// Create cylinder
	var geometry = new ConvexGeometry(points);
	var material = new THREE.MeshLambertMaterial({color: "lightblue"});
	var obj = new THREE.Mesh(geometry, material);		
		obj.castShadow = true;

	// obj.position.set(1.5, 0.75, 1.5);
	
	scene.add(obj);
}

function render() {
	trackballControls.update();
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}