if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (function () {
    return (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (
        /* function FrameRequestCallback */ callback,
        /* DOMElement Element */ element
      ) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
}
var container, stats;

var camera, scene, renderer;

var cube, plane;

var targetRotationX = 0.5;
var targetRotationOnMouseDownX = 0;

var targetRotationY = 0.2;
var targetRotationOnMouseDownY = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var mouseY = 0;
var mouseYOnMouseDown = 0;

var windowHalfX = window.innerWidth/2 ;
var windowHalfY = window.innerHeight/2 ;

// var slowingFactor = 0.25;
var slowingFactor = 0.25;

var cube;
var boxWidth = 100;
var boxHeight = 100;
var boxDepth = 100;
var scene;
var geometry;
var THREE;
var renderer;
var camera;
var materials = [];

function run(three) {
  THREE = three;
  init();
  animate();
  // console.log(THREE)
}

function init() {
  const canvas = document.querySelector("#c");
  renderer = new THREE.WebGLRenderer({ canvas });

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(70, 2, 1, 1000);
  camera.position.y += 150;
  camera.position.z += 500;
  // scene.add(camera);
  // geometry = new THREE.Geometry();

  for (var i = 0; i < 6; i++) {
    materials.push(
      new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff })
    );
  }
  // check for the input way
  cube = new THREE.Mesh(
    new THREE.BoxGeometry(
      (boxWidth ),
      (boxHeight ),
      (boxDepth )
    ),
    new THREE.MeshFaceMaterial(materials)
  );
  cube.position.y += 150;
  // cube.rotation.x +=150;

  cube.overdraw = true;
  
  scene.add(cube);

  renderer.setSize(1000, 1000);

  document
    .getElementById("c")
    .addEventListener("mousedown", onDocumentMouseDown, false);
   
}

function onDocumentMouseDown(event) {
  event.preventDefault();

  document.addEventListener("mousemove", onDocumentMouseMove, false);
  document.addEventListener("mouseup", onDocumentMouseUp, false);
  document.addEventListener("mouseout", onDocumentMouseOut, false);
  // console.log(windowHalfX)

  mouseXOnMouseDown = event.clientX - windowHalfX;

  

  mouseYOnMouseDown = event.clientY - windowHalfY;
  
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;

  targetRotationX = (mouseX - mouseXOnMouseDown) * 0.00025;

  mouseY = event.clientY - windowHalfY;

  targetRotationY = (mouseY - mouseYOnMouseDown) * 0.00025;
}

function onDocumentMouseOut(event) {
  document.removeEventListener("mousemove", onDocumentMouseMove, false);
  document.removeEventListener("mouseup", onDocumentMouseUp, false);
  document.removeEventListener("mouseout", onDocumentMouseOut, false);
}
function onDocumentMouseUp(event) {
  document.removeEventListener("mousemove", onDocumentMouseMove, false);
  document.removeEventListener("mouseup", onDocumentMouseUp, false);
  document.removeEventListener("mouseout", onDocumentMouseOut, false);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {  

  rotateAroundWorldAxis(cube, new THREE.Vector3(0, 1, 0), targetRotationX);
  rotateAroundWorldAxis(cube, new THREE.Vector3(1, 0, 0), targetRotationY);
  // rotateAroundWorldAxis(cube, new THREE.Vector3(0, 0, 1), targetRotationY);

  targetRotationY = targetRotationY * (1 - slowingFactor);
  targetRotationX = targetRotationX * (1 - slowingFactor);
  renderer.render(scene, camera);
}

function rotateAroundObjectAxis(object, axis, radians) {
  var rotationMatrix = new THREE.Matrix4();

  rotationMatrix.makeRotationAxis(axis.normalize(), radians);
  object.matrix.multiply(rotationMatrix);
  object.rotation.setFromRotationMatrix(object.matrix);
}

function rotateAroundWorldAxis(object, axis, radians) {
  var rotationMatrix = new THREE.Matrix4();

  rotationMatrix.makeRotationAxis(axis.normalize(), radians);
  rotationMatrix.multiply(object.matrix); // pre-multiply
  object.matrix = rotationMatrix;
  object.rotation.setFromRotationMatrix(object.matrix);
}

function changeValuel() {
  var str = document.getElementById("text1").value;

  boxDepth = parseInt(str);
  setSize(cube, boxDepth, boxDepth, boxHeight);
}
function changeValuew() {
  var str = document.getElementById("text2").value;

  boxWidth = parseInt(str);
  setSize(cube, boxDepth, boxWidth, boxHeight);
}

function changeValueh() {
  var str = document.getElementById("text3").value;

  boxHeight = parseInt(str);
  setSize(cube, boxDepth, boxWidth, boxHeight);
}

function setSize(myMesh, xSize, ySize, zSize) {
  scaleFactorX = xSize / myMesh.geometry.parameters.width;
  scaleFactorY = ySize / myMesh.geometry.parameters.height;
  scaleFactorZ = zSize / myMesh.geometry.parameters.depth;
  myMesh.scale.set(scaleFactorX, scaleFactorY, scaleFactorZ);
}
