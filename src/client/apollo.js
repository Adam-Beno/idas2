import { ApolloClient } from 'react-apollo';

const client = new ApolloClient({
  reduxRootSelector: state => state.get('graphql'),
});

export default client;
