//crear un esquema ejecutable
const { makeExecutableSchema } = require('graphql-tools')
//El schema debe tener un querytype donde definimos al cual le estamos dando
//acceso a nuestros clientes
const typeDefs = `
    #Clase de Curso
    type Curso {
        id: ID!
        titulo: String!
        #Descripcion del curso
        descripcion: String!
        profesor: Profesor
        rating: Float
        comentario: [Comentario]
    }
    type Profesor {
        id: ID!
        nombre: String!
        nacionalidad: String!
        genero: Genero
        cursos: [Curso]
    }

    enum Genero {
        MASCULINO
        FEMENINO
    }

    type Comentario {
        id: ID!
        nombre: String!
        cuerpo: String!
    }

    type Query {
        cursos: [Curso]
        profesores: [Profesor]
        curso(id: Int):Curso
        profesor(id: Int): Profesor
    }
`

const schema = makeExecutableSchema({
    typeDefs
})

module.exports = schema