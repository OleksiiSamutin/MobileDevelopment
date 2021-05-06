import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";
import * as ScreenOrientation from "expo-screen-orientation";
import {Image} from 'react-native-elements'
const arraySplitter = (arr = [], maxArrSize = 9) => {
  const result = [];
  for (let i = 0; i < Math.ceil(arr.length / maxArrSize); i++) {
    result[i] = arr.slice(i * maxArrSize, i * maxArrSize + maxArrSize);
  }
  return result;
};

const GenerateRows = (props) => {
  const { images, width, height, orientation } = props;
  const styles = StyleSheet.create({
    imageGallery: {
      flex: 0,
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
      // paddingTop: 10,
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
      flex: 0,
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
          <Image
            source={{ uri: images[0].largeImageURL }}
            style={styles.img}
            PlaceholderContent={ <ActivityIndicator size="large" color="#0000ff" />}
          />
        ) : null}
      </View>
      <View style={styles.col3_1}>
        <View style={images[1] ? styles.col1_3 : styles.emptycol}>
          {images[1] ? (
            <Image
              source={{ uri: images[1].largeImageURL }}
              style={styles.img}
              PlaceholderContent={ <ActivityIndicator size="large" color="#0000ff" />}
            />
          ) : null}
        </View>
        <View style={images[2] ? styles.col1_3 : styles.emptycol}>
          {images[2] ? (
            <Image
              source={{ uri: images[2].largeImageURL }}
              style={styles.img}
              PlaceholderContent={ <ActivityIndicator size="large" color="#0000ff" />}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
  const Row2 = () => (
    <View style={styles.row2}>
      <View style={images[3] ? styles.col1_3 : styles.emptycol}>
        {images[3] ? (
          <Image
            source={{ uri: images[3].largeImageURL }}
            style={styles.img}
            indicator={() => {
              return <Text>Loading</Text>;
            }}
          />
        ) : null}
      </View>
      <View style={images[4] ? styles.col1_3 : styles.emptycol}>
        {images[4] ? (
          <Image
            source={{ uri: images[4].largeImageURL }}
            style={styles.img}
            indicator={() => {
              return <Text>Loading</Text>;
            }}
          />
        ) : null}
      </View>
      <View style={images[5] ? styles.col1_3 : styles.emptycol}>
        {images[5] ? (
          <Image
            source={{ uri: images[5].largeImageURL }}
            style={styles.img}
            indicator={() => {
              return <Text>Loading</Text>;
            }}
          />
        ) : null}
      </View>
    </View>
  );
  const Row3 = () => (
    <View style={styles.row3}>
      <View style={styles.col3_1}>
        <View style={images[6] ? styles.col1_3 : styles.emptycol}>
          {images[6] ? (
            <Image
              source={{ uri: images[6].largeImageURL }}
              style={styles.img}
              PlaceholderContent={ <ActivityIndicator size="large" color="#0000ff" />}
            />
          ) : null}
        </View>
        <View style={images[7] ? styles.col1_3 : styles.emptycol}>
          {images[7] ? (
            <Image
              source={{ uri: images[7].largeImageURL }}
              style={styles.img}
              PlaceholderContent={ <ActivityIndicator size="large" color="#0000ff" />}
            />
          ) : null}
        </View>
      </View>
      <View style={images[8] ? styles.col9_2 : styles.emptyBigcol}>
        {images[8] ? (
          <Image
            source={{ uri: images[8].largeImageURL }}
            style={styles.img}
            indicator={() => {
              return <Text>Loading</Text>;
            }}
          />
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
    axios
      .get(
        "https://pixabay.com/api/?key=19193969-87191e5db266905fe8936d565&q=%E2%80%9Cyellow+flowers%E2%80%9D&image_type=photo&per_page=27"
      )
      .then((res) => {
        this.setState({ images: res.data.hits });
      });
    // ScreenOrientation.getOrientationAsync().then((orientation) => {
    //   const orientation1 =
    //     orientation1.orientationInfo.orientation ==
    //     ScreenOrientation.Orientation.PORTRAIT_UP
    //       ? "portrait"
    //       : "landscape";
    //   this.setState({ orientation: orientation1 });
    // });
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
    const { images, screenWidth, screenHeight, orientation } = this.state;
    // Alert.alert(JSON.stringify(images));
    return (
      <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
        {/* <Button title="Pick an image from gallery" onPress={this.pickImage} /> */}
        <View>
          {images.length !== 0
            ? arraySplitter(images).map((image, i) => (
                <GenerateRows
                  key={i}
                  images={image}
                  orientation={orientation}
                  width={screenWidth}
                  height={screenHeight}
                />
              ))
            : null}
          {/* {} */}
        </View>
      </ScrollView>
    );
  }
}
export default ImageGallery;
