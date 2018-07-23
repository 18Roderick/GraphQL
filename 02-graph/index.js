'use strict'

const express = require('express')

const app = express();

const expressGraphql = require('express-graphql')

const { buildSchema } = require('graphql')

const { courses } = require('./data.json');

const schema = buildSchema(`
    type Query {
        message: String
        course(id: Int!): Course
        courses(topic: String!): [Course]
    }

    type Mutation{
      updateCourseTopic(id: Int!, topic: String!): Course
    }

    type Course {
      id: Int
      title: String
      description: String
      author: String
      topic: String
      url: String
    }
`)

const getCourse = (args) => {
  let id = args.id
  return courses.filter(course => {
    return course.id === id
  })[0]
}

const getCourses = (args) => {
  if (args.topic) {
    let topic = args.topic
    return courses.filter(course => {
      return course.topic === topic
    })
  } else {
    return courses
  }
}

const updateCourseTopic = ({id, topic}) => {
  courses.map(course => {
    if (course.id === id) {
      course.topic = topic
      return course
    }
  })

  return courses.filter(course => course.id === id)[0]
}

const root = {
  message: () => 'hello world',
  course: getCourse,
  courses: getCourses,
  updateCourseTopic
}

app.use('/graphql', expressGraphql({
  schema,
  rootValue: root,
  graphiql: true
}))

app.listen(3000, () => console.log('server en http://localhost:3000'))
