import storage from "@react-native-firebase/storage";
import uuid from "react-native-uuid";
import { ImageResizerService } from "../../image-resizer";

type Photo = {
  name: string;
  uri: string;
};

export class FirebaseStorageService {
  async uploadPhotos(userId: string, photos: Photo[]) {
    try {
      const urls = [];

      for (const photo of photos) {
        const resizedImage = await ImageResizerService.resizeImage(photo.uri);

        const storageRef = storage().ref(
          `recipes/${userId}/${photo.name}/${uuid.v4()}`,
        );

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
