const DAVID = 'https://run.mocky.io/v3/f6b0b9af-7488-4c3d-96e2-6aebbd498633'
const MARIA = 'https://run.mocky.io/v3/d2cd9783-93f5-402e-b5c7-af9c876e3588'
const TATIANA = 'https://run.mocky.io/v3/149e71ef-9987-48a1-b6b0-419e98eca752'

const getLogin = async (data) => {
  const response = await fetch('https://hovify.herokuapp.com/api/v1/login/', {
    method: 'POST',
    body: data, // data can be `string` or {object}!
    headers: {
        'Content-Type': 'application/json'
    }
  });
  const result = await response;
  //console.log("-->" + JSON.stringify(result))
  return result;
};

const getUser = async (token) => {
  const response = await fetch('https://hovify.herokuapp.com/api/v1/curriculum/', {
    headers: {
      'Authorization': token,
      'Content-Type' : 'application/json',
    }
  });
  const result = await response;
  //console.log("->user data \n" + JSON.stringify(result));
  return result;
}

const postUser = async (data, token) => {
  const response = await fetch('https://hovify.herokuapp.com/api/v1/curriculum/', {
    method: 'POST',
    body: data,
    headers: {
      'Authorization': token,
      'Content-Type' : 'application/json',
    }
  });
  const result = await response;
  return result;
}

const createAccount = async (data) => {
  const response = await fetch('https://hovify.herokuapp.com/api/v1/signup/', {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type' : 'application/json',
    }
  });
  const result = await response;
  //console.log("->user data \n" + JSON.stringify(result));
  return result;
}

const getProfile = async (data) => {
  const response = await fetch('https://hovify.herokuapp.com/api/v1/linkedindata/', {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type' : 'application/json',
    }
  });
  const result = await response;
  //console.log("->profile data \n");
  console.log(JSON.stringify(result));
  return result;
}

const getVacancies = async (data) => {
  const response = await fetch('https://hovify.herokuapp.com/api/v1/vacancies/', {
    method: 'GET'
  });
  const result = await response;
  //console.log("->profile data \n");
  console.log(JSON.stringify(result));
  return result;
}

/* Pending to move this into Home.js
  React.useEffect(() => {
    getVacancies()
    .then(response => {
      const dataVacancies = response.json()
      dataVacancies.then(data => {
        console.log(data)
      })
    })
  }, []);
*/

const getDashboard = async (token) => {
  const response = await fetch('https://hovify.herokuapp.com/api/v1/dashboard/', {
    method: 'GET',
    headers: {
      'Authorization': token,
      'Content-Type' : 'application/json',
    }
  });
  const result = await response;
  //console.log("->dashboard data \n");
  console.log(JSON.stringify(result));
  return result;
}

/*------ Implementing dashboar API ------*/
  /*React.useEffect(() => {
    getLogin(JSON.stringify(login))
    .then(response => {
      const objToken = response.json()
      objToken.then(data => {
		const uToken = "Token " + data.token
		console.log("Token" + uToken)
        getDashboard(uToken)
        .then(response => {
          const userDashboard = response.json()
          userDashboard.then(data => {
            console.log(data);
          })
        })
	  })
    })
    .catch()
  }, []);*/

export { getLogin, getUser, postUser, createAccount, getProfile, getVacancies, getDashboard };
