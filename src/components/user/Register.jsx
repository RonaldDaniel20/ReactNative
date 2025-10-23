import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-native";
import * as yup from "yup";

import Loading from "../loading/Loading";
import Text from "../Text";
import Notification from "../notification/Notification";

import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "../FormikTextInput";

import useCreateUser from "../../Hooks/useCreateUser"; 


const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters long')
        .max(30, 'Username must be at most 30 characters long'),
    password: yup
        .string()
        .required('Password is required')
        .min(5, 'Password must be at least 5 characters long')
        .max(50, 'Password must be at most 50 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{5,}$/, 
            'Password must contain at least one uppercase letter, one lowercase letter and one number'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required')
})

const InputInformation = ({ onSubmit }) => {
    return (
        <View style = {{gap: 10}}>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" secureTextEntry />
            <FormikTextInput name="confirmPassword" placeholder="Confirm Password" secureTextEntry />
            <TouchableOpacity style = {styles.styleButton} onPress={onSubmit}>
                <Text  style = {{color: 'white', fontWeight: 'bold'}}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

const Register = () => {

    const [ createNewUser, data, loading, error ] = useCreateUser();
    const [notification, setNotification] = useState(false);
    const navigate = useNavigate();
    const timeoutRef = useRef(null)

    useEffect(() => {
        return () => {
            if(timeoutRef.current){
                clearTimeout(timeoutRef.current);
            }
        }
    },[])

    if(loading){
        return (
            <View style={{flex: 1}}>
                <Loading />
            </View>
        )
    }

    if(error){
        return (
            <View style = {{flex: 1, backgroundColor: 'white'}}>
                <Text>Error: {error.message}</Text>
            </View>
        )
    }

    const initialValues = {
        username: '',
        password: '',
        confirmPassword: ''
    }

    const onSubmit = async ( values ) => {
        const { username, password } = values;

        try{
            await createNewUser({
                username,
                password
            })

            setNotification(true);

            timeoutRef.current = setTimeout(() => {
                setNotification(false);
                navigate('/SignIn')
            }, 3000)

        }catch(e){
            console.error(e)
        }
    }

    return (
        <View style = {styles.container}>
            { notification && 
                <View> 
                    <Notification Title={'Success'} icon={'success'} description={'Register successfully'}/>
                </View>
            }
            <View style = {{alignItems: 'center'}}>
                <Text style = {{fontSize: 26 }} fontWeight={'bold'}>Create a new account</Text>
            </View>
            <Formik initialValues={initialValues} 
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
            >
                {({ handleSubmit }) => <InputInformation onSubmit={handleSubmit} />}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    
    container : {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        gap: 5
    },

    styleText: {
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#ccc',
        paddingLeft: 10,
    },

    styleButton: {
        backgroundColor: '#0366d6',
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
    },
});

export default Register;