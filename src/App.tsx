import React, { useState, createContext } from 'react';
import Keyboard from './components/Keyboard/Keyboard';
import Header from './components/Header/Header';
import './App.scss';
import { IAppContext, IAppContextContent } from './AppContext';

const AppContext = createContext<IAppContext | null>(null);

// TODO: ESLinting
// TODO: Help pop up with do not show again option for tutorial and updates? Has a version and if the pop up has a version higher than saved show again.

function App() {
  // TODO: Change to session storage.
  // const queryString = window.location.search;
  // const urlParams = new URLSearchParams(queryString);
  // const contextJson = urlParams.get('context');

  let defaultContext: IAppContextContent = {
    title: 'Untitled Keyboard Map',
    keyboards: [],
    version: 1,
  };

  let initialValue = defaultContext;
  // if (contextJson) {
  //   initialValue = JSON.parse(contextJson);
  // }
  const [context, setContext] = useState<IAppContextContent>(initialValue);

  return (
    <AppContext.Provider value={{ ...context, setContext }}>

      <Header />

      <hr />

      {
        context.keyboards.map((keyboard) => {
          return (
            <div key={keyboard.id}>
              <Keyboard keyboard={keyboard} />
              <hr style={{ margin: '1rem auto' }} />
            </div>
          );
        })
      }

      {/* TODO: Footer. */}

    </AppContext.Provider>
  );
}

export { AppContext };
export default App;
