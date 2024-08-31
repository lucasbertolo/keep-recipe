import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo } from "react";

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
  const snapPoints = useMemo(
    () => defaultSnapPoints ?? ["25%", "50%"],
    [defaultSnapPoints],
  );

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

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
        onChange={handleSheetChanges}
        containerStyle={{ zIndex: 1, width: "100%" }}
        style={{ width: "100%" }}
      >
        <BottomSheetScrollView contentContainerStyle={{ padding: 12 }}>
          {children}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};
