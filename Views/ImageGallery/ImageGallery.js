import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";
import * as ScreenOrientation from "expo-screen-orientation";
const arraySplitter = (arr = [], maxArrSize = 9) => {
  const result = [];
  for (let i = 0; i < Math.ceil(arr.length / maxArrSize); i++) {
    result[i] = arr.slice(i * maxArrSize, i * maxArrSize + maxArrSize);
  }
  return result;
};

const GenerateRows = (props) => {
    const {images,width,height,orientation} = props
  const styles = StyleSheet.create({
    imageGallery: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: 20,
    },
    button: {
      marginTop: 10,
    },
    row1: {
      flex: 0,
      flexDirection: "row",
      paddingTop: 10,
      backgroundColor: "white",
      height: orientation === "portrait" ? width / 1.5 : width / (3 / 2),
      justifyContent: "space-between",
      width: width,
      // backgroundColor: "red",

      //   flexWrap: "nowrap"
    },
    col9_2: {
      margin: 1,
      flex: 2,
      backgroundColor: "#E2EF70",
    },
    col3_1: {
      backgroundColor: "white",
      flex: 1,

      flexDirection: "column",
    },
    col1_3: {
      margin: 1,
      //   borderWidth: 1,
      flex: 1,
      backgroundColor: "#70E4EF",
      // flexBasis: 1,
    },
    col1_33: {
      margin: 1,
      flex: 0,
      backgroundColor: "#F038FF",
    },
    emptycol: {
      flex: 1,
      backgroundColor: "white",
    },
    emptyBigcol: {
      flex: 2,
      backgroundColor: "white",
    },
    row2: {
      flex: 0,
      flexDirection: "row",
      height: width / 3,
    },
    row3: {
      flex: 0,
      height: orientation === "portrait" ? width / 1.5 : width / (3 / 2),
      width: width,
      justifyContent: "space-between",
      flexDirection: "row",
    },
    img: {
      width: "100%",
      height: undefined,
      aspectRatio: 1,
      resizeMode: "contain",
    },
  });

  const Row1 = () => (
    <View style={styles.row1}>
      <View style={images[0] ? styles.col9_2 : styles.emptyBigcol}>
        {images[0] ? (
          <Image source={{ uri: images[0] }} style={styles.img} />
        ) : null}
      </View>
      <View style={styles.col3_1}>
        <View style={images[1] ? styles.col1_3 : styles.emptycol}>
          {images[1] ? (
            <Image source={{ uri: images[1] }} style={styles.img} />
          ) : null}
        </View>
        <View style={images[2] ? styles.col1_3 : styles.emptycol}>
          {images[2] ? (
            <Image source={{ uri: images[2] }} style={styles.img} />
          ) : null}
        </View>
      </View>
    </View>
  );
  const Row2 = () => (
    <View style={styles.row2}>
      <View style={images[3] ? styles.col1_3 : styles.emptycol}>
        {images[3] ? (
          <Image source={{ uri: images[3] }} style={styles.img} />
        ) : null}
      </View>
      <View style={images[4] ? styles.col1_3 : styles.emptycol}>
        {images[4] ? (
          <Image source={{ uri: images[4] }} style={styles.img} />
        ) : null}
      </View>
      <View style={images[5] ? styles.col1_3 : styles.emptycol}>
        {images[5] ? (
          <Image source={{ uri: images[5] }} style={styles.img} />
        ) : null}
      </View>
    </View>
  );
  const Row3 = () => (
    <View style={styles.row3}>
      <View style={styles.col3_1}>
        <View style={images[6] ? styles.col1_3 : styles.emptycol}>
          {images[6] ? (
            <Image source={{ uri: images[6] }} style={styles.img} />
          ) : null}
        </View>
        <View style={images[7] ? styles.col1_3 : styles.emptycol}>
          {images[7] ? (
            <Image source={{ uri: images[7] }} style={styles.img} />
          ) : null}
        </View>
      </View>
      <View style={images[8] ? styles.col9_2 : styles.emptyBigcol}>
        {images[8] ? (
          <Image source={{ uri: images[8] }} style={styles.img} />
        ) : null}
      </View>
    </View>
  );
  return (
    <View>
      <Row1 />
      <Row2 />
      <Row3 />
    </View>
  );
};

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img1: "",
      orientation: "portrait",
      images: [],
      screenWidth: Dimensions.get("window").width,
      screenHeight: Dimensions.get("window").height,
    };
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      const copyImgs = [...this.state.images];
      copyImgs.push(result.uri);
      this.setState({ images: copyImgs });
    }
  };

  componentWillUnmount() {
    ScreenOrientation.removeOrientationChangeListeners();
  }
  componentDidMount() {
    ScreenOrientation.getOrientationAsync().then((orientation) => {
      const orientation1 =
        orientation1.orientationInfo.orientation ==
        ScreenOrientation.Orientation.PORTRAIT_UP
          ? "portrait"
          : "landscape";
      this.setState({ orientation: orientation1 });
    });
    ScreenOrientation.addOrientationChangeListener((rotationEvent) => {
      const orientation =
        rotationEvent.orientationInfo.orientation ==
        ScreenOrientation.Orientation.PORTRAIT_UP
          ? "portrait"
          : "landscape";

      this.setState({
        orientation: orientation,
        screenWidth: Dimensions.get("window").width,
        screenHeight: Dimensions.get("window").height,
      });
    });
  }

  render() {
    const { images,screenWidth,screenHeight,orientation } = this.state;
    return (
      <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
        <Button title="Pick an image from gallery" onPress={this.pickImage} />
        <View>
          {arraySplitter(images).map((image, i) => (
            <GenerateRows key={i} images={image} orientation={orientation} width={screenWidth}/>
          ))}
        </View>
      </ScrollView>
    );
  }
}
export default ImageGallery;
