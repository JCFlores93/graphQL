//crear un esquema ejecutable
const { makeExecutableSchema } = require('graphql-tools')
//El schema debe tener un querytype donde definimos al cual le estamos dando
//acceso a nuestros clientes
const typeDefs = `
    type Curso {
        id: ID!
        titulo: String!
    }

    type Query {
        cursos: [Curso]
    }
`

const schema = makeExecutableSchema({
    typeDefs
})

module.exports = schema