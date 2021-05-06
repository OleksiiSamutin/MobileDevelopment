import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Movie from "../../Components/Movie";
import * as data from "./files/MoviesList.json";
import MovieDetails from "../../Components/Movie/MovieDetailsExport";
import * as ScreenOrientation from "expo-screen-orientation";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { ScreenWidth } from "react-native-elements/dist/helpers";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 1,
  },
  backButton: {
    paddingTop: 10,
    paddingLeft: 10,
    marginRight: "auto",
  },
  addFilm: {
    position: "absolute",
    top: -45,
    right: 10,
  },
  addNewFilmWrapper: {
    paddingTop: 10,
  },
  input: {
    borderWidth: 1,
    width: Dimensions.get("window").width,
    marginTop: 10,
    marginBottom: 20,
    padding: 5,
  },
  inputsWrapper: {
    marginTop: 20,
    marginBottom: 20,
  },
  upperSearchPanel: {
    width: Dimensions.get("window").width,
    backgroundColor: "#FCE762",
  },
  searchBar: {},
  addFilmBtnWrapp: {
    alignSelf: "flex-end",
  },
});

class MoviesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: "portrait",
      screenWidth: Dimensions.get("window").width,
      screenHeight: Dimensions.get("window").height,
      movies: [],
      search: "",
      isLoading: false,
    };
  }
  openDetails = (imdbID) => {
    this.setState({ isLoading: true });
    axios
      .get(`http://www.omdbapi.com/?apikey=7e9fe69e&i=${imdbID}`)
      .then((res) => {
        // Alert.alert(JSON.stringify(res.data))
        const Details = res.data;
        this.setState({
          isOpenDetails: true,
          currentMovie: Details,
          isLoading: false,
        });
      });
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
  deleteMovie = (id) => {
    const copyBeforeDelete = [...this.state.movies];
    let newArray = [];
    if (id === 0) {
      newArray = copyBeforeDelete.slice(1);
    } else if (id === copyBeforeDelete.length - 1) {
      newArray = copyBeforeDelete.slice(0, id);
    } else {
      newArray = [
        ...copyBeforeDelete.slice(0, id),
        ...copyBeforeDelete.slice(id + 1, copyBeforeDelete.length),
      ];
    }
    this.setState({ movies: newArray });
  };
  updateSearch = (search) => {
    const regex = /^[\sA-Za-z0-9._~()'!*:@,;+?-]*$/;
    this.setState({ errorInput: false });
    if (search.length >= 3) {
      if (search.match(regex)) {
        this.setState({ isLoading: true });
        axios
          .get(
            `http://www.omdbapi.com/?apikey=7e9fe69e&s=${search.trim()}&page=1`
          )
          .then((result) => {
            // result.
            // Alert.alert(JSON.stringify(resul))
            this.setState({ movies: result.data.Search, isLoading: false });
          });
      } else {
        this.setState({ errorInput: true });
      }
    } else {
      this.setState({ movies: undefined });
    }
    this.setState({ search });
  };
  addFilm = () => {
    const yearsRegex = /^[12][0-9]{3}$/;
    if (
      this.state.newFilmType &&
      this.state.newFilmTitle &&
      this.state.newFilmType
    ) {
      if (this.state.newFilmYear.match(yearsRegex)) {
        const newFilm = {
          Year: this.state.newFilmYear,
          Type: this.state.newFilmType,
          Title: this.state.newFilmTitle,
        };
        const updatedListMovies = [...this.state.movies, newFilm];
        this.setState({
          movies: updatedListMovies,
          addNewFilm: false,
          newFilmYear: "",
          newFilmType: "",
          newFilmTitle: "",
        });
      } else {
        Alert.alert("Not valid year fild");
      }
    } else {
      Alert.alert("One of the field is empty");
    }
  };

  render() {
    const {
      addNewFilm,
      screenWidth,
      screenHeight,
      isOpenDetails,
      currentMovie,
      movies,
      search,
      isLoading,
      errorInput
    } = this.state;
    // const filteredMovies = movies
    // .map((film, i) => {
    //   const Details = MovieDetails[film.imdbID]
    //     ? MovieDetails[film.imdbID]
    //     : {};
    //   return (
    //     <Movie
    //       {...film}
    //       Details={Details}
    //       screenWidth={screenWidth}
    //       openDetails={this.openDetails}
    //       keyId={i}
    //       deleteMovie={this.deleteMovie}
    //     />
    //   );
    // })
    //   .filter((movie) => {
    //     if (movie.props.Title.toLowerCase().includes(search.toLowerCase())) {
    //       return movie;
    //     }
    //   });
    return (
      <KeyboardAvoidingView style={styles.container}>
        {addNewFilm ? (
          <ScrollView
            stickyHeaderIndices={[0]}
            style={styles.addNewFilmWrapper}
          >
            <AntDesign
              name="back"
              size={24}
              color="black"
              onPress={() => {
                this.setState({ isOpenDetails: false, addNewFilm: false });
              }}
            />
            <View style={styles.inputsWrapper}>
              <Text>Title</Text>
              <TextInput
                style={styles.input}
                width={screenWidth - 20}
                onChangeText={(text) => {
                  this.setState({ newFilmTitle: text });
                }}
              />
              <Text>Type</Text>
              <TextInput
                style={styles.input}
                width={screenWidth - 20}
                onChangeText={(text) => {
                  this.setState({ newFilmType: text });
                }}
              />
              <Text>Year</Text>
              <TextInput
                style={styles.input}
                width={screenWidth - 20}
                keyboardType="numeric"
                onChangeText={(text) => {
                  this.setState({ newFilmYear: text });
                }}
              />
              <Button title="Add" onPress={this.addFilm} />
            </View>
          </ScrollView>
        ) : isOpenDetails ? (
          <ScrollView stickyHeaderIndices={[0]}>
            <AntDesign
              name="back"
              size={24}
              color="black"
              onPress={() => {
                this.setState({ isOpenDetails: false });
              }}
              style={styles.backButton}
            />
            <Movie {...currentMovie} withDetails={true} />
          </ScrollView>
        ) : (
          <ScrollView stickyHeaderIndices={[0]}>
            <View style={{ ...styles.upperSearchPanel, width: screenWidth }}>
              <SearchBar
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value={search}
                containerStyle={{
                  ...styles.searchBar,
                  width: screenWidth - 40,
                }}
                showLoading={isLoading}
                lightTheme={true}
              />
              <View style={styles.addFilmBtnWrapp}>
                <AntDesign
                  name="plus"
                  size={24}
                  color="black"
                  style={styles.addFilm}
                  onPress={() => {
                    this.setState({ addNewFilm: true });
                  }}
                />
              </View>
            </View>

            {!movies || isLoading || errorInput ? (
              <View
                style={{
                  width: screenWidth,
                  height: screenHeight / 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {errorInput ? (
                  <Text style={{textAlign:"center"}}>
                    You shouldn't enter non-latin characters or special characters
                  </Text>
                ) : null}
                {isLoading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : null}
              </View>
            ) : (
              movies.map((film, i) => {
                const Details = MovieDetails[film.imdbID]
                  ? MovieDetails[film.imdbID]
                  : {};
                return (
                  <Movie
                    {...film}
                    Details={Details}
                    screenWidth={screenWidth}
                    openDetails={this.openDetails}
                    keyId={i}
                    deleteMovie={this.deleteMovie}
                  />
                );
              })
            )}
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    );
  }
}

export default MoviesView;
