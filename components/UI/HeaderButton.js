import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import Defaults from "../../constants/defaults";
import Colors from "../../constants/colors";

const CustomHeaderButton = (props) => {
  const iconSize = Defaults.isSmallScreen ? 20 : 24;
  const iconComponent = props.iconComponent ?? Ionicons;

  return (
    <HeaderButton
      {...props}
      IconComponent={iconComponent}
      iconSize={iconSize}
      color={Platform.OS === "android" ? "white" : Colors.theme.dark4}
    />
  );
};

export default CustomHeaderButton;
