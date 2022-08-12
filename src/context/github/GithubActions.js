const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// Get search users
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await fetch(`${GITHUB_URL}/search/users?${params}`);

  const { items } = await response.json();

  return items;
};

// Get search users
export const getUser = async (login) => {
  const response = await fetch(`${GITHUB_URL}/users/${login}`);

  if (response.status === 404) {
    window.location = '/notfound';
  } else {
    const data = await response.json();

    return data;
  }
};

// Get user repos
export const getUserRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  });

  const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`);

  const data = await response.json();

  return data;
};

// FETCH USERS: Get initial users for testing purposes
const fecthUsers = async () => {
  const response = await fetch(`${GITHUB_URL}/users`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  const data = await response.json();
};
