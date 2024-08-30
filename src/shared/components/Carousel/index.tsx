import * as React from "react";
import { Dimensions, Image, StyleProp, View, ViewStyle } from "react-native";
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
  width?: number;
  height?: number;
  hasParallax?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

export const CarouselPhotos = ({
  photos,
  takePhoto,
  width,
  height,
  hasParallax,
  containerStyle,
  limitPhotos = 10,
}: CarouselPhotosProps) => {
  const screenWidth = width ?? Dimensions.get("window").width;

  const progress = useSharedValue<number>(0);
  const baseOptions = {
    vertical: false,
    width: screenWidth,
    height: (height ?? screenWidth) * 0.7,
  };

  const ref = React.useRef<ICarouselInstance>(null);

  const formattedPhotos = React.useMemo(() => {
    if (!takePhoto) return photos;

    if (photos.length >= limitPhotos) return photos;

    return [...photos, "camera"];
  }, [photos, takePhoto, limitPhotos]);

  const renderItem = ({ item }: CarouselRenderItemInfo<string>) => {
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
  };

  const shouldShowPagination = React.useMemo(() => {
    return formattedPhotos[progress.value] !== "camera";
  }, [progress.value, formattedPhotos]);

  return (
    <View style={{ height: height ?? baseOptions.height }}>
      <Carousel
        ref={ref}
        {...baseOptions}
        style={[{ width: screenWidth }, containerStyle]}
        pagingEnabled
        snapEnabled
        loop={false}
        vertical={false}
        onProgressChange={progress}
        mode={hasParallax ? "parallax" : undefined}
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
          dotStyle={{
            backgroundColor: "rgba(255,255,255,0.5)",
            borderRadius: 6,
            height: 6,
            width: 6,
            marginBottom: 10,
          }}
          activeDotStyle={{ backgroundColor: "rgba(255,255,255,1)" }}
          containerStyle={{ gap: 5 }}
        />
      </If>
    </View>
  );
};

export default CarouselPhotos;
