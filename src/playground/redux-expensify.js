import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//we need multiple reducers to efficiently manage variour actions like:
//  ADD_EXPENSE
const addExpense = ({description = '', note = '', amount = 0, createdAt = 0} = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount, 
        createdAt
    }
});

//  REMOVE_EXPENSE
const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id: id
});

//  EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id: id,
    updates
});

//  SET_TEXT_FITLER
const setTextFilter = (text='') => ({
    type: 'SET_TEXT_FILTER',
    text
});

//  SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

//  SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

//  SET_START_DATE
const setStartDate = (startDate = undefined) => ({
    type: 'SET_START_DATE',
    startDate
});

//  SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate //by default, the value for agruments is undefined so no need for explicitly mentioning it
});

//and then we'll have to combine these reducers
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type){
        // case 'ADD_EXPENSE': {return state.expenses.append(action.expense)};
        // USING ES6 SPREAD OPERATOR TO GET THE SAME EFFECT:
        case 'ADD_EXPENSE': {
            return [...state, action.expense];
        }
        case 'REMOVE_EXPENSE': {
            return state.filter( expense => expense.id !== action.id ) ;
        }
        case 'EDIT_EXPENSE': {
            return state.map( (expense)=>{
                if(expense.id === action.id){
                    return {...expense, ...action.updates}; //using object spreading
                }
            } );
        }
        default: return state;
    }
}

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type){
        case 'SET_TEXT_FILTER': {return {...state, text: action.text} ;};
        case 'SORT_BY_DATE': {return {...state, sortBy:'date'} ;};
        case 'SORT_BY_AMOUNT': {return {...state, sortBy:'amount'} ;};
        case 'SET_START_DATE': {return {...state, startDate: action.startDate} ;};
        case 'SET_END_DATE': {return {...state, endDate: action.endDate} ;};
        default: return state;
    }
}

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter( 
        expense=>{
            const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
            const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
            const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
            return startDateMatch && endDateMatch && textMatch;
        } 
    ).sort( 
        (a,b) => {
            if(sortBy == "amount"){
                return a.amount < b.amount ? 1 : -1; //sorting to get the larger amounts first
            }
            else if(sortBy == "date"){
                return a.createdAt < b.createdAt ? 1 : -1; //-1 means a comes first and vice versa
                //here we sort by the most recent expenses first
            }
        }
    )
};

const unsubscribe = store.subscribe( ()=>{ 
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
    return console.log(store.getState()); 
} )

// console.log(store.getState());

const expenseOne = store.dispatch( addExpense({description: 'July Rent', amount: 19000, createdAt: -12600}) ); //contains the action object that is dispatched
const expenseTwo = store.dispatch( addExpense({description: 'Coffee', amount: 1000, createdAt: -200}) );

// store.dispatch( removeExpense({id : expenseOne.expense.id}) );

// store.dispatch( editExpense(expenseTwo.expense.id, {amount: 2000}) );

// store.dispatch( setTextFilter('rent') );
store.dispatch( sortByAmount() );
store.dispatch( sortByDate() );

// store.dispatch( setStartDate(125) ); //startDate = 125
// store.dispatch( setStartDate() ); //startDate = undefined
// store.dispatch( setEndDate(1250) ); //endDate = 1250

const demoState = {
    expenses : [
        {
            id: 'sdfmsdjhfkhsdf',
            description: 'January Rent',
            note: 'This is the final payment for that address',
            amount: 54500, //amount in cents to avoid any rounding off errors
            createdAt: 0
        }
    ],
    filters : {
        text: 'rent', //search note and description
        sortBy: 'date', //sort by amount or date
        startDate: undefined, //to filter for a date range
        endDate: undefined
    }
}

// the object spread is still not much supported so we had to add a babel plugin for spreading objects: babel-plugin-transform-object-rest-spread
const user = {
    name: 'Jen',
    age: 24
};

console.log({
    ...user,
    location: 'Philadelphia',
    age: 27 //overwriting age (only works if put after object spread)
}); //This would fail without the babel plugin
// Basically whatever comes after is used for the final value