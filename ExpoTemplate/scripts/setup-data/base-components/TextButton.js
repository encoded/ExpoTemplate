import React from "react";
import { TouchableOpacity } from "react-native";
import TextBase from "./TextBase";

/*
  Base component for text button components.
*/
const TextButton = ({ text, onPress, style, textStyle, ...props }) => {
  return (
    <TouchableOpacity {...props}>
      <TextBase style={textStyle}>{text}</TextBase>
    </TouchableOpacity>
  );
};

export default TextButton;
