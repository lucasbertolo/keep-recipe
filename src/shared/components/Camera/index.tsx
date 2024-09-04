import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Linking,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import Button from "../Button";
import { Typography } from "../Typography";

interface CameraComponentProps {
  onTakePhoto: (photoUri: string) => void;
}

export const Camera: React.FC<CameraComponentProps> = ({ onTakePhoto }) => {
  const cameraRef = useRef<CameraView>(null);

  const theme = useTheme();
  const [permission, requestPermission] = useCameraPermissions();

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);

  const openAppSettings = useCallback(() => {
    setIsWarningOpen(false);

    if (Platform.OS === "android") {
      Linking.openURL(
        "package:" +
          "com.lucasbertolo2.keeprecipes" +
          "#Intent;action=android.settings.APPLICATION_DETAILS_SETTINGS;scheme=package;end",
      );
      return;
    }

    Linking.openURL("app-settings:");
  }, [setIsWarningOpen]);

  const handleOpenCamera = useCallback(async () => {
    if (!permission) {
      const hasPermission = await requestPermission();

      if (!hasPermission) {
        setIsWarningOpen(true);
        return;
      }
    }

    setIsCameraOpen(true);
  }, [setIsWarningOpen, setIsCameraOpen, permission, requestPermission]);

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();

      if (!photo) return;

      onTakePhoto(photo.uri);
      handleCloseCamera();
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onTakePhoto(result.assets[0].uri);
      handleCloseCamera();
    }
  };

  const contentRender = useMemo(() => {
    if (isWarningOpen) {
      return (
        <View>
          <Typography>
            É necessário permitir o acesso à camera para prosseguir
          </Typography>

          <Button onPress={openAppSettings}>Ir para os ajustes</Button>
        </View>
      );
    }

    return (
      <IconButton
        icon={"plus"}
        onPress={handleOpenCamera}
        style={[styles.openCamera, { borderColor: theme.colors.tertiary }]}
      />
    );
  }, [isWarningOpen, handleOpenCamera, openAppSettings, theme.colors.tertiary]);

  return (
    <>
      <View style={styles.containerPhoto}>{contentRender}</View>

      <Modal visible={isCameraOpen} animationType="slide">
        <View style={styles.container}>
          <View style={styles.close}>
            <IconButton
              icon={"close"}
              onPress={handleCloseCamera}
              iconColor={theme.colors.onBackground}
            />
          </View>
          <CameraView style={styles.camera} ref={cameraRef}>
            <View style={styles.controls}>
              <View style={styles.collumn}>
                <IconButton onPress={pickImage} icon="image" size={30} />
              </View>

              <View style={styles.collumn}>
                <TouchableOpacity
                  onPress={takePicture}
                  style={styles.captureButton}
                >
                  <View style={styles.innerCaptureButton} />
                </TouchableOpacity>
              </View>

              <View style={styles.collumn} />
            </View>
          </CameraView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  openCamera: {
    borderRadius: 32,
    borderWidth: 1,
  },
  close: {},
  containerPhoto: {
    padding: 16,
    borderRadius: 8,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  controlsContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  innerCaptureButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "red",
  },
  collumn: {
    flex: 1,
  },
});
