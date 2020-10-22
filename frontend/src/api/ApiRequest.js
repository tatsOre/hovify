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
  })
  const result = await response.json();
  //console.log("-->" + JSON.stringify(result))
  return result
};
  /* Login implementation
 const login = {
    "username": "juanllano93@gmail.com",
    "password": "123456"
  };

  useEffect(() => {
    getLogin(JSON.stringify(login))
    .then(response => console.log(response.token))
    .catch()
  }, []);
  */


const getUser = token => {
    const user = fetch('https://hovify.herokuapp.com/api/v1/curriculum/', {
            headers: {
                'Authorization': token,
                'Content-Type' : 'application/json',
            }
    })
    return user;
}

export { getLogin, getUser };