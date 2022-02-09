import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";

import DefaultText from "../../components/UI/DefaultText";
import ScreenPrimaryButton from "../../components/UI/ScreenPrimaryButton";

import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";
import Constants from "../../constants/constants";
import TKO from "../../helpers/helperFunctions";
import { updateGame } from "../../helpers/db";

const CardsByRoundScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //Local state
  const [cardsByRound, setCardsByRound] = useState(props.route.params.cardsByRound);

  const updateCardsByRoundState = (newValue, index) => {
    let newArray = [];
    for (let i = 0; i < cardsByRound.length; i++) {
      if (index === i) {
        newArray.push(newValue);
      } else {
        newArray.push(cardsByRound[i]);
      }
    }

    setCardsByRound(newArray);
  };

  const saveCardsByRoundHandler = () => {
    navigation.navigate("CreateGameScreen");
  };

  const headerText = `Cards By Round`;

  return (
    <View style={styles.screen}>
      {/* <ScrollView>
        {cardsByRound.map((numCards, index) => {
          return (
            <View>
              <DefaultText>{numCards}</DefaultText>
            </View>
          );
        })}
      </ScrollView> */}
      <View style={styles.buttonContainer}>
        <ScreenPrimaryButton onPress={saveCardsByRoundHandler} buttonText={"Save"} />
      </View>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: `Number of Cards by Round`,
  };
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.screenBackgroundColor },
  totalBidsContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    borderColor: "black",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    backgroundColor: Colors.theme.light2,
  },
  totalBidsText: {
    fontSize: Defaults.largeFontSize,
    textAlign: "center",
    fontFamily: Defaults.fontFamily.bold,
  },
  buttonContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
});

export default CardsByRoundScreen;
