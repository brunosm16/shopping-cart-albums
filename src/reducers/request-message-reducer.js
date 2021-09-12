/**
 * Request Message Actions
 */
const ERROR = 'SET_ERROR';
const LOADING = 'SET_LOADING';
const SUCCESS = 'SET_SUCCESS';
const RESET = 'RESET';

export const defaultMessageReducer = {
	value: '',
	isError: false,
	isLoading: false,
	isSuccessful: false,
};

const RequestMessageReducer = (state, action) => {
	if (action.type === ERROR) {
		return {
			value: action.message,
			isError: true,
			isLoading: false,
			isSuccessful: false,
		};
	}

	if (action.type === LOADING) {
		return {
			value: action.message,
			isLoading: true,
			isError: false,
			isSuccessful: false,
		};
	}

	if (action.type === SUCCESS) {
		return {
			value: action.message,
			isLoading: false,
			isError: false,
			isSuccessful: true,
		};
	}

	if (action.type === RESET) {
		return defaultMessageReducer;
	}

	return RequestMessageReducer;
};

export default RequestMessageReducer;
