import "./style.css";

let counter: number = 0;

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

// Start
setInterval(changeCount, 1000, 1)

function onButtonPress() {
    changeCount(1);
}

function changeCount(change: number = 1) {
    counter += change
    updateCounter();
}

function updateCounter() {
    counterDisplay.innerHTML = "Tigers: " + counter;
}