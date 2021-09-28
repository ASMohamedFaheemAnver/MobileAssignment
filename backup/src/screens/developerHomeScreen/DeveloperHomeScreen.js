import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { globalStyles } from "../styles";

function DeveloperHomeScreen({}) {
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
    </SafeAreaView>
  );
}

DeveloperHomeScreen.propTypes = {};

export default connect(null, {})(DeveloperHomeScreen);
