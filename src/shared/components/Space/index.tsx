import { useMemo } from "react";
import { View } from "react-native";

type SpaceProps = {
  type?: "sm" | "md" | "lg";
};

export const Space = ({ type = "md" }: SpaceProps) => {
  const size = useMemo(() => {
    if (type === "lg") return 18;

    if (type === "md") return 6;

    if (type === "sm") return 3;

    return 0;
  }, [type]);

  return <View style={{ marginVertical: size }}></View>;
};
