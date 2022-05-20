import { getApiInstance } from ".";

const api = getApiInstance();

async function getAllPosts(success, fail) {
  await api.get(`/board`).then(success).catch(fail);
}

async function getPost(code, success, fail) {
  await api.get(`/board/${code}`).then(success).catch(fail);
}

export { getAllPosts, getPost };
