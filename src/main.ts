import "./style.css";

// 3 Changes:
// - Renamed some `u` in the for-loops
// - made createUpgradeButton as its own function
// - shortened autoclick() by moving some of it to calculateDeltaTime()

// Variables
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
button.innerHTML = "🐯";
button.classList.add("tiger");
button.addEventListener("click", onButtonPress);
buttonAnimation(button);

app.append(button);

const counterDisplay = document.createElement("div");
updateCounter();
app.append(counterDisplay);

// Upgrades
interface Item {
  cost: number;
  upgrade: number;
  name: string;
  description: string;
  button: HTMLButtonElement;
  count: number;
}

const tier1: Item = {
  cost: 10,
  upgrade: 0.1,
  name: "Rub",
  description: "relaxing :)",
  button: document.createElement("button"),
  count: 0,
};

const tier2: Item = {
  cost: 100,
  upgrade: 2.0,
  name: "Brush",
  description: "calm and soothing :D",
  button: document.createElement("button"),
  count: 0,
};

const tier3: Item = {
  cost: 350,
  upgrade: 15,
  name: "Snack",
  description: "homemade. delicious, tasty, juicy :3",
  button: document.createElement("button"),
  count: 0,
};

const tier4: Item = {
  cost: 1000,
  upgrade: 50,
  name: "Pillow",
  description: "very soff and fluffy :3c",
  button: document.createElement("button"),
  count: 0,
};

const tier5: Item = {
  cost: 9000,
  upgrade: 9000,
  name: "Purr Master 9000",
  description: "The true endgame for any feline. >:3",
  button: document.createElement("button"),
  count: 0,
};

const upgrades: Item[] = [tier1, tier2, tier3, tier4, tier5];

const description = document.createElement("div");
app.append(description);

upgrades.forEach((upgrade) => {
  createUpgradeButton(upgrade);
});

app.append(description);

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
  const deltaTime = calculateDeltaTime(timestep);

  changeCount((autoClickRate * deltaTime) / MILI_TO_SEC);
  requestAnimationFrame(autoClick);
}

function calculateDeltaTime(timestep: number): number {
  if (prevTimestep < 0) {
    prevTimestep = timestep;
  }

  const deltaTime = timestep - prevTimestep;
  prevTimestep = timestep;

  return deltaTime;
}

function updateCounter() {
  counterDisplay.innerHTML =
    "<h2>Purr Frequency: </h2><h1>" + counter.toFixed(3) + "</h1>";
}

function updateButtons() {
  upgrades.forEach((upgrade) => {
    upgrade.button.disabled = counter < upgrade.cost;
    upgrade.button.innerHTML =
      upgrade.name +
      " [" +
      parseFloat(upgrade.cost.toFixed(3)).toString() +
      "]";
  });
}

function updateStatus() {
  let text: string = "";
  text +=
    "<h3>" +
    parseFloat(autoClickRate.toFixed(1)).toString() +
    " tigers/sec</h3>";
  upgrades.forEach((upgrade) => {
    text +=
      upgrade.count +
      " " +
      upgrade.name +
      (upgrade.count != 1 ? "s<br>" : "<br>");
  });
  upgradeStatus.innerHTML = text;
}

function createUpgradeButton(upgrade: Item): void {
  // Label upgrade and price
  upgrade.button.innerHTML =
    upgrade.name + " [" + parseFloat(upgrade.cost.toFixed(3)).toString() + "]";

  // Event Listeners
  upgrade.button.addEventListener("click", () => {
    upgradeAutoclick(upgrade.upgrade, upgrade.cost);
    upgrade.count++;
    upgrade.cost *= inflationRate;
  });
  upgrade.button.addEventListener("mouseenter", () => {
    description.innerHTML = upgrade.description;
  });
  upgrade.button.addEventListener("mouseleave", () => {
    description.innerHTML = "...";
  });

  app.append(upgrade.button);
}

function buttonAnimation(button: HTMLButtonElement): void {
  button.addEventListener("mousedown", () => {
    button.style.transform = "scale(0.95)"
  });

  button.addEventListener("mouseup", () => {
    button.style.transform = "scale(1)"
  });
}