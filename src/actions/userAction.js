import * as api from '../api/api'
import { loginUser } from '../redux/userReducer.js'
export const login = async (formData, setIsSuccess, dispatch, navigate) => {
  try {
    const { data } = await api.login(formData);
    setIsSuccess(true)
    const { userId, isAdmin, token } = data;
    localStorage.setItem('jg_admin', JSON.stringify({ user: { userId, isAdmin, token } }))
    dispatch(loginUser({ userId, isAdmin }))
    setTimeout(() => {
      navigate("/")
    }, 3000);
  } catch (error) {
    alert(error.response?.data);
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