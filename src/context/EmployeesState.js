import React, { useReducer } from 'react'
import employeesReducer from './employeesReducer'
import EmployeesContext from './employeesContext'
import { GET_EMPLOYEES, SET_FAVORITE, ERROR_REQ } from './types'

const EmployeesState = (props) => {
    const initialState = {
        loading: true,
        error: null,
        employees: [],
        favorites: [],
        alphabet: [
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'T',
            'U',
            'V',
            'W',
            'X',
            'Y',
            'Z',
        ],
        sortingFromMonth: [],
    }

    const [state, dispatch] = useReducer(employeesReducer, initialState)

    // Sort by alphabet
    const sortingAlphabet = (arr) => {
        let sortingArr = []

        state.alphabet.map((letter) => {
            const identical = arr.filter((i) => i.lastName[0] === letter)
            const obj = {
                [letter]: identical,
            }
            return sortingArr.push(obj)
        })

        dispatch({ type: GET_EMPLOYEES, payload: sortingArr })
    }

    // Get all employees
    const getEmployees = async () => {
        await fetch(
            'https://yalantis-react-school-api.yalantis.com/api/task0/users'
        )
            .then((res) => res.json())
            .then((data) => sortingAlphabet(data))
            .catch((error) => dispatch({ type: ERROR_REQ, payload: error }))
    }

    // Sort by
    const sortingMonth = (item) => {
        let sorting = []
        item.map((i) => {
            const bthdDate = new Date(i.dob)
            const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
                bthdDate
            )

            if (sorting.length === 0) {
                return sorting.push({
                    [month]: [i],
                })
            } else if (sorting.find((s) => Object.keys(s).toString() === month)) {
                const existMonth = sorting.find(
                    (s) => Object.keys(s).toString() === month
                )

                sorting = sorting.filter((f) => Object.keys(f).toString() !== month)

                let newMonth = { [month]: [i] }

                existMonth[month].forEach((e) => newMonth[month].push(e))

                return (sorting = [...sorting, newMonth])
            }

            return sorting.push({
                [month]: [i],
            })
        })

        return sorting
    }

    // Get from LocalStorage
    const getFromLS = () => {
        const local = localStorage.getItem('brthdEmployees')

        let sorting

        if (local) {
            sorting = sortingMonth(JSON.parse(local))
        } else {
            sorting = []
        }

        dispatch({
            type: SET_FAVORITE,
            payload: JSON.parse(local),
            sorting,
        })
    }

    // Add-Remove from LocalStorage
    const fromLocal = (obj) => {
        const local = localStorage.getItem('brthdEmployees')
        localStorage.removeItem('brthdEmployees')

        let brthdItems

        local && (brthdItems = JSON.parse(local))

        local && brthdItems.find((i) => i.id === obj.id)
            ? (brthdItems = brthdItems.filter((j) => j.id !== obj.id))
            : local
            ? (brthdItems = [...brthdItems, obj])
            : (brthdItems = [obj])

        localStorage.setItem('brthdEmployees', JSON.stringify(brthdItems))

        const sorting = sortingMonth(brthdItems)

        dispatch({
            type: SET_FAVORITE,
            payload: brthdItems,
            sorting,
        })
    }

    return (
        <EmployeesContext.Provider
            value={{
                loading: state.loading,
                error: state.error,
                employees: state.employees,
                alphabet: state.alphabet,
                favorites: state.favorites,
                sortingFromMonth: state.sortingFromMonth,
                sortingAlphabet,
                sortingMonth,
                getEmployees,
                getFromLS,
                fromLocal,
            }}
        >
            {props.children}
        </EmployeesContext.Provider>
    )
}
export default EmployeesState
