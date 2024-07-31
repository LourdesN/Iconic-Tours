function myFunction() {
  let x = document.getElementById("mynav");
  if (x.className === "navbar") {
    x.className += " responsive";
  } else {
    x.className = "navbar";
  }
}

const sections = document.querySelectorAll("section");

function activateSection(section) {
  let windowHeight = window.innerHeight;
  let sectionRectTop = section.getBoundingClientRect().top;

  if (sectionRectTop < windowHeight) {
    section.classList.add("active");

    let reveals = section.querySelectorAll(".reveal");
    reveals.forEach((reveal, index) => {
      const delay = 600;
      setTimeout(() => {
        reveal.classList.add("active");
      }, index * delay);
    });
  }
}

window.addEventListener("load", () => {
  sections.forEach(section => activateSection(section));
});

window.addEventListener("scroll", () => {
  sections.forEach(section => activateSection(section));
});

// Search bar activation
// Set minimum date for date inputs to today's date
function setMinDate() {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('start-date').setAttribute('min', today);
  document.getElementById('end-date').setAttribute('min', today);
}

document.addEventListener('DOMContentLoaded', (event) => {
  setMinDate();
});
document.getElementById('tour-search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  let location = document.getElementById('location').value;
  let startDate = document.getElementById('start-date').value;
  let endDate = document.getElementById('end-date').value;
  
  fetch(`http://localhost:3000/api/tours?location=${encodeURIComponent(location)}&start_date=${startDate}&end_date=${endDate}`)
      .then(response => response.json())
      .then(data => {
          displayResults(data);
      })
      .catch(error => console.error('Error:', error));
});

function displayResults(data) {
  let resultsDiv = document.getElementById('search-results');
  resultsDiv.innerHTML = '';

  if (data.length === 0) {
      resultsDiv.innerHTML = '<h3>No tours found.  &#128542;</h3>';
  } else {
      data.forEach(tour => {
          let tourElement = document.createElement('div');
          tourElement.innerHTML = `
              <h3>&#11088; ${tour.location} &#11088;</h3>
              <p>${tour.description}</p>
              <p>Places to visit: ${tour.visit}</p>
          `;
          resultsDiv.appendChild(tourElement);
      });
  }
}
