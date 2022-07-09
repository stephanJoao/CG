import * as THREE 			from  'three';
import {RaytracingRenderer} from  '../libs/other/raytracingRenderer.js';
import {degreesToRadians}   from "../libs/util/util.js";

var scene, renderer;

var container = document.createElement( 'div' );
document.body.appendChild( container );

var scene = new THREE.Scene();

// The canvas is in the XY plane.
// Hint: put the camera in the positive side of the Z axis and the
// objects in the negative side
var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z = 6;
camera.position.y = 2.5;

// light
var intensity = 0.5;
var light = new THREE.PointLight( 0xffffff, intensity );
light.position.set( 0, 2.50, 0 );
scene.add( light );

var light = new THREE.PointLight( 0x55aaff, intensity );
light.position.set( -1.00, 1.50, 2.00 );
scene.add( light );

var light = new THREE.PointLight( 0xffffff, intensity );
light.position.set( 1.00, 1.50, 2.00 );
scene.add( light );

renderer = new RaytracingRenderer(window.innerWidth, window.innerHeight, 64, camera);
container.appendChild( renderer.domElement );


// materials
var wallMaterialWhite = new THREE.MeshLambertMaterial( {
	color: "rgb(255,255,255)",
} );

var wallMaterialBlue = new THREE.MeshLambertMaterial( {
	color: "rgb(96,100,255)",
} );

var cylinderMaterial = new THREE.MeshLambertMaterial( {
	color: "rgb(126,174,228)",
} );

var sphereMaterial = new THREE.MeshPhongMaterial( {
	color: "rgb(0,0,0)",
	specular: "rgb(255,255,255)",
	shininess: 1000,
} );
sphereMaterial.mirror = true;
sphereMaterial.reflectivity = 1;

var torusMaterial = new THREE.MeshPhongMaterial( {
	color: "rgb(255,170,0)",
	specular: "rgb(34,34,34)",
	shininess: 10000,
} );
torusMaterial.mirror = true;
torusMaterial.reflectivity = 0.1;

var cylinderMaterial2 = new THREE.MeshPhongMaterial( {
	color: "rgb(216,40,50)",
	specular: "rgb(34,34,34)",
	shininess: 10000,
	roughness: 0.1,   
  	transmission: 1,  
  	thickness: 1
} );
torusMaterial.mirror = true;
torusMaterial.reflectivity = 0.1;


// geometries
var depth = 8.0;
var wallGeometrySide = new THREE.BoxGeometry( 6.00, 0.05, depth );
var wallGeometryBack = new THREE.BoxGeometry( 12.00, 0.05, depth );
var wallGeometryVert = new THREE.BoxGeometry( 12.00, 0.05, depth );

var cylinderGeometry = new THREE.CylinderGeometry( 1.0, 1.0, 2.0, 80 );

var torusGeometry = new THREE.TorusKnotGeometry( 0.4, 0.12, 100, 16 )
var sphereGeometry = new THREE.SphereGeometry( 1, 24, 24 );
var cylinderGeometry2 = new THREE.CylinderGeometry( 0.8, 0.5, 1.6, 80 );



// torus knot
var torus = new THREE.Mesh( torusGeometry, torusMaterial )
torus.position.set( -3.0, 2.5, -2.50 )
scene.add(torus)

// mirror sphere
var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial )
sphere.position.set( 0, 2.5, -4.50 )
scene.add(sphere)

// right cylinder top
var cylinder = new THREE.Mesh( cylinderGeometry2, cylinderMaterial2 );
cylinder.position.set( 3.0, 2.3, -2.50 )
scene.add(cylinder);

// middle cylinder
var cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
cylinder.position.set( 0, 0.5, -4.50 )
scene.add(cylinder);

// left cylinder
var cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
cylinder.position.set( -3.0, 0.5, -2.50 )
scene.add(cylinder);

// right cylinder
var cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
cylinder.position.set( 3.0, 0.5, -2.50 )
scene.add(cylinder);

// bottom
var plane = new THREE.Mesh( wallGeometryVert, wallMaterialWhite );
plane.position.set( 0, -0.5, -4.00 );
scene.add( plane );

// top
var plane = new THREE.Mesh( wallGeometryVert, wallMaterialWhite );
plane.position.set( 0, 5.5, -4.00 );
scene.add( plane );

// back
var plane = new THREE.Mesh( wallGeometryBack, wallMaterialWhite );
plane.rotation.x = 1.57;
plane.position.set( 0, 2.50, -8.00 );
scene.add( plane );

// left
var plane = new THREE.Mesh( wallGeometrySide, wallMaterialBlue );
plane.rotation.z = 1.57;
plane.position.set( -6.00, 2.50, -4.00 )
scene.add( plane );

// right
var plane = new THREE.Mesh( wallGeometrySide, wallMaterialBlue );
plane.rotation.z = 1.57;
plane.position.set( 6.00, 2.50, -4.00 )
scene.add( plane );

render();

function render()
{
	renderer.render( scene, camera );
}
