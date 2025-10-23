import React from "react";
import { TextInput as NativeTextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    isError: {
        borderColor: '#d73a4a'
    },
    styleText: {
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#ccc',
        paddingLeft: 10,
    }
});

const TextInput = ({ style, error, ...props}) => {
    const textInputStyle = [
        style,
        styles.styleText,
        error && styles.isError
    ];
    return <NativeTextInput  style = {textInputStyle} {...props}/>
}

export default TextInput;