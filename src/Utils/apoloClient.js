import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client';
import { API_GRAPHQL, IP } from '@env';
import { SetContextLink } from '@apollo/client/link/context';

const uri = API_GRAPHQL || `http://${IP}:4000`;

const httpLink = new HttpLink({uri: uri})

const authLink =  ( authStorage ) => {

  const AuthLink = new SetContextLink( async (prevContext, operation) => {
  try {
    const token = await authStorage.getAccessToken();
    return {
      headers: {
        ...prevContext.headers,
        authorization: token ? `Bearer ${token}`: ''
      },
    };
    }catch(e){
      console.log(e);
      return { headers: prevContext.headers };
    }
  });

  return AuthLink;

}

/*const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});*/

const client = (authStorage) => {
  const AuthLink = authLink(authStorage);

  return new ApolloClient({
    link: ApolloLink.from([AuthLink, httpLink]),
    cache: new InMemoryCache(),
  });
}

export default client;