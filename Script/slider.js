function createSlider(name) {
  const panel = document.getElementById("control-panel");
  const label = document.createElement("label");
  label.innerText = `${name} Speed: `;
  label.style.color = "white";
  label.style.marginRight = "10px";

  const input = document.createElement("input");
  input.type = "range";
  input.min = "0";
  input.max = "0.05";
  input.step = "0.001";
  input.value = speeds[name];
  input.oninput = e => speeds[name] = parseFloat(e.target.value);

  input.addEventListener("mouseenter", () => {
    const labelObj = labels.find(l => l.mesh === planets.find(p => p.name === name).mesh);
    if (labelObj) labelObj.element.style.display = "block";
  });

  input.addEventListener("mouseleave", () => {
    const labelObj = labels.find(l => l.mesh === planets.find(p => p.name === name).mesh);
    if (labelObj) labelObj.element.style.display = "none";
  });

  const container = document.createElement("div");
  container.style.marginBottom = "6px";
  container.appendChild(label);
  container.appendChild(input);
  panel.appendChild(container);
}