const initialState = {
	actLog : "You will see all activity logs here",
}

const reducer = (state=initialState, action) => {
	var newState = {...state};

	if(action.type === "SET_ACTIVITY_LOG"){
		console.log("action.aLog = ", action.aLog);
		newState.actLog = action.aLog;
	}

	console.log("newState = ", newState);
	return newState;
}

export default reducer;