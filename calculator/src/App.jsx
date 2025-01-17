import { useEffect, useState, useRef } from 'react'
import './App.css'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import {nanoid} from 'nanoid';
import Alert from './components/Alert';

const initialExpenses = [localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [] ];

export default function App() {

const [expenses, setExpenses] = useState(initialExpenses);
const[amount, setAmount] = useState('');
const[charge, setCharge] = useState('');
const[edit, setEdit] = useState(false);
const[alert, setAlert] = useState({show: false});

const idRef = useRef(0);

useEffect(() => {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}
,[expenses]);

function handleCharge(e){
  setCharge(e.target.value);
}

function handleAmount(e){
  let amount = e.target.value;
  amount ? setAmount(parseInt(e.target.value)) : setAmount(amount);
}

function handleAlert({type, text}){
  setAlert({show: true, type, text});
  setTimeout(() => {
    setAlert({show: false});
  }, 3000);
}

function handleSubmit(e){
  e.preventDefault();
  if(charge !== '' && amount > 0){
      if(edit){
          setExpenses(expenses.map(expense => {
          return expense.id === idRef.current?{...expense, charge, amount} : expense;}
        ));
          setEdit(false);
          idRef.current = 0;
      }
    else{
      const newExpense = {id: nanoid(), charge, amount};
      setExpenses([...expenses, newExpense]);
      handleAlert({type: 'success', text: 'item added'});
    }
      setCharge('');
      setAmount('');
  }
  else{
    handleAlert({type: 'danger', text: 'Charge cannot be empty and amount has to be bigger than zero'});
  }
}

function handleEdit(id){
  const expense = expenses.find(expense => expense.id === id);
  setEdit(true);
  setCharge(expense.charge);
  setAmount(expense.amount);
  idRef.current = id;
}

function handleDelete(id){
  setExpenses(expenses.filter(expense => expense.id !== id));
  handleAlert({type: 'danger', text: 'item deleted'});
}

function clearItems(){
  setExpenses([]);
  handleAlert({type: 'danger', text: 'all items deleted'});
}




  return (
    <>
    {alert.show && <Alert type={alert.type} text={alert.text}/>}
    <h1>Budget Calculator</h1>
    <main className="App">
      <ExpenseForm
        charge={charge}
        amount={amount}
        handleCharge={handleCharge}
        handleAmount={handleAmount}
        handleSubmit={handleSubmit}
        edit={edit}
      />    

      {expenses && <ExpenseList
        expenses= {expenses}
        clearItems = {clearItems}
        handleDelete = {handleDelete}
        handleEdit = {handleEdit}
      />} 
      </main>
      <h1>Total Spent:{" "}
      <span className="total">
        {expenses.reduce((acc, curr) => (acc += curr.amount), 0)}€
      </span>
      </h1>
     
    </>
  )
}

 
