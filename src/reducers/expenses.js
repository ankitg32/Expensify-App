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
                else {
                    return expense;
                };
            } );
        }
        default: return state;
    }
};

export default expensesReducer;