import "./style.css";

let counter: number = 0;
let autoClickRate: number = 0;
let prevTimestep: number = -1;

const inflationRate: number = 1.15;
const MILI_TO_SEC: number = 1000;

// Web Page
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Pet The Really Big Kitty";
document.title = gameName;

const header = document.createElement("h2");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "<h1>🐯</h1>";
button.addEventListener("click", onButtonPress);
app.append(button);

const counterDisplay = document.createElement("div");
updateCounter();
app.append(counterDisplay);

// Upgrades
type Upgrade = {
  cost: number;
  upgrade: number;
  name: string;
  button: HTMLButtonElement;
  count: number;
};

const tier1: Upgrade = {
  cost: 10,
  upgrade: 0.1,
  name: "Rub",
  button: document.createElement("button"),
  count: 0,
};

const tier2: Upgrade = {
  cost: 100,
  upgrade: 2.0,
  name: "Brush",
  button: document.createElement("button"),
  count: 0,
};

const tier3: Upgrade = {
  cost: 1000,
  upgrade: 50,
  name: "Snack",
  button: document.createElement("button"),
  count: 0,
};

const upgrades: Upgrade[] = [tier1, tier2, tier3];

upgrades.forEach((u) => {
  u.button.innerHTML =
    u.name + " [" + parseFloat(u.cost.toFixed(3)).toString() + "]";
  u.button.addEventListener("click", () => {
    upgradeAutoclick(u.upgrade, u.cost);
    u.count++;
    u.cost *= inflationRate;
    u.button.innerHTML =
      u.name + " [" + parseFloat(u.cost.toFixed(3)).toString() + "]";
  });
  app.append(u.button);
});

const upgradeStatus = document.createElement("div");
updateStatus();
app.append(upgradeStatus);

// Start
requestAnimationFrame(autoClick);

// Functions
function onButtonPress() {
  changeCount(1);
}

function changeCount(change: number = 1) {
  counter += change;
  updateCounter();
  updateButtons();
}

function upgradeAutoclick(change: number = 1, cost: number = 10) {
  autoClickRate += change;
  counter -= cost;
  updateStatus();
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
  counterDisplay.innerHTML =
    "<h2>Purr Frequency: </h2><h1>" +
    parseFloat(counter.toFixed(3)).toString() +
    "</h1>";
}

function updateButtons() {
  upgrades.forEach((u) => {
    u.button.disabled = counter < u.cost;
  });
}

function updateStatus() {
  let text: string = "";
  text +=
    "<h3>" +
    parseFloat(autoClickRate.toFixed(1)).toString() +
    " tigers/sec</h3>";
  upgrades.forEach((u) => {
    text += u.count + " " + u.name + (u.count != 1 ? "s<br>" : "<br>");
  });
  upgradeStatus.innerHTML = text;
}
