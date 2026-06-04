import { useReducer } from 'react'
import { CATEGORIES } from '../constants'
import type { Expense } from '../types/expense'
import {
  formReducer,
  initialFormState,
} from '../reducers/formReducer'

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, 'id'>) => void
}

function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [state, dispatch] = useReducer(
    formReducer,
    initialFormState,
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (
      !state.description ||
      !state.amount ||
      !state.category
    ) {
      dispatch({
        type: 'SET_ERROR',
        error: 'Please fill all fields',
      })
      return
    }

    onAddExpense({
      description: state.description,
      amount: parseFloat(state.amount),
      category: state.category,
      date: new Date().toISOString().split('T')[0],
    })

    dispatch({ type: 'RESET' })
  }

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h2>Add Expense</h2>

      <label>
        Name
        <input
          value={state.description}
          onChange={e =>
            dispatch({
              type: 'SET_FIELD',
              field: 'description',
              value: e.target.value,
            })
          }
          placeholder="e.g. Lunch"
          required
        />
      </label>

      <label>
        Amount ($)
        <input
          value={state.amount}
          onChange={e =>
            dispatch({
              type: 'SET_FIELD',
              field: 'amount',
              value: e.target.value,
            })
          }
          type="number"
          placeholder="0.00"
          min={0}
          step="0.01"
          required
        />
      </label>

      <label>
        Category
        <select
          value={state.category}
          onChange={e =>
            dispatch({
              type: 'SET_FIELD',
              field: 'category',
              value: e.target.value,
            })
          }
          required
        >
          <option value="">Select category</option>

          {CATEGORIES.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      {state.error && (
        <p className="error-message">
          {state.error}
        </p>
      )}

      <button type="submit">
        Add Expense
      </button>
    </form>
  )
}

export default ExpenseForm