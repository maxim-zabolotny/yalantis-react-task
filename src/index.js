import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import EmployeesState from './context/EmployeesState'

ReactDOM.render(
    <React.StrictMode>
        <EmployeesState>
            <App />
        </EmployeesState>
    </React.StrictMode>,
    document.getElementById('root')
)
