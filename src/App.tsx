import React, { useState, createContext } from 'react';
import GitHubButton from 'react-github-btn'
import Keyboard from './components/Keyboard/Keyboard';
import Header from './components/Header/Header';
import './App.scss';
import { defaultContext } from './defaultContext';
import { IAppContext, IAppContextContent } from './AppContext';

const AppContext = createContext<IAppContext | null>(null);

// TODO: ESLinting
// TODO: Help pop up with do not show again option for tutorial and updates? Has a version and if the pop up has a version higher than saved show again.

function App() {
  // let defaultContext: IAppContextContent = {
  //   title: 'Untitled Keyboard Map',
  //   keyboards: [],
  //   version: 1,
  // };

  let initialValue = defaultContext;
  const [context, setContext] = useState<IAppContextContent>(initialValue);

  window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
  });

  return (
    <AppContext.Provider value={{ ...context, setContext }}>

      <header>
        <img className="logo" src="android-chrome-512x512.png" alt="logo" />
        <p>
          Keyboard Shortcut{' '}
          <span>
            Map
            <span className="title-span-container">
              <span className="title-span">
                By&nbsp;
                <a href="https://archieada.ms" target="_blank">archieada.ms</a>
              </span>
            </span>
          </span>
          {' '}Maker
        </p>
      </header>

      <Header />

      {context.keyboards.map((keyboard, index) => (
        <div
          key={keyboard.id}
          className={`keyboard-section ${index % 2 ? 'even' : 'odd'}`}
        >
          <Keyboard keyboard={keyboard} />
        </div>
      ))}

      {/* TODO: Modal with DnD for re-ordering keyboard list. */}

      <footer>
        <p>
          Keyboard Shortcut Map Maker v2.0.0 (
          <a
            href="https://github.com/Archie-Adams/keyboard-shortcut-map-maker#readme"
            target="_blank"
          >
            changelog
          </a>
          )
        </p>
        <p>Copyright &copy; 2023 - Archie Adams</p>
        <p>
          All rights reserved (
          <a
            href="https://github.com/Archie-Adams/keyboard-shortcut-map-maker/blob/master/LICENSE"
            target="_blank"
          >
            LICENCE
          </a>
          )
        </p>
        <p>Show Help Modal</p>
        <div>
          <p>
            Contacts/Socials:{' '}
            <a target="_blank" href="https://archieada.ms">
              Personal Website
            </a>
            {' '}&bull;{' '}
            <a target="_blank" href="https://linkedin.com/in/archie-adams">
              LinkedIn
            </a>
            {' '}&bull;{' '}
            <a target="_blank" href="mailto:archiea2002@gmail.com">
              Email
            </a>
            {' '}&bull;{' '}
            <a target="_blank" href="https://github.com/Archie-Adams">
              GitHub
            </a>
          </p>
        </div>
        <p className="github-buttons">
          <GitHubButton
            href="https://github.com/Archie-Adams/keyboard-shortcut-map-maker"
            aria-label="Star Archie-Adams/keyboard-shortcut-map-maker on GitHub"
          >
            Code hosted on Github
          </GitHubButton>
          {' '}
          <GitHubButton
            href="https://github.com/Archie-Adams/keyboard-shortcut-map-maker/issues"
            data-icon="octicon-issue-opened"
            data-show-count="true"
            aria-label="Raise an Issue Archie-Adams/keyboard-shortcut-map-maker on GitHub"
          >
            Raise an Issue
          </GitHubButton>
          {' '}
          <GitHubButton
            href="https://github.com/Archie-Adams/keyboard-shortcut-map-maker"
            data-icon="octicon-star"
            data-show-count="true"
            aria-label="Star Archie-Adams/keyboard-shortcut-map-maker on GitHub"
          >
            Stars
          </GitHubButton>
        </p>
      </footer>

    </AppContext.Provider >
  );
}

export { AppContext };
export default App;
