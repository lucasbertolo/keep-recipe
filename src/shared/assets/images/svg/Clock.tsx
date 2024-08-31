import React from "react";
import Svg, { G, Path, Rect, SvgProps } from "react-native-svg";

export default function ClockSvg(props: SvgProps) {
  return (
    <Svg viewBox="0 0 32 32" {...props}>
      <G data-name="Layer 2" id="Layer_2">
        <Path d="M16,29A13,13,0,1,1,29,16,13,13,0,0,1,16,29ZM16,5A11,11,0,1,0,27,16,11,11,0,0,0,16,5Z" />
        <Path d="M21.5,22.5a1,1,0,0,1-.71-.29l-5.5-5.5A1,1,0,0,1,15,16V8a1,1,0,0,1,2,0v7.59l5.21,5.2a1,1,0,0,1,0,1.42A1,1,0,0,1,21.5,22.5Z" />
      </G>
      <G id="frame">
        <Rect fill="none" height="32" width="32" />
      </G>
    </Svg>
  );
}
