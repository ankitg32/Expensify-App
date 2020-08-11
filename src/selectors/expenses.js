import moment from 'moment';

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter( 
        expense=>{
            /* The following two lines won't work with momentjs */
            // const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
            // const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
            const createdAtMoment = moment(expense.createdAt);
            const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
            const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
            const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
            return startDateMatch && endDateMatch && textMatch;
        } 
    ).sort( //this is the compare function. refer to array sort for javascript
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

export default getVisibleExpenses;