// Setting up the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("solar-system"),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Background
const loader = new THREE.TextureLoader();
loader.load('textures/stars.jpg', (texture) => {
  scene.background = texture;
});


// Handle Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
