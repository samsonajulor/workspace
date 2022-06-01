//graphql resolver data
const newCompany: any = {
  company: 'Sam & Co',
  employees: [
    {
      id: 1,
      name: 'Mayor',
    },
  ],
  departments: [
    {
      engineering: {
        name: 'Engineering',
        noofEmployees: 4,
        employee_Id: [1, 2, 3, 4],
        manager: 1,
      },
    },
  ],
}

const resolver = {
  getEmployees() {
    return newCompany.employees
  },
  getDepartments() {
    return newCompany.departments
  },
  addEmployees({ id, name }: any) {
    newCompany.employees.push({
      id,
      name,
    })

    return newCompany.employees
  },
  addEmployeesToDepartment({ nameOfDept, id }: any) {
    let departments = newCompany.departments
    let updatedDepartment = departments.map((department: any) => {
      if (department.nameOfDept === nameOfDept) {
        department.nameOfDept.noOfEmployees += 1
        department.nameOfDept.employee_id.push(id)
      }
      return newCompany.department.nameOfDept
    })
    return updatedDepartment
  },
  addManager({ dept, noOfManagers }: any) {
    let departments = newCompany.departments
    let updatedDepartment = departments.map((department: any) => {
      if (department.name === dept) {
        department.dept.manager += noOfManagers
      }
      return departments.dept.manager
    })

    return updatedDepartment
  },
  addDepartment({ nameOfDept }: any) {
    let newDepartment = newCompany.departments
      newDepartment.push({
            
      nameOfDept: {
        name: nameOfDept,
        noofEmployees: 0,
        employee_Id: [],
        manager: 0,
      }
    }
      )
      return newDepartment
  },
}

export default resolver
