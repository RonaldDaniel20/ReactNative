import { Searchbar } from "react-native-paper"
import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useDebounce } from 'use-debounce';


const SearchRepository = ({ searchQuery, setSearchQuery }) => {

    return (
        <Searchbar
            placeholder="Busquedad..."
            onChangeText={setSearchQuery}
            value={searchQuery}
        />
    );
};

export default SearchRepository;