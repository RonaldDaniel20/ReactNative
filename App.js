import React from "react";

import { ApolloProvider } from "@apollo/client/react";
import { NativeRouter } from "react-router-native";
import Main from "./src/components/Main";
import client from "./src/Utils/apoloClient";

import AuthStorage from "./src/Utils/authStorage";

//Contexto
import AuthStorageContext from "./src/context/AuthStorageContext";

const storage = new AuthStorage();

const Client = client(storage);

const App = () => {
  return (
    <NativeRouter>
        <ApolloProvider client={Client}>
          <AuthStorageContext.Provider value={storage}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider>
    </NativeRouter>
  )
};

export default App;