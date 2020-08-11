import {createStore} from 'redux';
import { type } from 'os';

//Reducers
//1. Pure functions -> O/P depends only upon I/P parameters and they don't interact with anything outside their block
//2. Never change state or action (only returns the value that is supposed final val)
const countReducer = (state={count : 0}, action) =>
{
    switch(action.type)
    { 
        case "INCREMENT": return {count : state.count+action.incrementBy};
        case "DECREMENT": return {count : state.count-action.decrementBy}; 
        case "RESET": return {count : 0}; 
        case "SET": return {count : action.count}; 
        default: return state;
    }
};

const store = createStore( 
        countReducer
    );

//Action generators - functions to generate actions
//using destructuring and setting default values. 
//the object that is passed as the argument is on th RHS of = i.e., {}
const incrementCount = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy: incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy //since the object prop and value are same, we can just write it once
});

const setCount = ({count = store.getState().count} = {}) => ({
    type: 'SET',
    count: count
});

const resetCount = () => ({
    type: 'RESET'
});

//the return value from subscribe is a function that we can use to unsubscribe
const unsubscribe = store.subscribe( ()=>{
    console.log(store.getState());
} )

// console.log(`${store.getState()}`);

console.log(store.getState());

//Action - an object that gets sent to the store like walk, talk, exercise, rest, etc
//for count, actions can be increment, decrement
// store.dispatch({
//     type: 'INCREMENT' //convention to use all caps for action type
// });

store.dispatch(incrementCount({}));

store.dispatch(incrementCount({incrementBy: 2}));

store.dispatch(incrementCount({}));

store.dispatch(resetCount());

store.dispatch(decrementCount({}));

store.dispatch(setCount({count: 6969}));

store.dispatch(decrementCount({decrementBy: 69}));

unsubscribe();

store.dispatch(decrementCount({}));