const BASE_URL = 'https://encouraging-sneakers-mite.cyclic.cloud/';

export default async function fetchAPI({ endpoint, method, payload }) {
  return await fetch(`${BASE_URL}${endpoint}`, {
    body: JSON.stringify(payload),
    method,
    headers: new Headers({ 'content-type': 'application/json' }),
  })
    .then((res) => res.json())
    .then((res) => ({ res }))
    .catch((err) => ({ err }));
}
