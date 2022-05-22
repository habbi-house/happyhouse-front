import { getApiInstance } from ".";

const api = getApiInstance();

async function signUp(user, success, fail) {
  await api.post(`/user/signup`, user).then(success).catch(fail);
}

async function signIn(user, success, fail) {
  await api.post(`/user/login`, user).then(success).catch(fail);
}

async function withdrawUser(no, success, fail) {
  await api.post(`/user/delete`, no).then(success).catch(fail);
}

async function updateUser(user, success, fail) {
  console.log(user);
  await api.post(`/user/update`, user).then(success).catch(fail);
}

export { signUp, signIn, withdrawUser, updateUser };
