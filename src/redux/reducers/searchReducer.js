const commentsReducer = (state=[], action)=>{
    if(action.type === `SET_SEARCH_RESULTS`){
        return action.payload;
    }
    return state;
}

export default commentsReducer;