import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

const EditExpensePage = (props) => {
    console.log(props);
    console.log(props.expense);
    return (
        <div>
            <ExpenseForm 
                expense = {props.expense}
                onSubmit = {(expense) => {
                    console.log('updated', expense);
                    //we are abstracting out the onSubmit function here so we can re-use this same component for 'Add Expenses' page
                    props.dispatch(editExpense(props.expense.id, expense));
                    props.history.push('/');
                }}
            />
            <button onClick={()=>{
                // props.dispatch( removeExpense({id}) ); //cannot use this because there is nothing called 'props' inside this functional component: we are destructuring the props 
                props.dispatch(removeExpense({id: props.expense.id}));
                props.history.push('/');
            }}>Remove</button>
        </div>
    );
}

// the second argument to this function is props of the wrapper component
const mapStateToProps = (state, props) => {
    return {
        // using find because it returns the first value that matches
        // instead of filter that returns an array of all the matches
        // and we need the value, not the array of matched values
    expense: state.expenses.find((expense) => (
        expense.id === props.match.params.id
    ))
};
}

export default connect(mapStateToProps)(EditExpensePage);