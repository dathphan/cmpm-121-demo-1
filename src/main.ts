import "./style.css";

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
button.innerHTML = "<h1>🐯</h1>";
button.addEventListener("click", onButtonPress);
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

let description = document.createElement("div");
app.append(description);

upgrades.forEach((u) => {
    u.button.innerHTML = u.name + " [" + parseFloat(u.cost.toFixed(3)).toString() + "]";
    u.button.addEventListener("click", () => {
      upgradeAutoclick(u.upgrade, u.cost);
      u.count++;
      u.cost *= inflationRate;
    });
    u.button.addEventListener("mouseenter", () => {
      description.innerHTML = u.description;
    });
    u.button.addEventListener("mouseleave", () => {
      description.innerHTML = "...";
    });
    app.append(u.button);
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
    "<h2>Purr Frequency: </h2><h1>" + counter.toFixed(3) + "</h1>";
}

function updateButtons() {
  upgrades.forEach((u) => {
    u.button.disabled = counter < u.cost;
    u.button.innerHTML = u.name + " [" + parseFloat(u.cost.toFixed(3)).toString() + "]";
  });
}

function updateStatus() {
  let text: string = "";
  text += "<h3>" + parseFloat(autoClickRate.toFixed(1)).toString() + " tigers/sec</h3>";
  upgrades.forEach((u) => {
    text += u.count + " " + u.name + (u.count != 1 ? "s<br>" : "<br>");
  });
  upgradeStatus.innerHTML = text;
}