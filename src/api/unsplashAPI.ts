import axios from 'axios';

const ACCESS_KEY = 'nCWhIG2kkYfa1sFLPwMs2Py8ff1Ma8fMK5eHfuqyrCQ'; // Додай свій ключ доступу
axios.defaults.baseURL = 'https://api.unsplash.com/';

interface UnsplashImage {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
}

interface FetchImagesResponse {
  results: UnsplashImage[];
  total: number;
}

export const fetchImages = async (query: string, page = 1): Promise<FetchImagesResponse> => {
  const response = await axios.get<FetchImagesResponse>('search/photos', {
    params: {
      query,
      page,
      per_page: 12,
      client_id: ACCESS_KEY,
    },
  });
  return response.data;
};
