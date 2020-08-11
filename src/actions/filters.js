//  SET_TEXT_FITLER
export const setTextFilter = (text='') => ({
    type: 'SET_TEXT_FILTER',
    text
});

//  SORT_BY_DATE
export const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

//  SORT_BY_AMOUNT
export const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

//  SET_START_DATE
export const setStartDate = (startDate = undefined) => ({
    type: 'SET_START_DATE',
    startDate
});

//  SET_END_DATE
export const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate //by default, the value for agruments is undefined so no need for explicitly mentioning it
});