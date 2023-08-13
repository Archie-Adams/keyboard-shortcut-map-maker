import { useContext, useEffect, useState, CSSProperties } from 'react';
import {
  KeyboardColumn, IKeyboard, IKeyboardInstance, KeyboardRowType, IKey,
  IKeyLegends,
} from './types';
import { AppContext } from '../../App';
import { IAppContext } from '../../AppContext';

const useKeyboard = (keyboard_: IKeyboard): IKeyboardInstance => {
  const { setContext, ...appContext } = useContext(AppContext) as IAppContext;

  const [keyboard, setKeyboard] = useState(keyboard_);
  const keyboardIndex = appContext.keyboards
    .findIndex(kbd => kbd.id === keyboard.id);

  useEffect(() => {
    let keyboards = appContext.keyboards;
    keyboards[keyboardIndex] = keyboard;
    setContext({ ...appContext, keyboards })
  }, [keyboard]);

  const setKeyboardName = (name: string) => {
    setKeyboard(oldState => ({ ...oldState, name }));
  };

  const setKeyboardBackgroundColor = (backgroundColor: string) => {
    setKeyboard(oldState => ({
      ...oldState, metaData: { ...oldState.metaData, backgroundColor },
    }));
  };

  const setKeyboardColumns = (columns: KeyboardColumn[]) => {
    setKeyboard(oldState => ({ ...oldState, columns }));
  };

  const updateKey = (newKey: IKey): void => {
    let newKeyboard = { ...keyboard };
    newKeyboard.columns.forEach(column => column.forEach(row => {
      if (row.type === KeyboardRowType.keyRow) {
        const keyIndex = row.content.findIndex(key => key.id === newKey.id);
        if (keyIndex !== -1) {
          row.content[keyIndex] = newKey;
        }
      }
    }));
    setKeyboard(newKeyboard);
  };

  const setKeyLegendText = (key: IKey, legend: keyof IKeyLegends, text: string) => {
    let newKey = { ...key };
    newKey.legends[legend].text = text;
    updateKey(newKey);
  };

  const setKeyLegendSize = (key: IKey, legend: keyof IKeyLegends, size: number) => {
    let newKey = { ...key };
    newKey.legends[legend].size = size;
    updateKey(newKey);
  };

  const setKeyLegendColor = (key: IKey, legend: keyof IKeyLegends, color: string) => {
    let newKey = { ...key };
    newKey.legends[legend].color = color;
    updateKey(newKey);
  };

  const setKeyStyle = (key: IKey, style: CSSProperties) => {
    updateKey({ ...key, style });
  };

  return {
    ...keyboard,
    setKeyboardName,
    setKeyboardBackgroundColor,
    setKeyboardColumns,
    setKeyLegendText,
    setKeyLegendSize,
    setKeyLegendColor,
    setKeyStyle,
  };
};

export default useKeyboard;