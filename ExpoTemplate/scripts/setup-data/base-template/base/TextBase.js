import React from "react";
import { Text, StyleSheet } from "react-native";
import COLORS from "@config/ConfigColors";

/*
  Base component for text components.
  Use this to change the global text styling.
*/
const TextBase = ({ children, style, ...props }) => {
  return (
    <Text style={[styles.text, {color: COLORS.text}, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "System", // Or your custom font like 'Roboto', 'Inter', etc.
    fontSize: 16
  },
});

export default TextBase;
