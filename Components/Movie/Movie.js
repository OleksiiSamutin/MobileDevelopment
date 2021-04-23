import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import Posters from "./PostersExport";
const windowWidth = Dimensions.get("window").width;

class Movie {
  constructor({ Title, Year, imdbID, noid, Type, Poster }) {
    this.title = Title;
    this.year = Year;
    this.imdbID = imdbID;
    this.noid = noid;
    this.type = Type;
    this.poster = Poster;
  }
  findPosterImage = () => {
    if (this.poster && Posters[this.poster.split(".jpg")[0]]) {
      return Posters[this.poster.split(".jpg")[0]];
    } else {
      return false;
    }
  };
  renderMoviePreview = (windowWidth) => {
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "flex-start",
          padding: 10,
          borderBottomColor: "lightgrey",
          borderBottomWidth: 1,
          width: windowWidth,
        },
        col1: {
          paddingRight: 10,
          backgroundColor: "white",
        },
        col2: {
          width: windowWidth - 80,
        },
        images: {
          flex: 1,
          backgroundColor: "white",
          width: 60,
          height: 60,
          padding: 10,
          // resizeMode: 'contain'
        },
      });
    return (
      <View style={styles.container}>
        <View style={styles.col1}>
          {this.findPosterImage() ? (
            <Image
              source={this.findPosterImage()}
              style={styles.images}
              width="40"
            />
          ) : (
            <View style={styles.images}></View>
          )}
        </View>
        <View style={styles.col2}>
          <View>
            <Text>{this.title}</Text>
            <Text>{this.year}</Text>
            <Text>{this.imdbID}</Text>
            <Text>{this.noid}</Text>
            <Text>{this.type}</Text>
          </View>
        </View>
      </View>
    );
  };
}
export default Movie;
