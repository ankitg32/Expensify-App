import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

export default class ExpenseForm extends React.Component {
    //we use a local component state to track the changes to user input
    //only when the form is submitted, will the state be sent to redux store
    constructor(props)
    {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount/100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        }
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onNoteChange = this.onNoteChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState((state) => ({
            description
        }));
    }
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState((state) => ({
            note
        }));
    }
    onAmountChange = (e) => {
        const amount = e.target.value;
        if(!amount || amount.match(/^\d+(\.\d{0,2})?$/)){
            this.setState((state) => ({
                amount
            }));
        }
    }
    onDateChange = (createdAt) => {
        if(createdAt){
            this.setState((state) => ({
                createdAt
            }));
        }
    }
    onFocusChange = ({focused}) => {
        this.setState(() => ({
            calendarFocused: focused
        }));
    }
    onSubmit = (e) => {
        e.preventDefault(); //to prevent a full page refresh 
        if(!this.state.description || !this.state.amount){
            this.setState(() => ({
                error: 'Please provide description and amount'
            }))
        }
        else{
            this.setState((state)=> ({
                error: ''
            }))
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount,10)*100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            })
        }
    }
    render(){
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input 
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker 
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths = {1}
                        isOutsideRange = {(day) => false}
                    />
                    <textarea 
                        placeholder="Add a note for your expense (optional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    />
                    <button>Add Expense </button>
                </form>
            </div>
        )
    }
}