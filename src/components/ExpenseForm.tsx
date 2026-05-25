import { CATEGORIES } from '../constants'
import type { Expense } from '../types/expense'


//React control input form with useState
interface ExpenseFormProps {
  onAddExpense: (newExpense: Expense) => void
  expenses: Expense[]
}

function ExpenseForm({ onAddExpense, expenses }: ExpenseFormProps) {
  function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const newExpense: Expense = {
      id: Date.now().toString(),
      description: formData.get('description') as string,
      amount: parseFloat(formData.get('amount') as string),
      category: formData.get('category') as string,
      date: new Date().toISOString()
    }
    onAddExpense(newExpense)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h2>Add Expense</h2>
      <label>
        Name
        <input
          name="description"
          placeholder="e.g. Lunch"
          required
        />
      </label>
      <label>
        Amount ($)
        <input
          name="amount"
          type="number"
          placeholder="0.00"
          min={0}
          step="0.01"
          required
        />
      </label>
      <label>
        Category
        <select name="category" required>
          <option value="">Select category</option>
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>
      <button type="submit">Add Expense</button>
    </form>
  )
}

export default ExpenseForm
