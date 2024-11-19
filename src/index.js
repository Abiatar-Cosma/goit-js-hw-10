const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

/**
 * Afișează sau ascunde loader-ul
 * @param {boolean} show - Dacă true, afișează loader-ul
 */
const toggleLoader = show => {
  loader.classList.toggle('hidden', !show);
};

/**
 * Afișează sau ascunde mesajul de eroare
 * @param {boolean} show - Dacă true, afișează eroarea
 */
const toggleError = show => {
  error.classList.toggle('hidden', !show);
};

import { fetchBreeds, fetchCatByBreed } from './cat-api';

const populateBreeds = async () => {
  try {
    toggleLoader(true);
    toggleError(false);

    const breeds = await fetchBreeds();
    breedSelect.innerHTML = breeds
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');
  } catch {
    toggleError(true);
  } finally {
    toggleLoader(false);
  }
};

// Populează selectorul la încărcarea paginii
populateBreeds();

const showCatInfo = async breedId => {
  try {
    toggleLoader(true);
    toggleError(false);
    catInfo.innerHTML = ''; // Golește conținutul anterior

    const cat = await fetchCatByBreed(breedId);
    catInfo.innerHTML = `
      <div class="cat-container">
        <img src="${cat.url}" alt="Cat image" class="cat-image">
        <div class="cat-details">
          <h2>${cat.breeds[0].name}</h2>
          <p>${cat.breeds[0].description}</p>
          <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
        </div>
      </div>
    `;
  } catch {
    toggleError(true);
  } finally {
    toggleLoader(false);
  }
};

// Adaugă eveniment pentru schimbarea rasei
breedSelect.addEventListener('change', event => {
  const breedId = event.target.value;
  if (breedId) {
    showCatInfo(breedId);
  }
});

import './sass/index.scss';
