import { getApiInstance } from ".";

const api = getApiInstance();

async function signUp(user, success, fail) {
  await api.post(`/user/signUp`, user).then(success).catch(fail);
}

async function signIn(user, success, fail) {
  await api.post(`/user/login`, user).then(success).catch(fail);
}

export { signUp, signIn };
