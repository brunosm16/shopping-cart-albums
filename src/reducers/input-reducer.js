/**
 * Input Actions
 */
const INPUT = 'INPUT_USER';
const BLUR = 'INPUT_BLUR';
const RESET = 'INPUT_RESET';

const InputReducer = (state, action) => {
	if (action.type === INPUT) {
		return { value: action.value, isTouched: state.isTouched };
	}

	if (action.type === RESET) {
		return { value: '', isTouched: false };
	}

	if (action.type === BLUR) {
		return { value: state.value, isTouched: true };
	}
	return InputReducer;
};

export default InputReducer;
