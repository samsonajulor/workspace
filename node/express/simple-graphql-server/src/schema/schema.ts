// import { makeExecutableSchema } from '@graphql-tools/schema'
import {buildSchema} from 'graphql' 
import resolver from '../resolvers/resolver'

const schema = buildSchema(`
  type newCompany {
      company: String
      employees: [Employees]
      departments: [Departments]
  }

   type Departments {
        name: String
        noOfEmployees: Int
        employee_Id: [Int]
        manager: Int
    }



type Employees {
 id: ID!
 name: String!
}

type Query {
 getEmployees: [Employees]
 getDepartments: [Departments]
}

    type Mutation {
        addEmployees(id: ID!, name: String): [Employees]
        addEmployeesToDepartment(nameOfDept:String, ID: ID! ):Departments
        addManager(dept: String, noOfManagers: Int):Departments
        addDepartment(nameOfDept: String): [Departments]
    }

type schema {
 query: Query
 mutation: Mutation
}
`)



// export default makeExecutableSchema({
//  typeDefs: schema,
//  resolvers: resolver
// })
export default schema


