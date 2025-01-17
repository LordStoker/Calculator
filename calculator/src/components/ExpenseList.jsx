import ExpenseItem from "./ExpenseItem.jsx";
import { MdDelete } from "react-icons/md";// material design

export default function ExpenseList(props){
  return (
    <>
      <ul className="list">
        {props.expenses.map(expense => {
          return (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              handleDelete={props.handleDelete}
              handleEdit={props.handleEdit}
            />
          );
        })}
      </ul>
      {props.expenses.length > 0 && (
        <button className="btn" onClick={props.clearItems}>
          clear expenses
          <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
}