import { LOAD_SELECTED_THEME } from "redux/constants/Profile";

export const loadSelectedTheme = (email) => {
    return {
      type: LOAD_SELECTED_THEME,
    }
  };