const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

let Todos = [
  {
    id: 1,
    title: "Buy food",
    completed: false,
  },
  {
    id: 2,
    title: "Learn Java",
    completed: true,
  },
  {
    id: 3,
    title: "Learn Python",
    completed: false,
  },
];

const TodoType = new GraphQLObjectType({
  name: "TodoType",
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    todos: {
      type: GraphQLList(TodoType),
      resolve() {
        return Todos;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTodo: {
      type: TodoType,
      args: {
        title: { type: GraphQLString },
      },
      resolve(parent, args) {
        const todo = {
          id: Todos.length,
          title: args.title,
          completed: false,
        };
        Todos[Todos.length] = todo;
        return Todos;
      },
    },
    editTodo: {
      type: TodoType,
      args: {
        id: { type: GraphQLInt },
        isCompleted: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        Todos = Todos.map((e) =>
          e.id === args.id ? { ...e, completed: args.isCompleted } : e
        );
        return Todos;
      },
    },
    deleteTodo: {
      type: TodoType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        Todos = Todos.filter((e) => e.id !== args.id);
        return Todos;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
