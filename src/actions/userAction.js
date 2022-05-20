import * as api from '../api/api'
import { loginStart, loginSuccess, loginFailure } from '../redux/userReducer.js'
export const login = async (formData, dispatch) => {
  dispatch(loginStart());
  try {
    const { data } = await api.login(formData);
    const { userId, isAdmin, token } = data;
    if (isAdmin === 1) {
      dispatch(loginSuccess({ userId, isAdmin, token }))
      localStorage.setItem('jg_admin', JSON.stringify({ user: { userId, isAdmin, token } }))
    } else {
      throw new Error("You are not authenticated")
    }
  } catch (error) {
    dispatch(loginFailure())
    alert(error);
  }
}

// export const registerUser = async (formData, navigate) => {
//   try {
//     const result = await api.registerUser(formData);
//     navigate("/login")
//   } catch (error) {
//     console.log(error);
//   }
// }