import React, { useState, createContext, useRef } from 'react';
import GitHubButton from 'react-github-btn'
import Keyboard from './components/Keyboard/Keyboard';
import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';
import './App.scss';
import { defaultContext } from './defaultContext';
import { IAppContext, IAppContextContent } from './AppContext';

const AppContext = createContext<IAppContext | null>(null);

// TODO: ESLinting
// TODO: Help pop up with do not show again option for tutorial and updates? Has a version and if the pop up has a version higher than saved show again.

function App() {
  const showAgainRef = useRef<HTMLInputElement>(null);
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

  const [
    isWelcomeModalOpen, setIsWelcomeModalOpen,
  ] = useState(localStorage.getItem("lastDontShowModalVersion") !== "1"); // TODO: use single app version

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

      <footer>
        <p>
          {/* TODO: have version number in one place in the html header. Can be used for welcome popup and script versioning then. */}
          Keyboard Shortcut Map Maker v2.0.0 (
          <a
            href="https://github.com/Archie-Adams/keyboard-shortcut-map-maker#readme"
            target="_blank"
            rel="noreferrer"
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
            rel="noreferrer"
          >
            LICENCE
          </a>
          )
        </p>
        <p>Show Help Modal</p>
        <div>
          <p>
            Contacts/Socials:{' '}
            <a
              target="_blank"
              href="https://archieada.ms"
              rel="noreferrer"
            >
              Personal Website
            </a>
            {' '}&bull;{' '}
            <a
              target="_blank"
              href="https://linkedin.com/in/archie-adams"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            {' '}&bull;{' '}
            <a
              target="_blank"
              href="mailto:archiea2002@gmail.com"
              rel="noreferrer"
            >
              Email
            </a>
            {' '}&bull;{' '}
            <a
              target="_blank"
              href="https://github.com/Archie-Adams"
              rel="noreferrer"
            >
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
        <button onClick={() => setIsWelcomeModalOpen(true)}>
          Help!
        </button>
      </footer>

      <Modal
        title="Welcome!"
        isOpen={isWelcomeModalOpen}
        onClose={() => {
          setIsWelcomeModalOpen(false);
          if (showAgainRef?.current) {
            if (!showAgainRef.current.checked) return;
            localStorage.setItem("lastDontShowModalVersion", "1"); // TODO: use single prod version here so can be used for changelog
          }
        }}
      >
        <div>
          <p>Hi there, and welcome to Keyboard Shortcut Map Maker Version 2!!!</p>
          <p>
            If you've used the old version and are wanting to load your old
            files, <a href="/legacy-site.html">the legacy version is still hosted here!</a>
          </p>
          <br />
          <input ref={showAgainRef} id="dont-show-again" type="checkbox"></input>
          <label htmlFor="dont-show-again">Please don't show this message again. (Uses Cookies)</label>
        </div>
      </Modal>

    </AppContext.Provider >
  );
}

export { AppContext };
export default App;
