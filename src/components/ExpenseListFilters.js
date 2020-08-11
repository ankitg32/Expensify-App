import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

class ExpenseListFilters extends React.Component {
    state = {
        calendarFocussed: null
    }

    onDatesChange = ({ startDate, endDate }) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    }
    
    onFocusChange = (calendarFocussed) => 
        this.setState({ calendarFocussed });
    
    render(){
        return (
            <div>
                <input type = "text" value={this.props.filters.text} onChange={ (e) => 
                    {this.props.dispatch(setTextFilter(e.target.value))} } />
                <select value={this.props.filters.sortBy}  onChange={ (e) => {
                    e.target.value === "date" 
                    ? this.props.dispatch(sortByDate()) 
                    : this.props.dispatch(sortByAmount())
                } }>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate} // momentPropTypes.momentObj or null,
                    endDate={this.props.filters.endDate} // momentPropTypes.momentObj or null,
                    onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
                    focusedInput={this.state.calendarFocussed} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
                    showClearDates = {true}
                    numberOfMonths = {1}
                    isOutsideRange = {() => false}
                />
            </div>
        );
    }
}

//converting this to class component to use state for date range picker.
/* const ExpenseListFilters = (props) => (    
); */

const mapStateToProps = (state) => {
    return {
        filters: state.filters 
    }
}

//we also have access to dispach() function BY DEFAULT in the props when we use the connect() function
//so we can just import the action generator and use dispatch() to dispatch that action
export default connect(mapStateToProps)(ExpenseListFilters);
//using connect()(ExpenseListFilters) is also valid for getting access to only dispatch in the props

// export default ExpenseListFilters;