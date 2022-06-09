import * as THREE from  'three';
import Stats from '../build/jsm/libs/stats.module.js';
import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';
import {GLTFLoader} from '../build/jsm/loaders/GLTFLoader.js';
import {initRenderer, 
        initDefaultBasicLight,
        createGroundPlane,
        onWindowResize, 
        degreesToRadians} from "../libs/util/util.js";
import { CSG } from '../libs/other/CSGMesh.js'       

var scene = new THREE.Scene();    // Create main scene
var stats = new Stats();          // To show FPS information

initDefaultBasicLight(scene, true); // Use default light

var renderer = initRenderer();    // View function in util/utils
  renderer.setClearColor("rgb(30, 30, 42)");
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.lookAt(0, 0, 0);
  camera.position.set(2.18, 1.62, 3.31);
  camera.up.set( 0, 1, 0 );

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls( camera, renderer.domElement );

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

var groundPlane = createGroundPlane(20.0, 20.0, 80, 80); // width and height
  groundPlane.rotateX(degreesToRadians(-90));
scene.add(groundPlane);

//---------------------------------------------------------
var extCylinder = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 10, 32));
var intCylinder = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 4.5, 10, 32));

extCylinder.position.set(0, 5.5, 0);
extCylinder.matrixAutoUpdate = false;
extCylinder.updateMatrix();

intCylinder.position.set(0, 6.0, 0);
intCylinder.matrixAutoUpdate = false;
intCylinder.updateMatrix();

var extCylinderCSG = CSG.fromMesh(extCylinder);
var intCylinderCSG = CSG.fromMesh(intCylinder);
var cupWithoutCSG =  extCylinderCSG.subtract(intCylinderCSG);

var otherExtCylinder = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 10, 32));
var torus = new THREE.Mesh(new THREE.TorusGeometry(3.5, 0.7, 32, 32));

otherExtCylinder.position.set(0, 5.5, 0);
otherExtCylinder.matrixAutoUpdate = false;
otherExtCylinder.updateMatrix();

torus.position.set(4.75, 5.5, 0);
torus.matrixAutoUpdate = false;
torus.updateMatrix();

var otherExtCylinderCSG = CSG.fromMesh(otherExtCylinder);
var torusCSG = CSG.fromMesh(torus);
var alcaCSG =  torusCSG.subtract(otherExtCylinderCSG);

var cupCSG = cupWithoutCSG.union(alcaCSG)
var cup = CSG.toMesh(cupCSG, new THREE.Matrix4());
cup.material = new THREE.MeshPhongMaterial({color: "rgb(220, 220, 220)"});


scene.add(cup);


render();


function render()
{
  stats.update();
  trackballControls.update();
  requestAnimationFrame(render);
  renderer.render(scene, camera)
}