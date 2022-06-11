import {ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import Clients from "./components/Clients";
import AddClient from "./components/addClient";

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="container">
      <AddClient />
      <Clients />
    </div>
    </ApolloProvider>
  );
}

export default App;
