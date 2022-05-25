import { getApiInstance } from ".";

const api = getApiInstance();

async function getBaseAddress(success, fail) {
  await api.get(`/search`).then(success).catch(fail);
}

async function getAllHouses(dongCode, success, fail) {
  await api.post(`/search`, dongCode).then(success).catch(fail);
}

async function getAllHouseDeals(aptCode, success, fail) {
  await api.get(`/search/${aptCode}`).then(success).catch(fail);
}

async function getHouse(aptCode, success, fail) {
  await api.get(`/search/info/${aptCode}`).then(success).catch(fail);
}

async function addWish(wish, success, fail) {
  await api.post(`/user/addwish`, wish).then(success).catch(fail);
}

async function deleteWish(wish, success, fail) {
  await api.post(`/user/deletewish`, wish).then(success).catch(fail);
}

export {
  getBaseAddress,
  getAllHouses,
  getAllHouseDeals,
  getHouse,
  addWish,
  deleteWish,
};
