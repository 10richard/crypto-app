import { createReducer, createAction } from "@reduxjs/toolkit";

const TOGGLE_THEME = "TOGGLE_THEME";

const colorThemeReducer = createReducer("dark-theme", (builder) => {
  builder.addCase(TOGGLE_THEME, (state) => {
    const toggleTheme = state === "dark-theme" ? "light-theme" : "dark-theme";
    state = toggleTheme;
    return state;
  });
});

export const toggleTheme = createAction(TOGGLE_THEME);

export default colorThemeReducer;
