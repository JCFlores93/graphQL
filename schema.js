//crear un esquema ejecutable
const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
//El schema debe tener un querytype donde definimos al cual le estamos dando
//acceso a nuestros clientes
const {casual} = require('casual')

/**
 * la capa de query son como los routers
 */
const typeDefs = `
    #Clase de Curso
    type Curso {
        id: ID!
        titulo: String!
        #Descripcion del curso
        descripcion: String!
        profesor: Profesor
        rating: Float @deprecated(reason: "No creeemos más en los puntajes")
        comentarios: [Comentario]
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

const resolvers = {
    Query: {
        cursos: () => {
            return [{
                id: 1,
                titulo: 'Curso de GrapQL',
                descripcion: 'Aprendiendo GraphQL',
                /*
                tenemos dos opciones
                profesor: {
                    nombre: 'Pablo'
                }*/
            }, {
                id: 2,
                titulo: 'Curso de PHP',
                descripcion: 'Aprendiendo PHP'
            }]
        }
    },
    Curso: {
        profesor: () => {
            return {
                nombre: 'Pablo',
                nacionalidad: 'peruana'
            }
        },
        comentarios: () => [
            {
                id: 1,
                nombre: "Jean",
                cuerpo: "hola"
            },
            {
                id: 2,
                nombre: "tony",
                cuerpo: "how r u?"
            },
            {
                id: 3,
                nombre: "flores",
                cuerpo: "whatsapp"
            },
            
        ]
    }
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

addMockFunctionsToSchema({
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
    preserveResolvers: true
})

module.exports = schema