import * as THREE from  'three';
import GUI from '../libs/util/dat.gui.module.js'
import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';
import KeyboardState from '../libs/util/KeyboardState.js';
import {TeapotGeometry} from '../build/jsm/geometries/TeapotGeometry.js';
import {initRenderer, 
        InfoBox,
        SecondaryBox,
        createGroundPlane,
        onWindowResize, 
        degreesToRadians, 
        createLightSphere} from "../libs/util/util.js";
import { MeshLambertMaterial, TorusGeometry } from '../build/three.module.js';

var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // View function in util/utils
  renderer.setClearColor("rgb(30, 30, 42)");
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.lookAt(0, 0, 0);
  camera.position.set(2.18, 1.62, 3.31);
  camera.up.set( 0, 1, 0 );
var objColor = "rgb(255,255,255)";
var objShininess = 200;

// To use the keyboard
var keyboard = new KeyboardState();

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls( camera, renderer.domElement );

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

var groundPlane = createGroundPlane(6.0, 6.0, 50, 50); // width and height
  groundPlane.rotateX(degreesToRadians(-90));
scene.add(groundPlane);

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(1.5);
  axesHelper.visible = false;
scene.add( axesHelper );

// Show text information onscreen
showInformation();

// Teapot
var geometry = new TeapotGeometry(0.5);
var material = new THREE.MeshPhongMaterial({color: objColor, shininess: "200"});
var obj = new THREE.Mesh(geometry, material);
  obj.castShadow = true;
  obj.position.set(0.0, 0.5, 0.0);
scene.add(obj);

// Torus
var torusGeometry = new TorusGeometry(2.0, 0.04, 16, 100);
var torusMaterial = new THREE.MeshPhongMaterial({color: "white", shininess: "200"});
var torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(0.0, 1.2, 0.0);
torus.rotateX(degreesToRadians(-90))
scene.add(torus)

//---------------------------------------------------------
var lightAngleR = 0;
var lightColorR = "rgb(255,0,0)";

var lightIntensityG = 1.0;
var lightAngleG = 0;
var lightColorG = "rgb(0,255,0)";

var lightIntensityB = 1.0;
var lightAngleB = 0;
var lightColorB = "rgb(0,0,255)";

var geometrySpheres = new THREE.SphereGeometry(0.15, 10, 10, 0, Math.PI * 2, 0, Math.PI);
var materialR = new THREE.MeshBasicMaterial({color:"rgb(255,0,0)"});
var materialG = new THREE.MeshBasicMaterial({color:"rgb(0,255,0)"});
var materialB = new THREE.MeshBasicMaterial({color:"rgb(0,0,255)"});

var lightSphereR = new THREE.Mesh(geometrySpheres, materialR);
var lightSphereG = new THREE.Mesh(geometrySpheres, materialG);
var lightSphereB = new THREE.Mesh(geometrySpheres, materialB);

lightSphereR.position.set(calculatePosition(lightAngleR).x, calculatePosition(lightAngleR).y, calculatePosition(lightAngleR).z)
scene.add(lightSphereR);
lightSphereR.visible = true

lightSphereG.position.set(calculatePosition(lightAngleR).x, calculatePosition(lightAngleR).y, calculatePosition(lightAngleR).z)
scene.add(lightSphereG);
lightSphereR.visible = true

lightSphereB.position.set(calculatePosition(lightAngleR).x, calculatePosition(lightAngleR).y, calculatePosition(lightAngleR).z)
scene.add(lightSphereB);
lightSphereR.visible = true

//---------------------------------------------------------
var ambientColor = "rgb(50,50,50)";

var ambientLight = new THREE.AmbientLight(ambientColor);
scene.add( ambientLight );

var spotLightR = new THREE.SpotLight(lightColorR);
setSpotLight(spotLightR, calculatePosition(lightAngleR), "Red Spotlight");

var spotLightG = new THREE.SpotLight(lightColorG);
setSpotLight(spotLightG, calculatePosition(lightAngleG), "Green Spotlight");

var spotLightB = new THREE.SpotLight(lightColorB);
setSpotLight(spotLightB, calculatePosition(lightAngleB), "Blue Spotlight");


// Hide all lights and make only the spotLight visible
spotLightR.visible = true.valueOf;

render();

// Set Spotlight
function setSpotLight(spotLight, position, name)
{
  spotLight.position.copy(position);
  spotLight.shadow.mapSize.width = 512;
  spotLight.shadow.mapSize.height = 512;
  spotLight.angle = degreesToRadians(40);    
  spotLight.castShadow = true;
  spotLight.decay = 2;
  spotLight.penumbra = 0.5;
  spotLight.name = name;

  scene.add(spotLight);
}

// Update light position of the current light
function updateLightPosition()
{
  spotLightR.position.set(calculatePosition(lightAngleR).x, calculatePosition(lightAngleR).y, calculatePosition(lightAngleR).z);
  lightSphereR.position.set(calculatePosition(lightAngleR).x, calculatePosition(lightAngleR).y, calculatePosition(lightAngleR).z)

  spotLightG.position.set(calculatePosition(lightAngleG).x, calculatePosition(lightAngleG).y, calculatePosition(lightAngleG).z);
  lightSphereG.position.set(calculatePosition(lightAngleG).x, calculatePosition(lightAngleG).y, calculatePosition(lightAngleG).z)

  spotLightB.position.set(calculatePosition(lightAngleB).x, calculatePosition(lightAngleB).y, calculatePosition(lightAngleB).z);
  lightSphereB.position.set(calculatePosition(lightAngleB).x, calculatePosition(lightAngleB).y, calculatePosition(lightAngleB).z)
}

function calculatePosition(angle)
{
	const position = new THREE.Vector3(2 * Math.sin(degreesToRadians(angle)), 1.2, 2 * Math.cos(degreesToRadians(angle)));
	return position;
}

function keyboardUpdate()
{
  keyboard.update();
  if ( keyboard.down("Q"))
  {
    if(spotLightR.visible) {
		spotLightR.visible = false; 
		lightSphereR.visible = false;
	} 		
	else {
		spotLightR.visible = true; 
		lightSphereR.visible = true;
	} 
  }
  if ( keyboard.down("W"))
  {
    if(spotLightG.visible) {
		spotLightG.visible = false; 
		lightSphereG.visible = false;
	} 		
	else {
		spotLightG.visible = true; 
		lightSphereG.visible = true;
	} 
  }
  if ( keyboard.down("E"))
  {
    if(spotLightB.visible) {
		spotLightB.visible = false; 
		lightSphereB.visible = false;
	} 		
	else {
		spotLightB.visible = true; 
		lightSphereB.visible = true;
	} 
  }
  if ( keyboard.pressed("A"))
  {
    lightAngleR += 1;
    updateLightPosition();
  }
  if ( keyboard.pressed("S"))
  {
    lightAngleG += 1;
    updateLightPosition();
  }
  if ( keyboard.pressed("D"))
  {
    lightAngleB += 1;
    updateLightPosition();
  }
}

function showInformation()
{
  // Use this to show information onscreen
  var controls = new InfoBox();
    controls.add("Lighting - Types of Lights");
    controls.addParagraph();
    controls.show();
}

function render()
{
  trackballControls.update();
  keyboardUpdate();
  requestAnimationFrame(render);
  renderer.render(scene, camera)
}
