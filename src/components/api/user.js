import { getApiInstance } from ".";

const api = getApiInstance();

async function signUp(user, success, fail) {
  return await api.post(`/user/signup`, user).then(success).catch(fail);
}

async function signIn(user, success, fail) {
  return await api.post(`/user/login`, user).then(success).catch(fail);
}

async function signInKakao(code, success, fail) {
  return await api.get(`/user/kakao?code=${code}`).then(success).catch(fail);
}

async function withdrawUser(no, success, fail) {
  return await api.post(`/user/delete`, no).then(success).catch(fail);
}

async function updateUser(user, success, fail) {
  return await api.post(`/user/update`, user).then(success).catch(fail);
}

async function getUserByNo(no, success, fail) {
  await api.get(`/user/${no}`).then(success).catch(fail);
}

async function refreshUser(success, fail) {
  return await api.get(`/user/refresh`).then(success).catch(fail);
}

async function logoutUser(success, fail) {
  return await api.get(`/user/logout`).then(success).catch(fail);
}

async function ping(success, fail) {
  await api.get(`/user/ping`).then(success).catch(fail);
}

async function getWishlist(email, success, fail) {
  await api.post(`/user/wishlist`, email).then(success).catch(fail);
}

async function getWishInfo(wishlist, success, fail) {
  await api.post(`/search/wishinfo`, wishlist).then(success).catch(fail);
}

export {
  signUp,
  signIn,
  signInKakao,
  withdrawUser,
  updateUser,
  getUserByNo,
  refreshUser,
  logoutUser,
  ping,
  getWishlist,
  getWishInfo,
};
