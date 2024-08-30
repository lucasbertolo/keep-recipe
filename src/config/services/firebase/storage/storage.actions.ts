import storage from "@react-native-firebase/storage";
import uuid from "react-native-uuid";
import { ImageResizerService } from "../../image-resizer";

export class FirebaseStorageService {
  static async uploadPhotos(userId: string, photos: string[]) {
    try {
      const urls = [];

      console.log("photos inside upload Photos", photos);

      for (const photo of photos) {
        try {
          const resizedImage = await ImageResizerService.resizeImage(photo);

          console.log("resizedImage", resizedImage);

          const storageRef = storage().ref(`recipes/${userId}/${uuid.v4()}`);

          await storageRef.putFile(resizedImage);

          const photoURL = await storageRef.getDownloadURL();

          urls.push(photoURL);
        } catch (error) {
          console.log("error inside loop", error);
        }
      }

      return urls;
    } catch (error) {
      throw new Error(`Error sending images: ${(error as Error).message}`);
    }
  }
}
