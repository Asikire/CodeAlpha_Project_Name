let display = document.getElementById("display");
let memory = 0; //Variable pour stocker la memoire

function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = display.value.toString().slice(0, -1);
}

function calculate() {
  try {
    const result = eval(display.value);
    display.value = result;
  } catch (error) {
    display.value = "Erreur";
  }
}

//Fonction pour memoriser le resultat
function memoryStore() {
  memory = parseFloat(display.value);
}

//Fonction pour rappeler la memoire
function memoryRecall() {
  if (!isNaN(memory)) {
    display.value += memory;
  }
}

//Fonction pour effacer la memoire
function Clear() {
  display.value = "";
  memory = 0;
}
