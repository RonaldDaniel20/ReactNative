import React from "react"
import { FlatList, View, StyleSheet } from "react-native"
import Loading from "./loading/Loading";
import RepositoryItem from "./RepositoryItem";
import useRepo from "../Hooks/useRepo";


const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator}></View>

export const RepositoryListContainer = ({ data }) => {
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

const RepositoryList = () => {

    const { data, loading, refetch } = useRepo();

    if(loading){
        return (
            <View>
                <Loading />
            </View>
        )
    }

    return <RepositoryListContainer data={data}/>

}

export default RepositoryList;