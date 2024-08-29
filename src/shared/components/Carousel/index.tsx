import * as React from "react";
import { Dimensions, Image, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { CarouselRenderItemInfo } from "react-native-reanimated-carousel/lib/typescript/types";
import { Camera } from "../Camera";
import { CardPhoto } from "../CardPhoto";
import If from "../If";

type CarouselPhotosProps = {
  takePhoto?: (uri: string) => void;
  photos: string[];
  limitPhotos?: number;
};

export const CarouselPhotos = ({
  photos,
  takePhoto,
  limitPhotos = 10,
}: CarouselPhotosProps) => {
  const screenWidth = Dimensions.get("screen").width;

  const progress = useSharedValue<number>(0);
  const baseOptions = {
    vertical: false,
    width: screenWidth,
    height: screenWidth * 0.6,
  };

  const ref = React.useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const formattedPhotos = React.useMemo(() => {
    if (!takePhoto) return photos;

    if (photos.length >= limitPhotos) return photos;

    return [...photos, "camera"];
  }, [photos, takePhoto, limitPhotos]);

  const renderItem = React.useCallback(
    ({ item }: CarouselRenderItemInfo<string>) => {
      if (item === "camera") {
        return (
          <CardPhoto>
            <Camera onTakePhoto={(e) => takePhoto?.(e)} />
          </CardPhoto>
        );
      }

      return (
        <CardPhoto>
          <Image src={item} style={{ width: "100%", height: "100%" }}></Image>
        </CardPhoto>
      );
    },
    [limitPhotos],
  );

  const shouldShowPagination = React.useMemo(() => {
    return formattedPhotos[progress.value] !== "camera";
  }, [progress.value, formattedPhotos]);

  return (
    <View style={{ height: 200 }}>
      <Carousel
        ref={ref}
        {...baseOptions}
        style={{ width: screenWidth }}
        pagingEnabled
        snapEnabled
        loop={false}
        onProgressChange={progress}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        data={formattedPhotos}
        renderItem={renderItem}
      />

      <If condition={shouldShowPagination}>
        <Pagination.Basic
          progress={progress}
          data={formattedPhotos}
          dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)" }}
          containerStyle={{ gap: 5 }}
          onPress={onPressPagination}
        />
      </If>
    </View>
  );
};

export default CarouselPhotos;
