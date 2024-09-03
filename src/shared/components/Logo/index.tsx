import React, { memo } from "react";
import { Image, StyleSheet } from "react-native";

const Logo = () => (
  <Image
    source={require("@/shared/assets/images/logo/logo-no-background.png")}
    style={styles.image}
  />
);

const styles = StyleSheet.create({
  image: {
    width: 156,
    height: 156,
    marginBottom: 12,
  },
});

export default memo(Logo);
