import { IKeyboard } from "./components/Keyboard/types";

interface IAppContextContent {
  version: number;
  title: string;
  keyboards: IKeyboard[];
}

interface IAppContext extends IAppContextContent {
  setContext: (context: IAppContextContent) => void;
}

export type { IAppContextContent, IAppContext };
