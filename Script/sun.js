// lighting
const sunLight = new THREE.PointLight(0xfff8d6, 5, 500);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
scene.add(ambientLight);

// grouping the entire system to control positions and add elements
const solarSystem = new THREE.Group();
scene.add(solarSystem);

// Sun
const sunTexture = loader.load('textures/sun.jpg');
const sunSize = new THREE.SphereGeometry(20, 64, 64);
const sunColour = new THREE.MeshBasicMaterial({ map: sunTexture });
const sun = new THREE.Mesh(sunSize, sunColour);
solarSystem.add(sun);
