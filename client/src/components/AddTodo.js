import React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
      title
    }
  }
`;

export default class AddTodo extends React.Component {
  render() {
    let input;
    return (
      <Mutation mutation={ADD_TODO}>
        {(addTodo, { data }) => (
          <div className='jumbotron'>
            <input
              type='text'
              placeholder='Todo title'
              className='form-control'
              ref={(node) => {
                input = node;
              }}
            />
            <button
              className='btn btn-success mt-2'
              onClick={() => {
                addTodo({ variables: { title: input.value } });
                input.value = "";
              }}
            >
              Add Todo
            </button>
          </div>
        )}
      </Mutation>
    );
  }
}
