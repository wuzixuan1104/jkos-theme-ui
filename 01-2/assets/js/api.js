import { UserModel } from '../js/model'

export const loginApi = async (username, password) => {
  console.log(username, password)
  try {
    let user = await getUserByAccount(username);
    if (!user) {
      let err = new Error('User not found');
      err.context = username;
      err.status = 400;
      throw err;
    }
    return user;
  } catch(e) {
    throw e;
  }
}

export const registerUser = async (username, password) => {
  try {
    let user = await getUserByAccount(username);
    if (!user) {
      throw new Error('That account already exists');
    }
    // create user
    // ...
    return user;
  } catch(e) {
    throw err;
  }
}

// common function
const getUserByAccount = async (username) => {
  try {
    const user = await UserModel.findByAccount(username)
    console.log('user', user);
    
    // if (!user) {
    //   const err = new Error('User not found');
    //   err.context = username;
    //   err.status = 404;
    //   throw err;
    // }
    return user || null;
  } catch(e) {
    // helper: logger.error()
    console.error(e);
    throw e;
  }
}

