import React, { CSSProperties, useState, useRef } from "react";
import KeyEditPopUp from "../KeyEditPopUp/KeyEditPopUp";
import { IKeyLegend, IKey } from '../../types';
import './Key.scss';

interface IProps {
  key_: IKey;
}

interface ILegendProps {
  keyLegend: IKeyLegend;
}

const Legend = ({ keyLegend }: ILegendProps) => (
  <div className="legend">
    <span>
      {keyLegend.text}
    </span>
  </div>
);

const Key = ({
  key_: key,
}: IProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const keyLeft = ref?.current?.getBoundingClientRect().left ?? 0;

  const [
    isKeyEditPopUpOpen, setIsKeyEditPopUpOpen,
  ] = useState<IKey | null>(null);

  let styles: CSSProperties = {
    ...key.style,
    width: `${(key.width ?? 1) * 4 + ((key.width ?? 1) - 1) * 1.125}rem`,
  }

  if (key.spaceLeft) {
    styles = {
      ...styles,
      marginLeft: `${key.spaceLeft * 4 + (key.spaceLeft) * 1.125}rem`,
    }
  }

  if (key.spaceRight) {
    styles = {
      ...styles,
      marginRight: `${key.spaceRight * 4 + key.spaceRight * 1.125 + 0.25}rem`,
    }
  }

  return (
    <div
      ref={ref}
      className="key standard"
      style={styles}
      onClick={() => {
        // TODO: Animation and sound.
        setIsKeyEditPopUpOpen(key);
      }}
    >
      <div className="legends">
        <Legend keyLegend={key.legends.topLeft} />
        <Legend keyLegend={key.legends.topCenter} />
        <Legend keyLegend={key.legends.topRight} />
        <Legend keyLegend={key.legends.middleLeft} />
        <Legend keyLegend={key.legends.middleCenter} />
        <Legend keyLegend={key.legends.middleRight} />
        <Legend keyLegend={key.legends.bottomLeft} />
        <Legend keyLegend={key.legends.bottomMiddle} />
        <Legend keyLegend={key.legends.bottomRight} />
      </div>
      <KeyEditPopUp
        key_={isKeyEditPopUpOpen}
        onClose={() => { setIsKeyEditPopUpOpen(null); }}
        // TODO: Do the same for display above or below key.
        displayLeft={keyLeft < window.innerWidth / 2}
      />
    </div>
  );
};

export default Key;
