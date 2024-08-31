import React, { useMemo, useState } from "react";
import { Snackbar, useTheme } from "react-native-paper";

type ToastProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  onPress?: {
    label: string;
    action: () => void;
  };
};

export const Toast = ({ message, type, onClose, onPress }: ToastProps) => {
  const theme = useTheme();

  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    console.log("AQQUIII");
    onClose();
    setVisible(false);
  };

  const style = useMemo(() => {
    if (type === "error")
      return {
        backgroundColor: theme.colors.error,
        color: theme.colors.onError,
      };

    return {
      backgroundColor: theme.colors.primary,
      color: theme.colors.onPrimary,
    };
  }, [type, theme.colors]);

  const action = onPress
    ? {
        label: onPress.label,
        onPress: () => {
          onPress.action();
        },
      }
    : undefined;

  return (
    <Snackbar
      visible={visible}
      style={style}
      onDismiss={handleClose}
      action={action}
    >
      {message}
    </Snackbar>
  );
};
