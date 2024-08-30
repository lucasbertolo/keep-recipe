import React, { FC, ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

type Props = {
  condition: boolean | undefined;
  elseRender?: ReactNode;
  children: ReactNode | string;
  style?: StyleProp<ViewStyle>;
};

const If: FC<Props> = function ({
  condition,
  elseRender = null,
  children,
  style,
}) {
  return <View style={style}>{condition ? children : elseRender}</View>;
};

export default If;
