const API_KEY = '9a380a2f'; // Replace with your valid API key
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=comedy&type=movie`;

async function fetchComedyMovies() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.Response === "True") {
      displayMovies(data.Search); // `Search` contains the movie list
    } else {
      throw new Error(data.Error);
    }
  } catch (error) {
    console.error('Error fetching comedy movies:', error);
    document.getElementById('movies').innerHTML = '<p>Failed to load movies.</p>';
  }
}

function displayMovies(movies) {
  const moviesContainer = document.getElementById('movies');
  moviesContainer.innerHTML = ''; // Clear any existing content

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    movieCard.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200'}" alt="${movie.Title}">
      <div class="movie-title">${movie.Title}</div>
      <div class="movie-year">${movie.Year || 'Unknown Year'}</div>
    `;

    moviesContainer.appendChild(movieCard);
  });
}

// Initialize the script
fetchComedyMovies();
