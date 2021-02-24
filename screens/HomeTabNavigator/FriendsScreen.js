import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";

const FriendsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <FlatList
        keyExtractor={(item, index) => item.id.toString()} //Using keyExtractor to override RN default 'key'
        data={props.route.params.players}
        renderItem={(itemData) => (
          <View>
            <Text>{itemData.item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FriendsScreen;
