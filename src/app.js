
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//BrowserRouter is used once to create the new router
//Route is used on every page. provide a path to match for and what to do when the user visits that path 
import 'normalize.css/normalize.css';
import './styles/style.scss';
import configureStore from './store/configureStore';
import {addExpense, removeExpense, editExpense} from './actions/expenses';
import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from './actions/filters';
import ExpenseList from './components/ExpenseList';
import getVisibleExpenses from './selectors/expenses';
import AppRouter from './routers/AppRouter';

const store = configureStore();

const expenseOne = store.dispatch(addExpense({description: 'Gas rent', note: 'July month\'s gas rent',  amount:50000, createdAt: 4500}));
const expenseTwo = store.dispatch(addExpense({description: 'Water rent', note: 'July month\'s water rent',  amount:20000, createdAt: 1000}));
const expenseThree = store.dispatch(addExpense({description: 'Rent', note: 'July month\'s water rent',  amount:20000, createdAt: 10950}));

console.log('added these expenses:', store.getState());
console.log('testing');
console.log(getVisibleExpenses(store.getState().expenses, store.getState().filters));

const jsx = 
(
    <Provider store = {store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));