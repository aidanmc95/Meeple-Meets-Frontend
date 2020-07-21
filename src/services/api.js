const API_ROOT = `http://localhost:3000/api/v1`;
const NON_AUTH_API_ROOT = `http://localhost:3000`;

const token = () => localStorage.getItem("token");

const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token()
  };
};

const login = data => {
  return fetch(`${API_ROOT}/auth`,{
    method:"POST",
    headers: headers(),
    body: JSON.stringify(data)
  })
  .then(res => res.json())

};
  
const getCurrentUser = () => {
  return fetch(`${API_ROOT}/current_user`,{
    headers:headers()
  }).then(res => res.json())
};

const signUp = data => {
  console.log(JSON.stringify(data))
  return fetch(`${API_ROOT}/users`,{
    method:"POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      user: data
    })
  })
  .then(res => res.json())
};

const getBoardgames = () => {
  return fetch(`${NON_AUTH_API_ROOT}/boardgames`)
  .then(res => res.json())
}

const getBoardgame = (id) => {
  return fetch(`${NON_AUTH_API_ROOT}/boardgames/${id}`)
  .then(res => res.json())
}

const getMeets = () => {
  return fetch(`${NON_AUTH_API_ROOT}/meets`)
  .then(res => res.json())
}

const getMeet = (id) => {
  return fetch(`${NON_AUTH_API_ROOT}/meets/${id}`)
  .then(res => res.json())
}
  
export const api = {
  auth: {
    login,
    getCurrentUser,
    signUp
  },
  nonauth: {
    getBoardgames,
    getBoardgame,
    getMeets,
    getMeet
  }
};