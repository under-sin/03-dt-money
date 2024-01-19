import { ReactNode, useCallback, useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

interface Transaction {
  id: string
  category: string
  description: string
  type: 'income' | 'outcome'
  price: number
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
  closedModal: (state: boolean) => void
  open: boolean
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [open, setOpen] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })
    setTransactions(response.data)
  }, [])

  function closedModal(state: boolean) {
    setOpen(state)
  }

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, category, price, type } = data

      const response = await api.post('transactions', {
        description,
        category,
        price,
        type,
        createdAt: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
        closedModal,
        open,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
