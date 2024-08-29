import ImageResizer from "@bam.tech/react-native-image-resizer";

export class ImageResizerService {
  static async resizeImage(uri: string) {
    try {
      const resizedImage = await ImageResizer.createResizedImage(
        uri,
        500,
        500,
        "JPEG",
        70,
      );

      return resizedImage.uri;
    } catch (error) {
      throw new Error(`Error resizing images: ${(error as Error).message} `);
    }
  }
}
