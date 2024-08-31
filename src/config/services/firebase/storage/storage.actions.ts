import storage from "@react-native-firebase/storage";
import uuid from "react-native-uuid";
import { ImageResizerService } from "../../image-resizer";

export class FirebaseStorageService {
  static async uploadPhotos(userId: string, photos: string[]) {
    try {
      const urls = [];

      for (const photo of photos) {
        const resizedImage = await ImageResizerService.resizeImage(photo);

        const storageRef = storage().ref(`recipes/${userId}/${uuid.v4()}`);

        await storageRef.putFile(resizedImage);

        const photoURL = await storageRef.getDownloadURL();

        urls.push(photoURL);
      }

      return urls;
    } catch (error) {
      throw new Error(`Error sending images: ${(error as Error).message}`);
    }
  }
}
