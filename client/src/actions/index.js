import axios from "axios";
import history from "../history";

export const fetchSurveys = () => async dispatch => {
	const response = await axios.get("/api/surveys");
	dispatch({
		type    : "FETCH_SURVEYS",
		payload : response.data
	});
};

export const fetchSurvey = id => async dispatch => {
	const response = await axios.get("/api/surveys/" + id);
	dispatch({
		type    : "FETCH_SURVEY",
		payload : response.data
	});
};

export const deleteSurvey = id => async dispatch => {
	await axios.delete("/api/surveys/" + id);
	history.push("/surveys");
	dispatch({ type: "DELETE_SURVEY" });
};

export const submitSurvey = values => async dispatch => {
	const response = await axios.post("/api/surveys", values);
	dispatch({
		type    : "FETCH_USER",
		payload : response.data
	});
	history.push("/surveys");
};

export const fetchUser = () => async dispatch => {
	const response = await axios.get("/api/current_user");
	if (response.data) {
		const { credits, googleId } = response.data;
		dispatch({
			type    : "FETCH_USER",
			payload : { credits, googleId, isSignedIn: true }
		});
	} else {
		dispatch({
			type    : "FETCH_USER",
			payload : { isSignedIn: false }
		});
	}
};

export const handleToken = token => async dispatch => {
	const response = await axios.post("/api/stripe", token);
	dispatch({
		type    : "FETCH_USER",
		payload : response.data
	});
};
