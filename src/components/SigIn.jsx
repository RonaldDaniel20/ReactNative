import react from "react";
import Text from "./Text";
import { View, StyleSheet, Button } from "react-native";
import Loading from "./loading/Loading";

import { useNavigate } from "react-router-native";
import { Formik } from "formik";

import FormikTextInput from "./FormikTextInput";

import * as yup from 'yup';

import useSignIn from "../Hooks/useSignIn";

import Notification from "./notification/Notification";
import { useState } from "react";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },

    StylesText: {
        borderRadius: 8,
        borderWidth: 1,
        width: 250,
        borderColor: '#ccc',
        paddingLeft: 11
    },

    containerTwo: {
        gap: 10
    },

    notificationWrapper: {
        position: 'absolute',
        zIndex: 9999,
    }, 

    containerLoading: {
        flex: 1
    },

    containerRaiz: {
        flex: 1,
        backgroundColor: 'white',
    }
})

const BodyInformation = ({ onsubmit }) => {
    return (
        <View style = {styles.containerTwo}>
            <FormikTextInput style = {styles.StylesText} name={'user'} placeholder = {'Username'} testID = "username"/>
            <FormikTextInput secureTextEntry = {true} style = {styles.StylesText} name={'password'} placeholder = {'Password'} testID = "password" />
            <Button  title="Sign In" onPress={onsubmit} testID="submittButton"/>
        </View>
    )
}

//Función de validacion
const validationShema = yup.object().shape({
    user: yup
        .string()
        .required('The field username is obligatory')
        .min(3, 'The field username must contain at least three characteres'),
    password: yup
        .string()
        .required('The field password is obligatory')
        .min(3, 'The field password must contain least three characteres')
});


const SignInContainer = () => {
    const [signIn, data, loading, error] = useSignIn();
    const [showNotification, setShowNotification] = useState(false);
    const navigate = useNavigate();

    if(loading){
        return(
            <View style={styles.containerLoading}>
                <Loading />
            </View>
        )
    }

    if(error){
        return(
            <Text style={styles.container}>
                {`Error ${error.message}`}
            </Text>
        )
    }

    const onSubmit = async (values) => {
        const { user, password } = values;

        try {
            await signIn({ username: user, password});
            setShowNotification(true);

            setTimeout(() => {
                navigate('/');
            }, 4000)

        }catch(e){
            console.error(e);
        }
    }

    return (
        <View style = {styles.containerRaiz}>
            {showNotification &&
                <View style = {styles.notificationWrapper}>
                    <Notification  Titule={'success'} icon={'success'} description={'Login Exitoso'}/>
                </View> 
            }
            <SigIn onSubmit={onSubmit}/>
        </View>
    )
}

//Componente principal
export const SigIn = ({ onSubmit }) => {


    const initialValues = {
        user: '',
        password: ''
    }

    const handle = async (values) => {
        onSubmit(values);
    };


    return (
        <View style = {styles.container}>
            <Text style = {{fontSize: 20}}fontWeight={'bold'}>
                Inicio de Sesión
            </Text>
            <Formik initialValues={initialValues} onSubmit={handle} validationSchema={validationShema}>
                {({handleSubmit}) => <BodyInformation onsubmit={handleSubmit}/>}
            </Formik>
        </View>
    )
}

export default SignInContainer;