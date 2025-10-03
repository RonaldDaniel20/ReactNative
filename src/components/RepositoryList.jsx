import React from "react"
import { FlatList, View, StyleSheet } from "react-native"
import Loading from "./loading/Loading";
import RepositoryItem from "./RepositoryItem";
import useRepo from "../Hooks/useRepo";


//Queries
import { GET_REPOSITORIES } from "../graphql/queries";

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator}></View>

const RepositoryList = () => {

    const { data, loading, refetch } = useRepo();

    if(loading){
        return (
            <View>
                <Loading />
            </View>
        )
    }


    const repositoryNodes = data 
                            ? data.repositories.edges.map(edge => edge.node)
                            : [];

    return (
        <FlatList 
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({item}) => <RepositoryItem props={item}/>}
            keyExtractor={item => item.id}
        />
    )
}

export default RepositoryList;