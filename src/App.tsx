import { useState } from 'react'
import type { Expense } from './types/expense'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([])

  const handleAddExpense = (newExpense: Expense) => {
    setExpenses([...expenses, newExpense])
  }

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id))
  }

  return (
    <div className="app-layout">
      <aside>
        <h1>Expense Manager</h1>
        <ExpenseForm onAddExpense={handleAddExpense} expenses={expenses} />
      </aside>
      <main>
        <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
      </main>
    </div>
  )
}

export default App
