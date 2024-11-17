import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_TDJ27os0owz93X7HMnZm7llIgUcHeOjrL0Nr13UN7ujQa8x2FcBl1AgZQ4bzrDql';

/**
 * Funcție pentru obținerea listei de rase
 * @returns {Promise<Array>} - Lista de rase
 */
export const fetchBreeds = async () => {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/breeds');
      return response.data;
    } catch (error) {
      throw new Error('Nu s-a putut obține lista de rase.');
    }
  };

  /**
 * Funcție pentru obținerea detaliilor despre o rasă
 * @param {string} breedId - ID-ul rasei
 * @returns {Promise<Object>} - Detalii despre pisică
 */
export const fetchCatByBreed = async (breedId) => {
    try {
      const response = await axios.get(
        `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
      );
      return response.data[0];
    } catch (error) {
      throw new Error('Nu s-au putut obține informațiile despre pisică.');
    }
  };
  