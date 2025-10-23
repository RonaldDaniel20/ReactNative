import React from "react";
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useNavigate } from "react-router-native";
import Text from "../Text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//Libreria para validar y crear formularios
import { Formik } from "formik";
import * as yup from 'yup';
import FormikTextInput from "../FormikTextInput";

import useCreateReview from "../../Hooks/useCreateReview";
import Loading from "../loading/Loading";
import Notification from "../notification/Notification";

import { useState, useRef, useEffect } from "react";


const validationSchema = yup.object().shape({
        ownerName: yup.string().required('Repository owner name is required'),
        repositoryName: yup.string().required('Repository name is required'),
        rating: yup
                .number()
                .transform((value, originalValue) => {

                    const parsed = Number(originalValue);
                    return isNaN(parsed) ? undefined : parsed;
                })
                .typeError('Rating must be a number')
                .required('Rating is required')
                .min(0, 'Rating must be at least 0')
                .max(100, 'Rating must be at most 100'),
        text: yup.string().optional()
    })


const InputInformation = ({ onSubmit }) => {
    return (
        <View style = {{gap: 10}}>
            <FormikTextInput name='ownerName' placeholder='Repository Owner'/>
            <FormikTextInput name='repositoryName' placeholder='Repository Name'/>
            <FormikTextInput name='rating' keyboardType="numeric" placeholder='Rating between 0 and 100'/>
            <FormikTextInput name="text" placeholder="Review" multiline={true} />
            <TouchableOpacity style = {styles.styleButton} onPress={onSubmit}>
                <Text style = {{color: 'white', fontWeight: 'bold'}}> Submit Review </Text>
            </TouchableOpacity>
        </View>
    )
}


const CreateReview = () => {

    const [ createNewReview, data, loading, error ] = useCreateReview();
    const [ notification, setNotification ] = useState(false);
    const navigate = useNavigate();
    const timeoutRef = useRef(null)

    useEffect(() => {
        return () => {
            if(timeoutRef.current){
                clearTimeout(timeoutRef.current);
            }
        }
    },[])


    const initialValues = {
        ownerName: '',
        repositoryName: '',
        rating: '',
        text: ''
    }


    if(loading){
        return (
            <View style = {{ flex: 1}}>
                <Loading /> 
            </View>
        )
    }

    if(error){
        return (
            <View style = {{ flex: 1, backgroundColor: 'white'}}>
                <Text>{error.message}</Text>
            </View>
        )
    }

    const onSubmit = async ( values ) => {
        const { ownerName, repositoryName, rating, text } = values;


        try {

            console.log(typeof(rating));
            const request = await createNewReview({
                ownerName,
                rating,
                repositoryName,
                text
            })

            setNotification(true);

            timeoutRef.current = setTimeout(() => {
                setNotification(false);
                navigate(`/repository/${request.data.createReview.repositoryId}`);
            }, 3000)

        }catch (e){
            console.error(e);
        }
    }


    return (
        <KeyboardAvoidingView 
            style = {{flex: 1, backgroundColor: 'white'}} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
            <KeyboardAwareScrollView 
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={true}
                resetScrollToCoords={{ x: 0, y: 0 }}
            >
                <View style = {styles.container}>
                    { notification && 
                        <View> 
                            <Notification Title={'Success'} icon={'success'} description={'Review created successfully'}/>
                        </View>
                    }
                    <View style = {{alignItems: 'center', marginBottom: 10}}>
                        <Text style = {{fontSize: 25}} fontWeight={'bold'}> Create a Review </Text>
                    </View>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>  
                        {({ handleSubmit }) => <InputInformation  onSubmit={handleSubmit}/>}
                    </Formik>   
                </View>
            </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
    ) 

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        gap: 5
    },

    styleButton: {
        backgroundColor: '#0366d6',
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
    },

    scrollContainer: {
        flexGrow: 1
    }

})

export default CreateReview;