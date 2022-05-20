import { getApiInstance } from ".";

const api = getApiInstance();

async function getAllPosts(success, fail) {
  return await api.get(`/board`).then(success).catch(fail);
}

export { getAllPosts };
