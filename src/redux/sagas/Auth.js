import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import {
  AUTH_TOKEN,
  SIGNIN,
  SIGNOUT,
  SIGNUP,
  SIGNIN_WITH_GOOGLE,
  SIGNIN_WITH_FACEBOOK,
  APPOINTMENTS,
  DELETE_APPOINMENT,
  UPDATE_PROFILE,
  GET_APPOINTMENTS,
  PROFILE,
  CHANGE_PASSWORD,
  FORGET_PASSWORD_EMAIL,
  FORGET_PASSWORD,
  PAYMENT_METHOD,
  GET_PACKAGES,
  SELECT_PACKAGE,
} from "../constants/Auth";
import {
  showAuthMessage,
  authenticated,
  signOutSuccess,
  saveProfile,
  signUpSuccess,
  signInWithGoogleAuthenticated,
  signInWithFacebookAuthenticated,
  showLoading,
  saveAppointment,
  savePackage
} from "../actions/Auth";

import { BASE_URL } from "redux/store/baseUrl";
import FirebaseService from "services/FirebaseService";
import axios from "axios";
import { message } from "antd";
// import { userData } from 'redux/actions/UserState';

export function* signInWithFBEmail() {
  yield takeEvery(SIGNIN, function* ({ payload }) {
    // const { email, password } = payload;
    try {
      yield put(showLoading(true));
      const users = yield call(
        axios.post,
        `${BASE_URL}/users/auth/login`,
        payload
      );
      const { access_token, user } = users.data;
      yield put(showLoading(false));
      if (access_token && user.id) {
        message.success("Login Successfully");
        localStorage.setItem(AUTH_TOKEN, access_token);
        yield put(authenticated(users.data));
      }
    } catch (err) {
      message.error("Incorrect Email Or Password ");
      //   yield put(showAuthMessage(err));
      yield put(showLoading(false));
    }
  });
}

export function* signOut() {
  yield takeEvery(SIGNOUT, function* () {
    try {
      const signOutUser = yield call(FirebaseService.signOutRequest);
      if (signOutUser === undefined) {
        localStorage.removeItem(AUTH_TOKEN);
        localStorage.removeItem("is_theme_selected");
        localStorage.removeItem("selected_theme_id");
        localStorage.removeItem("is_package_selected");
        localStorage.removeItem("selected_theme_pages");
        yield put(signOutSuccess(signOutUser));
      } else {
        yield put(showAuthMessage(signOutUser.message));
      }
    } catch (err) {
      yield put(showAuthMessage(err));
    }
  });
}

// signup
export function* signUpWithFBEmail() {
  yield takeEvery(SIGNUP, function* ({ payload }) {
    try {
      const { user, history } = payload
      yield put(showLoading(true));
      const users = yield call(axios.post, `${BASE_URL}/users/create`, user);
      if (users.data.message) {
        message.success(users.data.message + " " + `check it`);
        history.push("/auth/login")
      }
      yield put(showLoading(false));

    } catch (error) {
      yield put(showAuthMessage(error));
      yield put(showLoading(false));
    }
  });
}


export function* postAppointments() {
  yield takeEvery(APPOINTMENTS, function* ({ payload }) {
    try {
      let data;
      for (let x of payload.data) {
        const { date, event } = x
        for (let appointment of event) {
          const { title, start, end, bullet } = appointment
          let main = { appointmentDate: date, startTime: start, endTime: end, label: title, bullet }
          data = main
        }
      }
      const resp = yield call(axios.post, `${BASE_URL}/appointments`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${payload.token}`
        }
      })
      if (Object.keys(resp.data).length) {
        message.success("Appointment Successfully")
        yield put({ type: GET_APPOINTMENTS, payload: payload.token })
      } else {
        message.error("Not Send")
      }

    } catch (err) {
      console.log(err)
    }
  })
}


export function* delAppointments() {
  yield takeEvery(DELETE_APPOINMENT, function* ({ payload }) {
    try {
      const { id, token } = payload
      const response = yield call(axios.delete, `${BASE_URL}/appointments/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.data.affected) {
        message.success("Deleted Successfully")
        yield put({ type: GET_APPOINTMENTS, payload: token })
      }

    } catch (err) {
      console.log(err)
    }
  })
}

export function* getAppointments() {
  yield takeEvery(GET_APPOINTMENTS, function* ({ payload }) {
    try {
      const response = yield call(axios.post, `${BASE_URL}/appointments/my-appointments`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${payload}`
        }
      })
      if (response.data?.length) {
        let mainValue = response.data
        yield put(saveAppointment(mainValue))
      }
    } catch (err) {
      console.log(err)
    }
  })
}



export function* getProfile() {
  yield takeEvery(PROFILE, function* ({ payload }) {
    try {
      const respo = yield call(axios.post, `${BASE_URL}/users/profile`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${payload}`
        }
      })
      if (Object.keys(respo.data).length) {
        yield put(saveProfile(respo.data))
        // yield put({ type: GET_APPOINTMENTS, payload })

      }
    } catch (err) {
      console.log(err)
    }
  })
}

export function* updateProfile() {
  yield takeEvery(UPDATE_PROFILE, function* ({ payload }) {
    try {
      const key = 'updatable';
      message.loading({ content: 'Updating...', key });
      const { user, token, id, Img } = payload
      const formData = new FormData()
      if (Img) {
        formData.append('avatar', Img)
      }
      for (const key of Object.keys(user)) {
        formData.append(key, user[key])

      }

      const respo = yield call(axios.patch, `${BASE_URL}/users/update-user/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if (Object.keys(respo.data).length && respo.status == 200) {
        yield put({ type: PROFILE, payload: token })
        message.success({ content: 'Done!', key, duration: 2 });

      }
    } catch (err) {
      console.log(err)
    }
  })
}

export function* ChangePassword() {
  yield takeEvery(CHANGE_PASSWORD, function* ({ payload }) {
    try {
      const { formdata, onReset } = payload
      const { oldPassword, newPassword, token } = formdata
      const respo = yield call(axios.patch, `${BASE_URL}/users/change-password`, { oldPassword, newPassword }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (Object.keys(respo.data).length) {
        message.success({ content: 'Password Changed', duration: 2 });
        onReset()
      } else {
        message.error("Error")
      }
    } catch (err) {
      console.log(err)
    }
  })
}

export function* ForgetPasswordEmail() {
  yield takeEvery(FORGET_PASSWORD_EMAIL, function* ({ payload }) {
    try {
      const { data, showLoading, token, SetShow, onHandlePassword } = payload
      showLoading(true)
      const respo = yield call(axios.get, `${BASE_URL}/users/forgot-password/${data.email}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if (respo.data.message == "Email Send Successfully") {
        message.success(respo.data.message)
        showLoading(false)
        SetShow()
        onHandlePassword()
      }
    } catch (err) {
      console.log(err)
      // showLoading(false)
    }
  })
}

export function* ForgetPassword() {
  yield takeEvery(FORGET_PASSWORD, function* ({ payload }) {
    try {
      const { data, token, router, showLoading } = payload
      showLoading(true)
      const respo = yield call(axios.post, `${BASE_URL}/users/reset-password`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (Object.keys(respo.data).length) {
        message.success({ content: "Password Changed", duration: 2 })
        showLoading(false)
        router.push('/')
      } else {
        showLoading(false)
      }
    } catch (err) {
      console.log(err)
      // showLoading(false)
    }
  })
}

export function* PaymentMethod() {
  yield takeEvery(PAYMENT_METHOD, function* ({ payload }) {
    try {
      const { price, token } = payload
      const respo = yield call(axios.post, `${BASE_URL}/payments/execute-payment`, { invoiceValue: price }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (Object.keys(respo.data).length) {
        if (respo.data.message == "Invoice Created Successfully!") {
          localStorage.setItem("is_package_selected", "true");
          window.open(respo.data.url, "_self")
          // window.open("http://localhost:3000/themes?isPayment=true&paymentId=07072088578147962674&Id=07072088578147962674", "_self")
          // history.push('/themes')
          // message.success({ content: "Payment Successfully", duration: 2 })
          // yield put({ type: SELECT_PACKAGE, payload: { price, token } })
        } else {
          message.warning(respo.data.message)
        }
      }
    } catch (err) {
      console.log(err)
    }
  })
}

export function* selectPackage() {
  yield takeEvery(SELECT_PACKAGE, function* ({ payload: { price, token } }) {
    try {
      const respo = yield call(axios.get, `${BASE_URL}/users/select-package/${price}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if (Object.keys(respo.data).length) {
        yield put(saveProfile(respo.data))
      }

    } catch (err) {
      console.log(err)
    }
  })
}


export function* getPackages() {
  yield takeEvery(GET_PACKAGES, function* () {
    try {
      const respo = yield call(axios.post, `${BASE_URL}/packages/get-all`, {})
      if (respo.data.length) {
        let data = respo.data
        yield put(savePackage(data))
      }
    } catch (err) {
      console.log(err)
      // showLoading(false)
    }
  })
}


// export function* signInWithFBGoogle() {
// 	yield takeEvery(SIGNIN_WITH_GOOGLE, function* () {
// 		try {
// 			const user = yield call(FirebaseService.signInGoogleRequest);
// 			if (user.message) {
// 				yield put(showAuthMessage(user.message));
// 			} else {
// 				localStorage.setItem(AUTH_TOKEN, user.user.uid);
// 				yield put(signInWithGoogleAuthenticated(user.user.uid));
// 			}
// 		} catch (error) {
// 			yield put(showAuthMessage(error));
// 		}
// 	});
// }



// export function* signInWithFacebook() {
// 	yield takeEvery(SIGNIN_WITH_FACEBOOK, function* () {
// 		try {
// 			const user = yield call(FirebaseService.signInFacebookRequest);
// 			if (user.message) {
// 				yield put(showAuthMessage(user.message));
// 			} else {
// 				localStorage.setItem(AUTH_TOKEN, user.user.uid);
// 				yield put(signInWithFacebookAuthenticated(user.user.uid));
// 			}
// 		} catch (error) {
// 			yield put(showAuthMessage(error));
// 		}
// 	});
// }

export default function* rootSaga() {
  yield all([
    fork(signInWithFBEmail),
    fork(signOut),
    fork(signUpWithFBEmail),
    fork(getProfile),
    fork(getAppointments),
    fork(postAppointments),
    fork(delAppointments),
    fork(updateProfile),
    fork(ChangePassword),
    fork(ForgetPasswordEmail),
    fork(ForgetPassword),
    fork(PaymentMethod),
    fork(getPackages),
    fork(selectPackage)
    // fork(signInWithFBGoogle),
    // fork(signInWithFacebook)
  ]);
}
