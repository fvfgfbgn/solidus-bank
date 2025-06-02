
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
  time: string;
  category: string;
}

export interface Account {
  id: string;
  type: string;
  number: string;
  balance: number;
  currency: string;
  status: 'active' | 'blocked';
}

export interface Card {
  id: string;
  type: string;
  number: string;
  balance: number;
  expiryDate: string;
  status: 'active' | 'blocked';
  creditLimit?: number;
}

interface ClientState {
  balance: number;
  transactions: Transaction[];
  accounts: Account[];
  cards: Card[];
}

interface ClientContextType {
  clientData: ClientState;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date' | 'time'>) => void;
  addAccount: (account: Omit<Account, 'id' | 'number'>) => void;
  addCard: (card: Omit<Card, 'id' | 'number'>) => void;
  updateBalance: (amount: number) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
};

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [clientData, setClientData] = useState<ClientState>({
    balance: 10000, // Начальный капитал 10 тысяч рублей
    transactions: [
      {
        id: '1',
        type: 'income',
        amount: 10000,
        description: 'Начальный баланс',
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        category: 'Пополнение'
      }
    ],
    accounts: [
      {
        id: '1',
        type: 'Текущий счет',
        number: '40817810123456789012',
        balance: 10000,
        currency: 'RUB',
        status: 'active'
      }
    ],
    cards: []
  });

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date' | 'time'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('ru-RU', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    setClientData(prev => ({
      ...prev,
      transactions: [newTransaction, ...prev.transactions],
      balance: transaction.type === 'income' 
        ? prev.balance + transaction.amount 
        : prev.balance - transaction.amount
    }));
  };

  const addAccount = (account: Omit<Account, 'id' | 'number'>) => {
    const newAccount: Account = {
      ...account,
      id: Date.now().toString(),
      number: `4081781${Math.random().toString().slice(2, 14)}`
    };

    setClientData(prev => ({
      ...prev,
      accounts: [...prev.accounts, newAccount]
    }));
  };

  const addCard = (card: Omit<Card, 'id' | 'number'>) => {
    const newCard: Card = {
      ...card,
      id: Date.now().toString(),
      number: Math.random().toString().slice(2, 18)
    };

    setClientData(prev => ({
      ...prev,
      cards: [...prev.cards, newCard]
    }));
  };

  const updateBalance = (amount: number) => {
    setClientData(prev => ({
      ...prev,
      balance: prev.balance + amount
    }));
  };

  return (
    <ClientContext.Provider value={{
      clientData,
      addTransaction,
      addAccount,
      addCard,
      updateBalance
    }}>
      {children}
    </ClientContext.Provider>
  );
};
