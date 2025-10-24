import React from "react";
import { View, StyleSheet } from "react-native";
import { Menu, Divider, PaperProvider, Button } from "react-native-paper";
import { useState } from "react";

const SortModal = ({ setOption, value }) => {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <PaperProvider>
            <View >
                <Menu
                    visible = {visible}
                    onDismiss={closeMenu}
                    anchor = {<Button onPress={openMenu}>{value}</Button>}
                >
                    <Menu.Item  onPress = {() => {setOption({orderBy: 'CREATED_AT',orderDirection: 'DESC'}); closeMenu()}} title = "Últimos repositorios"/>
                    <Divider />
                    <Menu.Item  onPress = {() => {setOption({orderBy: 'RATING_AVERAGE',orderDirection: 'DESC'}); closeMenu()}} title = "Repositorios mejor calificados"/>
                    <Divider />
                    <Menu.Item  onPress = {() => {setOption({orderBy: 'RATING_AVERAGE',orderDirection: 'ASC'}); closeMenu()}} title = "Repositorios de menor calificación"/>
                </Menu>
            </View>
        </PaperProvider>
    )
}


export default SortModal;