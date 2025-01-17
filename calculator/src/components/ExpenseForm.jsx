import { MdAdd } from "react-icons/md";

export default function ExpenseForm(props){
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">Charge</label>
          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            placeholder=""
            value={props.charge}
            onChange={props.handleCharge}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            placeholder=""
            value={props.amount}
            onChange={props.handleAmount}
          />
        </div>
        <div>
          <button type="submit" className="btn">
            {props.edit ? "Edit" : "Add"}
            <MdAdd className="btn-icon" />
          </button>
        </div>
      </div>

    </form>
  );
}