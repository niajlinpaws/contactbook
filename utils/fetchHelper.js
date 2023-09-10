const BASE_URL =
  //
  'https://prime-chess-397807.el.r.appspot.com/';
//||
// 'http://localhost:8000/';
// ||
// 'https://encouraging-sneakers-mite.cyclic.cloud/';
export default async function fetchAPI({
  contentType,
  endpoint,
  method,
  payload,
}) {
  return await fetch(`${BASE_URL}${endpoint}`, {
    body: payload,
    method,
    headers: contentType || new Headers({ 'Content-Type': 'application/json' }),
  })
    .then((res) => res.json())
    .then((res) => ({ res }))
    .catch((err) => ({ err }));
}
