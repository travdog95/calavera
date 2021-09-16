import React, { useCallback } from "react";
import { View } from "react-native";
import { Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { ModalResultType } from "react-native-use-modal";
import { BorderlessButton } from "react-native-gesture-handler";

import { useHelpModal } from "./HelpModal";
import Constants from "../../constants/constants";

const HelpButton = (props) => {
  const helpKey = props.helpKey;
  const isInHeader = props.isInHeader === undefined || props.isInHeader === false ? false : true;
  const size = props.size === undefined ? 24 : props.size;
  const color = props.color === undefined ? "black" : props.color;

  const helpModal = useHelpModal();

  const handlePress = useCallback(async () => {
    const result = await helpModal.show({
      title: Constants.help[helpKey].title,
      message: Constants.help[helpKey].helpText,
      url: Constants.help[helpKey].url,
      urlText: Constants.help[helpKey].urlText,
    });

    if (result.type === ModalResultType.CONFIRM) {
      // handle confirm
    } else {
      // handle cancel
    }
  }, [helpModal]);

  return (
    <View>
      {isInHeader ? (
        <Item
          title="Help"
          iconComponent={Ionicons}
          iconName="help-circle-outline"
          onPress={handlePress}
        />
      ) : (
        <BorderlessButton onPress={handlePress}>
          <Ionicons name="help-circle-outline" size={size} color={color} />
        </BorderlessButton>
      )}
    </View>
  );
};

export default HelpButton;
