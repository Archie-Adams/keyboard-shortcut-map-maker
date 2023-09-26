import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import fortyPercent from '../Keyboard/Templates/fortyPercent';
import testColumns from '../Keyboard/Templates/testColumns';
import {
  KeyboardRowType, IKeyboardTemplate, IKeyboard,
} from '../Keyboard/types';
import { AppContext } from '../../App';
import { IAppContext } from '../../AppContext';
import './Header.scss';

const Header = () => {
  const { setContext, ...context } = useContext(AppContext) as IAppContext;

  // TODO: Better way of deep cloning needed.
  const instantiateKeyboard = (template: IKeyboardTemplate): IKeyboard => ({
    ...template, id: uuid(), columns: template.columns.map(column =>
      column.map(row => row.type === KeyboardRowType.keyRow
        ? {
          ...row, content: row.content.map(key => ({
            ...key, id: uuid(), style: { ...key.style },
            legends: {
              topLeft: { ...key.legends.topLeft },
              topCenter: { ...key.legends.topCenter },
              topRight: { ...key.legends.topRight },
              middleLeft: { ...key.legends.middleLeft },
              middleRight: { ...key.legends.middleRight },
              middleCenter: { ...key.legends.middleCenter },
              bottomLeft: { ...key.legends.bottomLeft },
              bottomMiddle: { ...key.legends.bottomMiddle },
              bottomRight: { ...key.legends.bottomRight },
            }
          }))
        }
        : { ...row }
      )
    )
  });

  return (
    <header className="header">

      <input
        type="text"
        value={context.title}
        onChange={(e) => setContext({ ...context, title: e.target.value })}
      />

      <div className="keyboard-templates">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            let oldContext = { ...context };
            oldContext.keyboards.push(instantiateKeyboard(fortyPercent));
            setContext(oldContext);
          }}
        >
          Add 40% Keyboard
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            let oldContext = { ...context };
            oldContext.keyboards.push(instantiateKeyboard(testColumns));
            setContext(oldContext);
          }}
        >
          Add Test Columns
        </button>
      </div>

      <div className="save-controls">
        <button
          type="button"
          onClick={() => {
            const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
              JSON.stringify(context)
            )}`;
            const link = document.createElement("a");
            link.href = jsonString;
            link.download = `${context.title}.json`;
            link.click();
          }}
        >
          Save to file
        </button>
        <label
          htmlFor="selectFile"
          className="load-file"
        >
          Load Map From File
        </label>
        <input
          type="file"
          id="selectFile"
          onChange={(event) => {
            var fr = new FileReader();

            fr.onload = (e) => {
              console.log(e);
              if (typeof e.target?.result !== 'string') {
                alert('Error loading file.');
                return;
              }
              try {
                var result = JSON.parse(e.target.result);
                console.log(JSON.stringify(result, null, 2));
                // TODO: No check for right format.
                setContext(result);
              } catch (error) {
                alert('Error parsing file.');
              }
            }

            var file = event.target.files?.item(0);
            if (!file) { return false; }
            fr.readAsText(file);
          }} />
      </div>

      {/* TODO: Save context in session? + a clear all context button. */}

      {/* <button
        type="button"
        onClick={() => {
          const location = window.location.href.split('?')[0];
          const queryString = encodeURIComponent(JSON.stringify(context));
          const url = `${location}?context=${queryString}`;
          navigator.clipboard.writeText(url);
          alert('Link copied to clipboard!');
        }}
      >
        Save to URL
      </button> */}

      {/* TODO: Print button and css */}
    </header>
  );
};

export default Header;
