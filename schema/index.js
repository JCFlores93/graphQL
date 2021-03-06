//crear un esquema ejecutable
const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
//El schema debe tener un querytype donde definimos al cual le estamos dando
//acceso a nuestros clientes
const resolvers = require('../resolvers')
const Profesor = require('./Profesor')
const Curso = require('./Curso')

/**
 * la capa de query son como los routers
 */
const rootQuery = `

    union ResultadoBusqueda = Profesor | Curso

       type Query {
        cursos: [Curso]
        profesores: [Profesor]
        curso(id: Int):Curso
        profesor(id: Int): Profesor
        buscar(query: String!): [ResultadoBusqueda]
    }
        type Mutation {
            profesorAdd(profesor: NuevoProfesor):Profesor
            profesorEdit(profesorId: Int!, profesor: ProfesorEditable): Profesor
            profesorDelete(profesorId: Int!): Profesor
            cursoAdd(curso: NuevoCurso): Curso
            cursoEdit(cursoId: Int!, curso: CursoEditable): Curso
            cursoDelete(cursoId: Int!): Curso
        }
`

const schema = makeExecutableSchema({
    typeDefs: [rootQuery, Profesor, Curso],
    resolvers
})

/*addMockFunctionsToSchema({
    schema,
    mocks: {
        Curso: () => {
            return {
                id: casual.uuid,
                titulo: casual.sentence,
                descripcion: casual.sentences(2)
            }
        },
        Profesor: () => {
            return {
                nombre: casual.name,
                nacionalidad: casual.country
            }
        }
    },
    /**
     * Sirve para dat preferencia anuestros resolvers
     */
//preserveResolvers: true
//})*/

module.exports = schema