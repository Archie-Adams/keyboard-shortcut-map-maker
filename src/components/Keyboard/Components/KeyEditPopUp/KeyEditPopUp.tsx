import React, {
  useState, useContext, useEffect, useRef, CSSProperties,
} from 'react';
import { coral, navy, green, orange, blue } from './colors';
import { KeyboardContext, IKeyboardContext } from '../../Keyboard';
import { IKeyLegends, IKey } from '../../types';
import './KeyEditPopUp.scss';

interface IProps {
  key_: IKey | null;
  onClose: () => void;
  displayLeft: boolean;
}

const KeyEditPopUp = (
  { key_: key, onClose, displayLeft }: IProps
) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { keyboard } = useContext(KeyboardContext) as IKeyboardContext;

  const [legendKeyStyle, setLegendKeyStyle] = useState<CSSProperties>({ ...key?.style });

  const [selectedLegend, setSelectedLegend]
    = useState<keyof IKeyLegends>('middleCenter');

  const legendKeys = [
    'topLeft', 'topCenter', 'topRight', 'middleLeft', 'middleCenter',
    'middleRight', 'bottomLeft', 'bottomMiddle', 'bottomRight',
  ] as (keyof IKeyLegends)[];

  const handleClickListener = (event: any) => {
    if (!(ref && ref.current?.contains(event.target))) {
      onClose();
    };
  }

  const handleEscKey = (event: any) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickListener);
    document.addEventListener('keyup', handleEscKey, false);

    return () => {
      document.removeEventListener('mousedown', handleClickListener);
      document.removeEventListener('keyup', handleEscKey, false);
    };
  }, []);

  if (!key) {
    return <></>;
  }

  const setKeyStyle = (key: IKey, style: CSSProperties) => {
    keyboard.setKeyStyle(key, style);
    setLegendKeyStyle(style);
  };

  return (
    <div
      className="pop-up-body"
      ref={ref}
      style={{
        left: displayLeft ? 'calc(100% + 0.75rem)' : '',
        right: displayLeft ? '' : 'calc(100% + 0.75rem)',
      }}
    >
      <div className="color-picker-area">
        <h4>Change Key Colour</h4>
        <div className="color-buttons">
          <button
            className="key"
            onClick={() => setKeyStyle(key, {})}
          >
            Default
          </button>
          <button
            className="key"
            style={coral.style}
            onClick={() => setKeyStyle(key, coral.style)}
          >
            Coral
          </button>
          <button
            className="key"
            style={navy.style}
            onClick={() => setKeyStyle(key, navy.style)}
          >
            Navy
          </button>
          <button
            className="key"
            style={green.style}
            onClick={() => setKeyStyle(key, green.style)}
          >
            Green
          </button>
          <button
            className="key"
            style={orange.style}
            onClick={() => setKeyStyle(key, orange.style)}
          >
            Orange
          </button>
          <button
            className="key"
            style={blue.style}
            onClick={() => setKeyStyle(key, blue.style)}
          >
            Blue
          </button>
        </div>
      </div>
      <h4>Edit Legend Properties</h4>
      <div className="key-edit-form">
        <div>
          <div className="key pop-up-key" style={legendKeyStyle}>
            {legendKeys.map((legendKey) => (
              <button
                onClick={() => { setSelectedLegend(legendKey); }}
                style={{ color: legendKeyStyle?.color }}
              >
                {key.legends[legendKey].text}
              </button>
            ))}
          </div>
        </div>
        <div className="legend-edit-form">
          <input
            type="text"
            value={key.legends[selectedLegend].text}
            placeholder="legend text"
            onChange={(e) => {
              keyboard.setKeyLegendText(
                key, selectedLegend, e.target.value
              );
            }}
          />
          {/* TODO: Maybe get rid of these in the initial one and have the input for text be in the button. */}
          <input type="text" placeholder="#000000" disabled />
          <input type="text" placeholder="font" disabled />
          <input type="text" placeholder="size" disabled />
        </div>
      </div>
    </div>
  );
};

export default KeyEditPopUp;