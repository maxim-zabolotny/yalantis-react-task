import React, { useContext, useEffect } from 'react'
import EmployeesContext from './context/employeesContext'
import './App.css'

export const App = () => {
  const employeesContext = useContext(EmployeesContext)
  const {
    getEmployees,
    employees,
    getFromLS,
    fromLocal,
    favorites,
    sortingFromMonth,
  } = employeesContext

  const checkItems = (id) => {
    if (favorites) {
      const checked = favorites.find((j) => j.id === id)
      if (checked) return true
    }
    return false
  }

  const handleChecked = (obj) => {
    fromLocal(obj)
  }

  useEffect(() => {
    getFromLS()
    getEmployees()
    // eslint-disable-next-line
  }, [])

  const getDate = (str) => {
    const date = new Date(str)
    const day = date.getDate()
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
        date
    )
    const year = date.getFullYear()

    const newStr = `${day} ${month}, ${year} year`

    return newStr
  }

  return (
      <div className='App'>
        <div className='employees'>
          <h1>Employees</h1>
          <div className='sorting-employees'>
            {employees.length > 0 &&
            employees.map((i, index) => (
                <div className='section-letter' key={index}>
                  <h3>{Object.keys(i)}</h3>
                  {Object.values(i)[0].length > 0 &&
                  Object.values(i)[0].map((n, index) => (
                      <p key={index}>
                        <label htmlFor={n.id}>
                          {n.lastName} {n.firstName}
                        </label>
                        <input
                            type='checkbox'
                            name='selectEmployees'
                            id={n.id}
                            checked={checkItems(n.id)}
                            onChange={() => handleChecked(n)}
                        />
                      </p>
                  ))}
                  {Object.values(i)[0].length === 0 && <span>-----</span>}
                </div>
            ))}
          </div>
        </div>
        <div className='employees-birthday'>
          <h1>Employees birthday</h1>
          <div className='birthday-list'>
            {sortingFromMonth.length === 0 && <h3>No selected employees</h3>}
            {sortingFromMonth.length > 0 &&
            sortingFromMonth.map((item, index) => (
                <ul key={index}>
                  <h3>{Object.keys(item).toString()}</h3>
                  {item[Object.keys(item).toString()].map((i, index) => (
                      <li key={index}>
                        {i.firstName} {i.lastName} - {getDate(i.dob)}
                      </li>
                  ))}
                </ul>
            ))}
          </div>
        </div>
      </div>
  )
}
