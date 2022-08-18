import * as api from "../api/api";
import {
    loginStart,
    loginSuccess,
    loginFailure,
} from "../redux/userReducer.js";
export const login = async (formData, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await api.login(formData);
        const { userId, isAdmin, firstName } = res?.data;
        if (isAdmin === 1) {
            dispatch(loginSuccess({ userId, isAdmin, firstName }));
            localStorage.setItem(
                "jg_admin",
                JSON.stringify({
                    user: {
                        userId,
                        isAdmin,
                        firstName,
                        expires: new Date(
                            new Date().getTime() + 2 * 60 * 60 * 1000
                        ),
                    },
                })
            );
        } else {
            throw new Error("You are not authenticated");
        }
    } catch (error) {
        dispatch(loginFailure());
        alert(error.response?.data || error.message);
    }
};

// export const registerUser = async (formData, navigate) => {
//   try {
//     const result = await api.registerUser(formData);
//     navigate("/login")
//   } catch (error) {
//     console.log(error);
//   }
// }
