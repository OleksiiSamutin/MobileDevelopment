import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import { LineChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Svg, { Line, Circle } from "react-native-svg";
import {
  VictoryChart,
  VictoryLine,
  VictoryPie,
  VictoryTheme,
} from "victory-native";

let screenWidth = Dimensions.get("screen").width;
let screenHeight = Dimensions.get("screen").height;
import * as ScreenOrientation from "expo-screen-orientation";

const ChartShow = (props) => {
  const pieData = [
    { y: 30, label: "30%", color: "#ffae00" },
    { y: 30, label: "30%", color: "#00c52b" },
    { y: 40, label: "40%", color: "#000000" },
  ];
  generateData = (min, max, step) => {
    let coords = [];
    for (let x = min; x <= max; x += step) coords.push({ x, y: Math.exp(x) });
    return coords;
  };
  if (props.isSwitched) {
    return (
      <View>
        <VictoryChart
          theme={VictoryTheme.material}
          width={
            props.orientation === "portrait"
              ? screenWidth + 40
              : screenHeight - 10
          }
          height={
            props.orientation === "portrait"
              ? screenHeight - 180
              : screenWidth - 110
          }
        >
          <VictoryLine
            data={generateData(-6, 6.1, 0.2)}
            animate={{ duration: 500 }}
          />
        </VictoryChart>
      </View>
    );
  }

  if (!props.isSwitched) {
    return (
      <View>
        <VictoryPie
          colorScale={pieData.map(({ color }) => color)}
          padAngle={() => 2}
          innerRadius={props.orientation === "portrait" ? 80 : 40}
          width={
            props.orientation === "portrait" ? screenWidth : screenHeight - 10
          }
          height={
            props.orientation === "portrait"
              ? screenHeight - 180
              : screenWidth - 110
          }
          data={pieData.map(({ y, label }) => ({ y, label }))}
          animate={{ duration: 800 }}
        />
      </View>
    );
  }
};

export default class DrawingView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSwitched: true,
      orientation: "portrait",


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

      this.setState({ orientation: orientation });
    });

  }

  render() {
    return (
      <View style={styles.components}>
        <SwitchSelector
          options={options}
          initial={0}
          fontSize={12}
          textColor={"#aaaaaa"}
          selectedColor={"yellow"}
          buttonColor={"#262625"}
          backgroundColor={"#EEEEEE"}
          borderColor={"#353535"}
          borderRadius={50}
          onPress={(value) => this.setState({ isSwitched: value })}
          style={{ paddingTop: 30, marginLeft: 20, marginRight: 20 }}
        />

        <ChartShow
          isSwitched={this.state.isSwitched}
          orientation={this.state.orientation}
          styles={styles.plotView}
        />
      </View>
    );
  }
}

const options = [
  { label: "Графік", value: true },
  { label: "Діаграма", value: false },
];

const styles = StyleSheet.create({
  components: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  plotView: {
    marginBottom: 10,
  },
});

