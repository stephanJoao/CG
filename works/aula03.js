import * as THREE from 'three';
import Stats from '../build/jsm/libs/stats.module.js';
import KeyboardState from '../libs/util/KeyboardState.js'
import {
	initRenderer,
	initCamera,
	InfoBox,
	onWindowResize,
	createGroundPlaneWired
} from "../libs/util/util.js";
import { HemisphereLight } from '../build/three.module.js';

var stats = new Stats();          // To show FPS information
var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // View function in util/utils

// To be used to manage keyboard
let clock = new THREE.Clock();

// To use the keyboard
var keyboard = new KeyboardState();

// Init camera in this position
var camera = initCamera(new THREE.Vector3(0, 0, 1));

// Adiciona iluminação
scene.add(new HemisphereLight());

// Adiciona plano
scene.add(createGroundPlaneWired(400, 400, 120, 120, "blue"));

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(12);
scene.add(axesHelper);


// Create camera holder
var geometry = new THREE.BoxGeometry(2.0, 2.0, 2.0);
var material = new THREE.MeshNormalMaterial();
var cameraHolder = new THREE.Mesh(geometry, material);
cameraHolder.position.set(0.0, 2.0, 0.0);
cameraHolder.add(camera);
scene.add(cameraHolder);

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

function keyboardUpdate() {

	keyboard.update();

	var speed = 30;
	var moveDistance = speed * clock.getDelta();

	// Keyboard.down - execute only once per key pressed
	if (keyboard.down("left")) cameraHolder.translateX(-1);
	if (keyboard.down("right")) cameraHolder.translateX(-1);
	if (keyboard.down("up")) cameraHolder.translateZ(-1);
	if (keyboard.down("down")) cameraHolder.translateZ(1);

	// Keyboard.pressed - execute while is pressed
	if (keyboard.pressed("A")) cameraHolder.translateX(-moveDistance);
	if (keyboard.pressed("D")) cameraHolder.translateX(moveDistance);
	if (keyboard.pressed("W")) cameraHolder.translateZ(-moveDistance);
	if (keyboard.pressed("S")) cameraHolder.translateZ(moveDistance);

	if (keyboard.pressed("Q")) cameraHolder.rotateZ(0.05);
	if (keyboard.pressed("E")) cameraHolder.rotateZ(-0.05);

	if (keyboard.pressed("left")) cameraHolder.rotateY(0.05);
	if (keyboard.pressed("right")) cameraHolder.rotateY(-0.05);
	if (keyboard.pressed("up")) cameraHolder.rotateX(0.05);
	if (keyboard.pressed("down")) cameraHolder.rotateX(-0.05);

	if (keyboard.pressed("space")) cameraHolder.position.set(0.0, 2.0, 0.0);
}

function render() {
	stats.update(); // Update FPS
	requestAnimationFrame(render);
	keyboardUpdate();

	renderer.render(scene, camera) // Render scene
}