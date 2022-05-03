import * as THREE from 'three';
import Stats from '../build/jsm/libs/stats.module.js';
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

// Create cubes
var cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
var sphereGeometry = new THREE.SphereGeometry(2, 32, 16)
var cylinderGeometry = new THREE.CylinderGeometry(2, 2, 3, 16)

var material = new THREE.MeshNormalMaterial();

var cube = new THREE.Mesh(cubeGeometry, material);
var sphere = new THREE.Mesh(sphereGeometry, material);
var cylinder = new THREE.Mesh(cylinderGeometry, material);

// Position the cubes
cube.position.set(0.0, -5.0, 1.5);
sphere.position.set(0.0, 0.0, 2.0);
cylinder.position.set(0.0, 5.0, 2.0);

// Add the cubes to the scene
scene.add(cube);
scene.add(sphere);
scene.add(cylinder);

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

render();
function render() {
	stats.update(); // Update FPS
	trackballControls.update(); // Enable mouse movements
	requestAnimationFrame(render);
	renderer.render(scene, camera) // Render scene
}