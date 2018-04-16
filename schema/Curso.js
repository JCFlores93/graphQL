module.exports = `
type Curso {
    id: ID!
    titulo: String!
    #Descripcion del curso
    descripcion: String!
    profesor: Profesor
    rating: Float @deprecated(reason: "No creeemos más en los puntajes")
    comentarios: [Comentario]
}
type Comentario {
    id: ID!
    nombre: String!
    cuerpo: String!
}
input NuevoCurso {
    titulo: String, descripcion: String
}
input CursoEditable {
    titulo: String
    descripcion: String
}
`