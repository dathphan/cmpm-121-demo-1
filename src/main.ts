import "./style.css";

let counter: number = 0;
let autoClickRate: number = 0;
const upgradeCost: number = 10;
let prevTimestep: number = -1;

const MILI_TO_SEC: number = 1000;

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My okay game :3";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "🐯";
button.addEventListener("click", onButtonPress);
app.append(button);

const counterDisplay = document.createElement("div");
updateCounter();
app.append(counterDisplay);

const upgrade = document.createElement("button");
upgrade.innerHTML = "more tigers pls";
upgrade.addEventListener("click", upgradeAutoclick);
app.append(upgrade);

// Start
requestAnimationFrame(autoClick);

function onButtonPress() {
  changeCount(1);
}

function changeCount(change: number = 1) {
  counter += change;
  updateCounter();
  upgrade.disabled = counter < upgradeCost;
}

function upgradeAutoclick() {
  autoClickRate += 1;
  counter -= upgradeCost;
}

function autoClick(timestep: number) {
  if (prevTimestep < 0) {
    prevTimestep = timestep;
  }
  const deltaTime = timestep - prevTimestep;
  prevTimestep = timestep;

  console.log(autoClickRate);
  changeCount((autoClickRate * deltaTime) / MILI_TO_SEC);
  requestAnimationFrame(autoClick);
}

function updateCounter() {
  counterDisplay.innerHTML = "Tigers: " + counter.toFixed(3);
}
