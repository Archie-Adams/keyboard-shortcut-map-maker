import { CSSProperties } from "react";

interface IKeyLegend {
  text: string;
  size?: number;
  color?: string; // hex // TODO: Typescript a color?
  // TODO: Font
}

interface IKeyLegends {
  topLeft: IKeyLegend;
  topCenter: IKeyLegend;
  topRight: IKeyLegend;
  middleLeft: IKeyLegend;
  middleRight: IKeyLegend;
  middleCenter: IKeyLegend;
  bottomLeft: IKeyLegend;
  bottomMiddle: IKeyLegend;
  bottomRight: IKeyLegend;
}

interface IKey {
  id: string;
  width?: number;
  // TODO: Height;
  legends: IKeyLegends;
  style: CSSProperties;
  // TODO: Have a separate color style and custom style
  // TODO: or better have  
  spaceRight?: number;
  spaceLeft?: number;
}

enum KeyboardRowType {
  keyRow = 'key-row',
  gapRow = 'gap-row',
}

interface IKeyRow {
  type: KeyboardRowType.keyRow;
  content: IKey[];
}

interface IGapRow {
  type: KeyboardRowType.gapRow;
  gapHeight: number;
}

type KeyboardRow = IKeyRow | IGapRow;
type KeyboardColumn = KeyboardRow[];

interface IKeyboardTemplate {
  name: string;
  metaData: {
    backgroundColor?: string;
  };
  columns: KeyboardColumn[]
}

interface IKeyboard extends IKeyboardTemplate {
  id: string;
}

interface IKeyboardInstance extends IKeyboard {
  setKeyboardName: (name: string) => void;
  setKeyboardBackgroundColor: (backgroundColor: string) => void;
  setKeyboardColumns: (columns: KeyboardColumn[]) => void;
  removeKeyboard: () => void;
  setKeyLegendText: (key: IKey, legend: keyof IKeyLegends, text: string) => void;
  setKeyLegendSize: (key: IKey, legend: keyof IKeyLegends, size: number) => void;
  setKeyLegendColor: (key: IKey, legend: keyof IKeyLegends, color: string) => void;
  setKeyStyle: (key: IKey, style: CSSProperties) => void;
};

export type {
  IKeyLegend,
  IKeyLegends,
  IKey,
  IKeyRow,
  IGapRow,
  KeyboardRow,
  KeyboardColumn,
  IKeyboardTemplate,
  IKeyboard,
  IKeyboardInstance,
};
export { KeyboardRowType }