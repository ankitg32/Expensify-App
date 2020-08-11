import React from 'react';
import ExpenseListItem from './ExpenseListItem';
import { connect } from 'react-redux';
import selectExpenses from './../selectors/expenses';

const ExpenseList = (props) => (
    <div>
        <h1>Expense List</h1>
        <p>{props.expenses.length} Expenses:</p>
        {props.expenses.map(expense => 
            <ExpenseListItem key={expense.id} {...expense}/>
        )}
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
};

const connectedExpenseList = connect(mapStateToProps)(ExpenseList)

export default connectedExpenseList;