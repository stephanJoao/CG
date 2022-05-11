import * as THREE from 'three';
import Stats from '../build/jsm/libs/stats.module.js';
import GUI from '../libs/util/dat.gui.module.js'
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js';
import {
	initRenderer,
	initCamera,
	InfoBox,
	onWindowResize
} from "../libs/util/util.js";

var stats = new Stats();          // To show FPS information
var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // View function in util/utils
var camera = initCamera(new THREE.Vector3(0, -30, 15)); // Init camera in this position

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(12);
scene.add(axesHelper);

// Create the ground plane
var planeGeometry = new THREE.PlaneGeometry(20, 20);
planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
var planeMaterial = new THREE.MeshBasicMaterial({
	color: "rgba(150, 150, 150)",
	side: THREE.DoubleSide,
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);

// Add the plane to the scene
scene.add(plane);

// Create objects
var sphereGeometry = new THREE.SphereGeometry(2, 32, 16);
var sphereMaterial = new THREE.MeshNormalMaterial();

var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
var sphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial);

sphere.position.set(5.0, 0.0, 0.0);
sphere2.position.set(0.0, 0.0, 0.0);

// Add the cubes to the scene
scene.add(sphere);
scene.add(sphere2);

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
window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);

// Variables that will be used for linear interpolation
const lerpConfig = {
	destination: new THREE.Vector3(-3.0, 0.0, 3.0),
	alpha: 0.01,
	move: true
}

const lerpConfig2 = {
	destination: new THREE.Vector3(3.0, 0.0, 3.0),
	alpha: 0.01,
	move: true
}

buildInterface();
function buildInterface() {
	let gui = new GUI();
	let folder = gui.addFolder("Lerp Options");
	folder.open();

	folder.add(lerpConfig.destination, 'x', -5, 5).onChange();
	folder.add(lerpConfig.destination, 'y', -5, 5).onChange();
	folder.add(lerpConfig.destination, 'z', -5, 5).onChange();
	folder.add(lerpConfig, 'alpha', 0.01, 1).onChange();
	folder.add(lerpConfig, "move", true).name("Move Object");

	folder.add(lerpConfig2.destination, 'x', -5, 5).onChange();
	folder.add(lerpConfig2.destination, 'y', -5, 5).onChange();
	folder.add(lerpConfig2.destination, 'z', -5, 5).onChange();
	folder.add(lerpConfig2, 'alpha', 0.01, 1).onChange();
	folder.add(lerpConfig2, "move", true).name("Move Object");
}

render();
function render() {
	stats.update(); // Update FPS
	trackballControls.update(); // Enable mouse movements
	
	if (lerpConfig.move) sphere.position.lerp(lerpConfig.destination, lerpConfig.alpha);

	if (lerpConfig2.move) sphere2.position.lerp(lerpConfig2.destination, lerpConfig2.alpha);

	requestAnimationFrame(render);
	renderer.render(scene, camera) // Render scene
}

