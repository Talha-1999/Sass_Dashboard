import React, { createContext, useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import Views from './views';
import { Route, Switch } from 'react-router-dom';
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { THEME_CONFIG } from './configs/AppConfig';
import PagesContext from 'context/PagesContext';

const themes = {
  dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/css/light-theme.css`,
};


function App() {

  const [pages, setPages] = useState([]);

  return (
    <div className="App">
      <Provider store={store}>
        <PagesContext.Provider value={{ pages, setPages }}>
          <ThemeSwitcherProvider themeMap={themes} defaultTheme={THEME_CONFIG.currentTheme} insertionPoint="styles-insertion-point">
            <Router>
              <Switch>
                <Route path="/" component={Views} />
              </Switch>
            </Router>
          </ThemeSwitcherProvider>
        </PagesContext.Provider>
      </Provider>
    </div>
  );
}

export default App;
