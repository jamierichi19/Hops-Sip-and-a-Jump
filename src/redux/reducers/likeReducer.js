const commentsReducer = (state={}, action)=>{
    if(action.type === `SET_LIKE`){
        return action.payload;
    }
    return state;
}

export default commentsReducer;