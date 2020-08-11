import {createStore, combineReducers} from 'redux';
import expensesReducer from './../reducers/expenses';
import filtersReducer from './../reducers/filters';

export default () => {
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer
        })
        /* a Redux dev tools extension added in chrome. (no need to add via yarn or anything)
        I requires the below line to be added to be able work on the store.
        This line may change based on the version, so find the latest working line at:
        https://github.com/zalmoxisus/redux-devtools-extension */
        , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
}