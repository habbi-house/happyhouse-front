import { getApiInstance } from ".";

const api = getApiInstance();

async function getAllPosts(success, fail) {
  await api.get(`/board`).then(success).catch(fail);
}

async function getPost(code, success, fail) {
  await api.get(`/board/${code}`).then(success).catch(fail);
}

async function createPost(post, success, fail) {
  return await api.post(`/board/create`, post).then(success).catch(fail);
}

async function updatePost(post, success, fail) {
  return await api.post(`/board/update`, post).then(success).catch(fail);
}

async function deletePost(code, success, fail) {
  return await api.post(`/board/delete`, code).then(success).catch(fail);
}

export { getAllPosts, getPost, createPost, updatePost, deletePost };
