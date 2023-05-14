const events = [
  {
    flyer: "./assets/default.jpg", // Add flyer image here
    title: "Cate Kennan | Colby Nathan | Asha Tamirisa",
    date: "Wednesday: 5/17",
  },
  {
    flyer: "./assets/may18-23.jpg", // Add flyer image here
    title: "Open Mic Night",
    date: "Thursday: 5/18",
  },
  {
    flyer: "./assets/may19-23.jpg", // Add flyer image here
    title: "House of Harm | Pleasure Coffin | Goiter | Spriggan",
    date: "Tuesday: 5/23",
  },
  {
    flyer: "./assets/may24-23.jpg", // Add flyer image here
    title: "Dead Shakers | Red Eft | Lake Over Fire | Stadiums",
    date: "Wednesday: 5/24",
  },
  {
    flyer: "./assets/may25-23.jpg", // Add flyer image here
    title: "Myles Bullen | Spoken Nerd | Soultru | FolkPunkDad",
    date: "Thursday: 5/25",
  },
  {
    flyer: "./assets/default.jpg", // Add flyer image here
    title: "Going 2 Hell | TBD",
    date: "Friday: 5/26",
  },
];

// Function to create event elements
function createEventElement(event) {
  var eventElement = document.createElement("div");
  eventElement.className = "event";

  var flyerElement = document.createElement("img");
  flyerElement.className = "flyer";
  flyerElement.src = event.flyer;

  var contentElement = document.createElement("div");
  contentElement.className = "content";

  var titleElement = document.createElement("div");
  titleElement.className = "title";
  titleElement.textContent = event.title;

  var dateElement = document.createElement("div");
  dateElement.className = "date";
  dateElement.textContent = event.date;

  eventElement.appendChild(flyerElement);
  contentElement.appendChild(dateElement);
  contentElement.appendChild(titleElement);
  eventElement.appendChild(contentElement);

  return eventElement;
}

// Function to populate the event list
function populateEventList() {
  var eventListElement = document.getElementById("event-list");

  events.forEach(function (event) {
    var eventElement = createEventElement(event);
    eventListElement.appendChild(eventElement);
  });
}

// Call the function to populate the event list
populateEventList();
