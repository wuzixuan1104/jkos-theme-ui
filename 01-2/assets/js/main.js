import '../css/style.css'
import { loginApi } from '../js/api.js'
import { TokenExpiredError } from '../js/error'

const ISEXPIRED = true;

const form = document.getElementById('app');

form.addEventListener('submit', function(e) {
  e.preventDefault()

  let username = document.getElementById("username");
  let password = document.getElementById("password");

  const usernameVal =username.value;
  const passwordVal = password.value;

  try {
    validateForm(usernameVal, passwordVal)

    if (ISEXPIRED) {
      throw new TokenExpiredError()
    }

    loginApi(usernameVal, passwordVal).then((res) => {
      alert('login success!!')
      console.log(res);
      
    }).catch((e) => {
      alert('login fail')
      console.log(e);
    })
  } catch(e) {
    console.error(e);
    alert('message: ' + e.message )
  }
})

const validateForm = (username, password) => {
  if (!username || !password) {
    throw new Error('帳號及密碼必填')
  }

  if (username.length > 10) {
    throw new RangeError('帳號不能超過 10 碼')
  }
  
  if (Number(username)) {
    throw new TypeError('帳號不能只包含數字')
  }
}


