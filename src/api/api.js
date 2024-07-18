const API_KEY = '33019590-ab19fb063f714cb66ad378ea8';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(q, page) {
  console.log('роблю fetch, page: ', page);

  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${q}&image_type="photo"&orientation="horizontal"&safesearch="true"&per_page=20&page=${page}`
  ).then(resp => resp.json());
}
export async function asyncfetchImages(q, page) {
  const resp = await fetch(
    `${BASE_URL}?key=${API_KEY}&q=${q}&image_type="photo"&orientation="horizontal"&safesearch="true"&per_page=20&page=${page}`
  ).then(resp => resp.json());
  const data = resp.data;

  return data;
}
