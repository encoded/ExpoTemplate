import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import TextBase from "./TextBase";

/*
  Base component for button components.
  Use this to change the global button styling.
*/
const ButtonBase = ({ text, onPress, style, textStyle, ...props }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} {...props}>
      <TextBase style={textStyle}>{text}</TextBase>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  }
});

export default ButtonBase;
