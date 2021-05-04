import React from "react";
import { StyleSheet, Text, View, Image, Dimensions, Alert } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import Posters from "./PostersExport";
import { TouchableHighlight } from "react-native-gesture-handler";
const windowWidth = Dimensions.get("window").width;
import Swipeout from "react-native-swipeout";

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: "NOPE",
    };
    // this = {...props}
    // // { Title, Year, imdbID, noid, Type, Poster, Details: {
    // //   Rated,
    //   Released,
    //   Runtime,
    //   Genre,
    //   Director,
    //   Writer,
    //   Actors,
    //   Plot,
    //   Language,
    //   Country,
    //   Awards,
    //   imdbRating,
    //   imdbVotes,
    //   Production
    // } }) {
    //   this.title = Title;
    //   this.year = Year;
    //   this.imdbID = imdbID;
    //   this.noid = noid;
    //   this.type = Type;
    //   this.poster = Poster;
    //   this.production = Production

    // }
  }
  findPosterImage = () => {
    if (this.props.Poster && Posters[this.props.Poster.split(".jpg")[0]]) {
      return Posters[this.props.Poster.split(".jpg")[0]];
    } else {
      return false;
    }
  };
  openDetails = () => {
    this.setState({ clicked: "YOU CLICKED" });
  };
  render() {
    let swipeBtns = [
      {
        text: "Delete",
        backgroundColor: "red",
        underlayColor: "rgba(0, 0, 0, 1, 0.6)",
        onPress: () => {
          this.props.deleteMovie(this.props.keyId);
        },
      },
    ];
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
        width: this.props.screenWidth,
      },
      col1: {
        paddingRight: 10,
        // backgroundColor: "transparent",
      },
      col2: {
        width: this.props.screenWidth - 80,
      },
      images: {
        flex: 1,
        backgroundColor: "white",
        width: 60,
        height: 60,
        padding: 10,
        // resizeMode: 'contain'
      },
      detailsWrapper: {
        flex: 1,
        flexDirection: "column",
        padding: 15,
      },
      detailsImages: {
        flex: 1,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        width: 150,
        height: 240,
        padding: 10,
        marginBottom: 10,
      },
      details: {
        color: "#666",
      },
      defaultTextColor: {
        color: "#000",
      },
      detailsTextContainer: {
        marginBottom: 15,
      },
    });
    return (
      <View>
        {this.props.withDetails ? (
          <View style={styles.detailsWrapper}>
            {this.findPosterImage() ? (
              <Image
                source={this.findPosterImage()}
                style={styles.detailsImages}
                width="150"
              />
            ) : (
              <View style={styles.images}></View>
            )}
            <View style={styles.detailsTextContainer}>
              <Text style={styles.details}>
                Title:{" "}
                <Text style={styles.defaultTextColor}> {this.props.Title}</Text>
              </Text>
              <Text style={styles.details}>
                Year:{" "}
                <Text style={styles.defaultTextColor}>
                  {" "}
                  {this.props.Details.Year}
                </Text>
              </Text>
              <Text style={styles.details}>
                Genre:{" "}
                <Text style={styles.defaultTextColor}>
                  {" "}
                  {this.props.Details.Genre}
                </Text>
              </Text>
            </View>

            <View style={styles.detailsTextContainer}>
              <Text style={styles.details}>
                Director:{" "}
                <Text style={styles.defaultTextColor}>
                  {" "}
                  {this.props.Details.Director}
                </Text>
              </Text>
              <Text style={styles.details}>
                Actors:{" "}
                <Text style={styles.defaultTextColor}>
                  {" "}
                  {this.props.Details.Actors}
                </Text>
              </Text>
            </View>

            <View style={styles.detailsTextContainer}>
              <Text style={styles.details}>
                Country:{" "}
                <Text style={styles.defaultTextColor}>
                  {" "}
                  {this.props.Details.Country}
                </Text>
              </Text>
              <Text style={styles.details}>
                Language:{" "}
                <Text style={styles.defaultTextColor}>
                  {" "}
                  {this.props.Details.Language}
                </Text>
              </Text>
              <Text style={styles.details}>
                Production:{" "}
                <Text style={styles.defaultTextColor}>
                  {" "}
                  {this.props.Details.Production}
                </Text>
              </Text>
              <Text style={styles.details}>
                Released:{" "}
                <Text style={styles.defaultTextColor}>
                  {" "}
                  {this.props.Details.Released}
                </Text>
              </Text>
              <Text style={styles.details}>
                Runtime:{" "}
                <Text style={styles.defaultTextColor}>
                  {" "}
                  {this.props.Details.Runtime}
                </Text>
              </Text>
            </View>

            <View style={styles.detailsTextContainer}>
              <Text style={styles.details}>
                Awards:{" "}
                <Text style={styles.defaultTextColor}>
                  {" "}
                  {this.props.Details.Awards}
                </Text>
              </Text>
              <Text style={styles.details}>
                Raiting:{" "}
                <Text style={styles.defaultTextColor}>
                  {" "}
                  {this.props.Details.imdbRating}/10
                </Text>
              </Text>
            </View>

            <Text style={styles.details}>
              Plot:{" "}
              <Text style={styles.defaultTextColor}>
                {" "}
                {this.props.Details.Plot}
              </Text>
            </Text>
          </View>
        ) : (
          <Swipeout
            right={swipeBtns}
            autoClose="true"
            backgroundColor="transparent"
          >
            <TouchableHighlight
              onPress={() => {
                this.props.openDetails(this.props);
              }}
            >
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
                    <Text>{this.props.Title}</Text>
                    <Text>{this.props.Year}</Text>
                    {/* <Text>{this.imdbID}</Text> */}
                    <Text>{this.props.noid}</Text>
                    <Text>{this.props.Type}</Text>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          </Swipeout>
        )}
      </View>
    );
  }
}
export default Movie;
