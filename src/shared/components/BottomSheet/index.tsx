import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

type BottomSheetProps = {
  defaultSnapPoints?: (string | number)[];
  children: JSX.Element;
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
};

export const BottomSheet = ({
  children,
  defaultSnapPoints,
  bottomSheetModalRef,
}: BottomSheetProps) => {
  const theme = useTheme();

  const snapPoints = useMemo(
    () => defaultSnapPoints ?? ["25%", "50%"],
    [defaultSnapPoints],
  );

  const Backdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...backdropProps} enableTouchThrough />
    ),
    [],
  );

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        backdropComponent={Backdrop}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: theme.colors.background }}
        containerStyle={[styles.container]}
        handleStyle={{ backgroundColor: theme.colors.background }}
        handleIndicatorStyle={{ backgroundColor: theme.colors.onBackground }}
        style={styles.modal}
      >
        <BottomSheetScrollView contentContainerStyle={[styles.scrollView]}>
          {children}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    width: "100%",
  },
  modal: {
    width: "100%",
  },
  scrollView: {
    padding: 12,
  },
});
