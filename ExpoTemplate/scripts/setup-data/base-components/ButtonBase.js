import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import TextBase from "./TextBase";

/*
  Base component for button components.
  Use this to change the global button styling.
*/
const ButtonBase = ({ style, children, ...props}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      {children}
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
