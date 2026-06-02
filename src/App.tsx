import { useState, useEffect, useRef } from 'react'
// TODO: import useRef
import type { Expense } from './types/expense'
import { STORAGE_KEY } from './constants'
import { filterExpenses } from './utils/filterExpenses'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import SearchBar from './components/SearchBar'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? (JSON.parse(saved) as Expense[]) : []
  })

  const [query, setQuery] = useState('')
  // TODO: add a state for the filtered results (starts with the full expenses list)
   const [filteredExpenses, setFilteredExpenses] =
    useState<Expense[]>(expenses)
  // TODO: create a useRef to hold the debounce timer ID
  const debounceTimer = useRef<number | null>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  }, [expenses])
  // TODO: replace this direct call with a debounced approach:
  //       - use a useEffect with [query, expenses] deps
  //       - clear the previous timer, set a new 300ms timer
  //       - inside the timer, call filterExpenses and update the filtered results state
  // const filteredExpenses = filterExpenses(expenses, query)
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = window.setTimeout(() => {
      const result = filterExpenses(expenses, query)
      setFilteredExpenses(result)
    }, 300)

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [query, expenses])

  function handleAddExpense(expense: Omit<Expense, 'id'>) {
    setExpenses(prev => [
      ...prev,
      { ...expense, id: crypto.randomUUID() },
    ])
  }

  function handleDeleteExpense(id: string) {
    setExpenses(prev => prev.filter(e => e.id !== id))
  }

  return (
    <div className="app-layout">
      <aside>
        <h1>Expense Manager</h1>
        <ExpenseForm onAddExpense={handleAddExpense} />
      </aside>
      <main>
        <SearchBar query={query} onQueryChange={setQuery} />
        <ExpenseList
          expenses={filteredExpenses}
          onDeleteExpense={handleDeleteExpense}
        />
      </main>
    </div>
  )
}

export default App
