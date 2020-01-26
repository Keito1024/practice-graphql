import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient, { gql } from "apollo-boost";


const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${
          process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
        }`
      }
    });
  }
});

const query = gql`
  {
    org1: organization(login: "apollographql") {
      repositories(first: 5) {
        nodes {
          ...commonFields
        }
      }
    },
    org2: organization(login: "teamlab") {
      repositories(first: 5) {
        nodes {
          ...commonFields
        }
      }
    }
  }
fragment commonFields on Repository {
  id
  name
  url
  viewerHasStarred
  stargazers {
    totalCount
  }
}
`

// queryを叩いてみる
client.query({
  query
}).then(result => {
  console.log(result)
})

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
