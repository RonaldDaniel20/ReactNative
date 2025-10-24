import React from "react"
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native"
import Loading from "./loading/Loading";
import RepositoryItem from "./RepositoryItem";
import useRepo from "../Hooks/useRepo";
import { useNavigate } from "react-router-native";

import { useState, useEffect } from "react";

import SortModal from "./sortedRepo/SortModal";


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    separator: {
        height: 10,
    },

    containerLoading: {
        flex: 1
    },

    sortModalContainer: {
        position: 'absolute',
        zIndex: 99999,
        left: 0,
        right: 0
    }
});

const ItemSeparator = () => <View style={styles.separator}></View>

export const RepositoryListContainer = ({ data }) => {


    const navigate = useNavigate();


    const repositoryNodes = data 
                        ? data.repositories.edges.map(edge => edge.node)
                        : [];
    


    const onPress = ( id ) => {
        navigate(`/repository/${id}`);
    }



    return (
        <FlatList 
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({item})  =>  (
                <TouchableOpacity onPress={() => onPress(item.id)}>
                    <RepositoryItem props={item}/>
                </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
        />
    )
}

const RepositoryList = () => {

    const [option, setOption] = useState({
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC'
    })

    const [data, loading, error, fetchRepositories] = useRepo();

    useEffect(() => {

        async function fetchData (){
            try{
                await fetchRepositories({
                    orderBy: option.orderBy,
                    orderDirection: option.orderDirection
                })
            }catch(e){
                console.error(e.message);
            }
        }

        fetchData();
    }, [option.orderBy, option.orderDirection])

    if(loading){
        return (
            <View style={styles.containerLoading}>
                <Loading />
            </View>
        )
    }


    const typeFilter = () => {
        if(option.orderBy === 'CREATED_AT' && option.orderDirection === 'DESC'){
            return "últimos repositorios"
        }
        else if(option.orderBy === 'RATING_AVERAGE' && option.orderDirection === 'DESC'){
            return "Repositorios mejor calificados"
        }
        else if(option.orderBy === 'RATING_AVERAGE' && option.orderDirection === 'ASC'){
            return "Repositorios de menor calificación"
        }
    }

    return (
        <View style={styles.container}>
            <View style = { styles.sortModalContainer}>
                <SortModal setOption={setOption} value={typeFilter()}/>
            </View>
            <View style = {{marginTop: 30}}>
                <RepositoryListContainer 
                    data={data}
                />
            </View>
        </View>
    )
}

export default RepositoryList;