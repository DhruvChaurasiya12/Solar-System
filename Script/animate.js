// Animation Control
let isPlaying = true;
const toggleButton = document.getElementById("toggle-button");
if (toggleButton) {
  toggleButton.addEventListener("click", () => {
    isPlaying = !isPlaying;
    toggleButton.innerText = isPlaying ? "Pause" : "Play";
    if (isPlaying) animate();
  });
}

// Animation Loop
function animate() {
  if (!isPlaying) return;
  requestAnimationFrame(animate);

  planets.forEach((planet, i) => {
    const name = planet.name;
    angles[name] += speeds[name];

    planet.mesh.position.x = Math.cos(angles[name]) * planet.distance;
    planet.mesh.position.z = Math.sin(angles[name]) * planet.distance * Math.cos(tiltAngle);
    planet.mesh.position.y = Math.sin(angles[name]) * planet.distance * Math.sin(tiltAngle);

    // Update Label position
    const vector = new THREE.Vector3();
    vector.setFromMatrixPosition(planet.mesh.matrixWorld);
    vector.project(camera);

    const screenX = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const screenY = (-vector.y * 0.5 + 0.5) * window.innerHeight;
    labels[i].element.style.left = `${screenX}px`;
    labels[i].element.style.top = `${screenY - 20}px`;
  });

  renderer.render(scene, camera);
}

animate();
