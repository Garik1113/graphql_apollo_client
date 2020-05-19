import React from "react";
import { gql } from "apollo-boost";
import { Query, Mutation } from "react-apollo";
import "../App.css";

const GET_TODOS = gql`
  {
    todos {
      title
      id
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!) {
    deleteTodo(id: $id) {
      title
    }
  }
`;
class Todos extends React.Component {
  componentDidMount() {
    console.log(Query.prototype);
  }
  render() {
    return (
      <div className='container'>
        <h3 className='text-center mt-2'>Todos</h3>
        <Query query={GET_TODOS}>
          {({ loading, error, data }) => {
            if (loading) {
              return <p>loading...</p>;
            }
            if (error) {
              return <p>Error...</p>;
            }
            return (
              <div className='jumbotron'>
                <ul className='list-group'>
                  {data.todos.map(({ title, id, completed }) => {
                    return (
                      <li
                        key={id}
                        className='list-group-item mt-2 d-flex align-items-center justify-content-between'
                      >
                        {title}
                        <Mutation mutation={DELETE_TODO}>
                          {(deleteTodo) => {
                            return (
                              <span
                                className='close-span'
                                onClick={() => {
                                  deleteTodo({ variables: { id: id } });
                                }}
                              >
                                &times;
                              </span>
                            );
                          }}
                        </Mutation>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Todos;
