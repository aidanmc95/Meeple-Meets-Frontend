// const API_ROOT = `http://localhost:3000/api/v1`;
// const NON_AUTH_API_ROOT = `http://localhost:3000`;
const API_ROOT = `https://meeple-meets-backend.herokuapp.com/api/v1`;
const NON_AUTH_API_ROOT = `https://meeple-meets-backend.herokuapp.com/`;

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

const createMeet = data => {
  return fetch(`${API_ROOT}/meets`,{
    method:"POST",
    headers: headers(),
    body: JSON.stringify(data)
  })
  .then(res => res.json())
}

const createInvite = data => {
  return fetch(`${API_ROOT}/invites`,{
    method:"POST",
    headers: headers(),
    body: JSON.stringify(data)
  })
  .then(res => res.json())
}

const updateInvite = (id, data) => {
  return fetch(`${API_ROOT}/invites/${id}`,{
    method:"PATCH",
    headers: headers(),
    body: JSON.stringify(data)
  })
  .then(res => res.json())
}

const deleteMeet = (id) => {
  return fetch(`${API_ROOT}/meets/${id}`,{
    method:"DELETE",
    headers: headers()
  })
  .then(res => res.json())
}

const addBoardgame = data => {
  return fetch(`${API_ROOT}/my_games`,{
    method:"POST",
    headers: headers(),
    body: JSON.stringify(data)
  })
  .then(res => res.json())
}

const getBoardgames = () => {
  return fetch(`${NON_AUTH_API_ROOT}/boardgames`)
  .then(res => res.json())
}

const getBoardgame = (id) => {
  return fetch(`${NON_AUTH_API_ROOT}/boardgames/${id}`)
  .then(res => res.json())
}

const getMeets = () => {
  return fetch(`${API_ROOT}/meets`)
  .then(res => res.json())
}

const getMeet = (id) => {
  return fetch(`${API_ROOT}/meets/${id}`,{
    method:"GET",
    headers: headers()
  })
  .then(res => res.json())
}

const getUser = (id) => {
  return fetch(`${API_ROOT}/users/${id}`)
  .then(res => res.json())
}

const createBrought = (data) => {
  return fetch(`${API_ROOT}/brought_games`,{
    method:"POST",
    headers: headers(),
    body: JSON.stringify(data)
  })
  .then(res => res.json())
}
  
export const api = {
  auth: {
    login,
    getCurrentUser,
    signUp,
    getUser,
    getMeets,
    getMeet,
    createMeet,
    createInvite,
    updateInvite,
    deleteMeet,
    addBoardgame,
    createBrought
  },
  nonauth: {
    getBoardgames,
    getBoardgame
  }
};