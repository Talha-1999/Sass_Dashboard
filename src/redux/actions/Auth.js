import {
  SIGNIN,
  AUTHENTICATED,
  SIGNOUT,
  SIGNOUT_SUCCESS,
  SHOW_AUTH_MESSAGE,
  HIDE_AUTH_MESSAGE,
  SIGNUP,
  PROFILE,
  SIGNUP_SUCCESS,
  APPOINTMENTS,
  SAVE_PROFILE,
  SHOW_LOADING,
  SIGNIN_WITH_GOOGLE,
  SIGNIN_WITH_GOOGLE_AUTHENTICATED,
  SIGNIN_WITH_FACEBOOK,
  SAVE_APPOINMENT,
  UPDATE_PROFILE,
  DELETE_APPOINMENT,
  SIGNIN_WITH_FACEBOOK_AUTHENTICATED,
  GET_APPOINTMENTS,
  CHANGE_PASSWORD,
  FORGET_PASSWORD_EMAIL,
  FORGET_PASSWORD,
  PAYMENT_METHOD,
  GET_PACKAGES,
  SAVE_PACKAGES,
  SELECT_PACKAGE
} from '../constants/Auth';

export const signIn = (user) => {
  return {
    type: SIGNIN,
    payload: user
  }
};

export const authenticated = (user) => {
  return {
    type: AUTHENTICATED,
    user
  }
};

export const signOut = () => {
  return {
    type: SIGNOUT
  };
};

export const signOutSuccess = () => {
  return {
    type: SIGNOUT_SUCCESS,
  }
};

export const signUp = (user, history) => {
  return {
    type: SIGNUP,
    payload: { user, history }
  };
};

export const profile = (token) => {
  return {
    type: PROFILE,
    payload: token
  };
}

export const saveProfile = (user) => {
  return {
    type: SAVE_PROFILE,
    payload: user
  };
}

export const updateProfile = (user, token, id, Img) => {
  return {
    type: UPDATE_PROFILE,
    payload: { user, token, id, Img }
  };
}

export const appointments = (data, token) => {
  return {
    type: APPOINTMENTS,
    payload: { data, token }
  }
}
export const getappointment = (token) => {
  return {
    type: GET_APPOINTMENTS,
    payload: token
  }
}

export const saveAppointment = (user) => {
  return {
    type: SAVE_APPOINMENT,
    payload: user
  }
}

export const deleteAppointment = (id, token) => {
  return {
    type: DELETE_APPOINMENT,
    payload: { id, token }
  }
}

export const changePassword = (formdata, onReset) => {
  return {
    type: CHANGE_PASSWORD,
    payload: { formdata, onReset }
  }
}

export const forgetPassEmail = (data, showLoading, token, SetShow, onHandlePassword) => {
  return {
    type: FORGET_PASSWORD_EMAIL,
    payload: { data, showLoading, token, SetShow, onHandlePassword }
  }
}

export const forgetPassword = (data, token, router, showLoading) => {
  return {
    type: FORGET_PASSWORD,
    payload: { data, token, router, showLoading }
  }
}

export const paymentMethod = (price, token) => {
  return {
    type: PAYMENT_METHOD,
    payload: { price, token }
  }
}

export const selectPackage = (price, token) => {
  return {
    type: SELECT_PACKAGE,
    payload: { price, token }
  }
}
export const getPackage = () => {
  return {
    type: GET_PACKAGES,
  }
}
export const savePackage = (data) => {
  return {
    type: SAVE_PACKAGES,
    payload: data
  }
}

export const signUpSuccess = (token) => {
  return {
    type: SIGNUP_SUCCESS,
    token
  };
};

export const signInWithGoogle = () => {
  return {
    type: SIGNIN_WITH_GOOGLE
  };
};

export const signInWithGoogleAuthenticated = (token) => {
  return {
    type: SIGNIN_WITH_GOOGLE_AUTHENTICATED,
    token
  };
};

export const signInWithFacebook = () => {
  return {
    type: SIGNIN_WITH_FACEBOOK
  };
};

export const signInWithFacebookAuthenticated = (token) => {
  return {
    type: SIGNIN_WITH_FACEBOOK_AUTHENTICATED,
    token
  };
};

export const showAuthMessage = (message) => {
  return {
    type: SHOW_AUTH_MESSAGE,
    message
  };
};

export const hideAuthMessage = () => {
  return {
    type: HIDE_AUTH_MESSAGE,
  };
};

export const showLoading = (loading) => {
  return {
    type: SHOW_LOADING,
    loading
  };
};
