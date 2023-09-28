import React, { useState, createContext } from 'react';
import { FaTrash } from "react-icons/fa6";
import useKeyboard from './useKeyboard';
import Key from './Components/Key/Key';
import { IKeyboard, KeyboardRowType, IKey, IKeyboardInstance } from './types';
import './Keyboard.scss';

interface IProps {
  keyboard: IKeyboard;
};

export interface IKeyboardContext {
  keyboard: IKeyboardInstance;
}

export const KeyboardContext = createContext<IKeyboardContext | null>(null);

const Keyboard = ({ keyboard: keyboard_ }: IProps) => {
  const keyboard = useKeyboard(keyboard_);
  // const [editingName, setEditingName] = useState(false);

  return (
    // TODO: Editable background color for keyboard.
    <div className="keyboard" key={keyboard.id}>

      <div className="keyboard-header">
        <input
          type="text"
          value={keyboard.name}
          className="name"
          onChange={(e) => keyboard.setKeyboardName(e.target.value)}
        />
        <button className="delete" onClick={() => keyboard.removeKeyboard()}>
          <FaTrash />
        </button>
      </div>

      <div className="column-container">
        <KeyboardContext.Provider value={{ keyboard }}>
          {keyboard.columns.map((column, columnIndex) => (
            <div className="column" key={columnIndex}>
              {column.map((row, rowIndex: number) => {
                if (row.type === KeyboardRowType.keyRow) {
                  return (
                    <div className='key-row' key={rowIndex}>
                      {
                        row.content.map((key: IKey) => (
                          <Key
                            key={key.id}
                            key_={key}
                          />
                        ))
                      }
                    </div>
                  );
                } else if (row.type === KeyboardRowType.gapRow) {
                  return (
                    <div
                      key={rowIndex}
                      className='gap-row'
                      style={{ height: `${4 * row.gapHeight}rem` }}
                    />
                  );
                } else {
                  return <></>;
                }
              })}
            </div>
          ))}
        </KeyboardContext.Provider>
      </div>
    </div >
  );
};

export default Keyboard;
