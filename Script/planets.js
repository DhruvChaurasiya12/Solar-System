// Planet data
const planetData = [
  { name: "Mercury", texture: "mercury.jpg", distance: 25, size: 0.8 },
  { name: "Venus",   texture: "venus.jpg",   distance: 35, size: 1.2 },
  { name: "Earth",   texture: "earth.jpg",   distance: 45, size: 1.23 },
  { name: "Mars",    texture: "mars.jpg",    distance: 55, size: 1 },
  { name: "Jupiter", texture: "jupiter.jpg", distance: 70, size: 6 },
  { name: "Saturn",  texture: "saturn.jpg",  distance: 85, size: 5 },
  { name: "Uranus",  texture: "uranus.jpg",  distance: 100, size: 2.4 },
  { name: "Neptune", texture: "neptune.jpg", distance: 115, size: 2.2 }
];

const planets = [];
const speeds = {};
const angles = {};
const tiltAngle = 0.4;
const labels = [];

// planet and their orbits
planetData.forEach(data => {
  const texture = loader.load(`textures/${data.texture}`);
  const size = new THREE.SphereGeometry(data.size, 64, 64);
  const colour = new THREE.MeshStandardMaterial({ map: texture });
  const mesh = new THREE.Mesh(size, colour);
  solarSystem.add(mesh);

  // Orbit
  const orbitSize = new THREE.RingGeometry(data.distance - 0.1, data.distance + 0.1, 128);
  const orbitColour = new THREE.MeshBasicMaterial({ color: 0x616161, side: THREE.DoubleSide });
  const orbit = new THREE.Mesh(orbitSize, orbitColour);
  orbit.rotation.x = Math.PI / 2 - tiltAngle;
  solarSystem.add(orbit);

  // Label -> names
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.color = 'white';
  div.style.fontSize = '14px';
  div.style.fontFamily = 'Arial, sans-serif';
  div.style.pointerEvents = 'none';
  div.style.display = 'none';
  div.innerText = data.name;
  document.body.appendChild(div);
  labels.push({ element: div, mesh });

  // for saturn ring
  if (data.name === "Saturn") {
    const ringInnerRadius = data.size + 0.5;
    const ringOuterRadius = data.size + 2.5;

    const ringGeometry = new THREE.RingGeometry(ringInnerRadius, ringOuterRadius, 64);
    const ringTexture = loader.load('textures/saturn_ring.png');
    const ringMaterial = new THREE.MeshBasicMaterial({
      map: ringTexture,
      side: THREE.DoubleSide,
      transparent: true
    });

    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(0, 0, 0);

    mesh.add(ring);
  }

  planets.push({ mesh, distance: data.distance, name: data.name });
  speeds[data.name] = 0.005 + Math.random() * 0.01;
  angles[data.name] = Math.random() * Math.PI * 2;
  createSlider(data.name);
});