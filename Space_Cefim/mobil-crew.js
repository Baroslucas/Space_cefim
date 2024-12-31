const crewMembers = [
  {
    name: "DOUGLAS HURLEY",
    grade: "COMMANDER",
    description:
      "Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.",
    image: "./Assets/Img/Photo Crew A.svg",
  },
  {
    name: "MARK SHUTTLEWORTH",
    grade: "MISSION SPECIALIST",
    description:
      "Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.",
    image: "./Assets/Img/Photo Crew B.svg",
  },
  {
    name: "VICTOR GLOVER",
    grade: "PILOT",
    description:
      "Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18.He was a crew member of Expedition 64, and served as a station systems flight engineer. ",
    image: "./Assets/Img/Photo Crew C.svg",
  },
  {
    name: "ANOUSHEH ANSARI",
    grade: "FLIGHT ENGINEER",
    description:
      "Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space. ",
    image: "./Assets/Img/Photo Crew D.svg",
  },
];

let currentIndex = 0;

// Changement d'affichage de membre d'équipage
function updateCrewInfo() {
  const crew = crewMembers[currentIndex];
  document.getElementById("name").textContent = crew.name;
  document.getElementById("grade").textContent = crew.grade;
  document.getElementById("description").textContent = crew.description;
  document.querySelector(".crew-member img").src = crew.image;
}

// Changement d'état des spans
function updateSpan() {
  const spans = document.querySelectorAll(".span-container span");
  spans.forEach((span, index) => {
    if (index === currentIndex) {
      span.classList.add("actif");
    } else {
      span.classList.remove("actif");
    }
  });
}

// Changement de membre d'équipage après mouvement + span
function changeCrewMember(direction) {
  if (direction === "next") {
    currentIndex = (currentIndex + 1) % crewMembers.length;
  } else if (direction === "prev") {
    currentIndex = (currentIndex - 1 + crewMembers.length) % crewMembers.length;
  }
  updateCrewInfo();
  updateSpan();
}

// Initialisation des variables pour glissement du doigt du user
let touchStartX = 0;
let touchEndX = 0;

// Detection du glissement de doigt
function handleSwipe() {
  if (touchEndX < touchStartX) {
    changeCrewMember("next");
  }

  if (touchEndX > touchStartX) {
    changeCrewMember("prev");
  }
}

const crewInfoElement = document.getElementById("crew-member");

// Pour les tactiles
crewInfoElement.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

crewInfoElement.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

// Pour les ordis
let mouseStartX = 0;
let mouseEndX = 0;

crewInfoElement.addEventListener("mousedown", (e) => {
  mouseStartX = e.screenX;
});

crewInfoElement.addEventListener("mouseup", (e) => {
  mouseEndX = e.screenX;
  if (mouseEndX < mouseStartX) {
    // Glissement à gauche (next member)
    changeCrewMember("next");
  }

  if (mouseEndX > mouseStartX) {
    // Glissement à droite (previous member)
    changeCrewMember("prev");
  }
});

// Initialisation du carrousel avec le premier membre + span
updateCrewInfo();
updateSpan();
