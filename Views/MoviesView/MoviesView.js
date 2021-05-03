import React, { Component} from "react";
import { StyleSheet, Text, View,Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Movie from "../../Components/Movie";
import * as data from "./files/MoviesList.json";
import MovieDetails from "../../Components/Movie/MovieDetailsExport";
import * as ScreenOrientation from "expo-screen-orientation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 1,
  },
});

class MoviesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: "portrait",
      screenWidth: Dimensions.get("window").width
    };
  }
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

      this.setState({ orientation: orientation,screenWidth: Dimensions.get("window").width });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {data.Search.map((film) => {
            const Details = MovieDetails[film.imdbID] ? MovieDetails[film.imdbID] : {};
            return new Movie({...film, Details}).renderMoviePreview(this.state.screenWidth);
          })}
        </ScrollView>
      </View>
    );
  }
}

export default MoviesView;
