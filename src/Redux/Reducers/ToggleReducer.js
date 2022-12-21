import ActionType from "../ActionType";
const UserState = {
  SignUpDialog: false,
  SignUpBtn: false,
  CategoryPopUp: false,
};

const UserReducer = (state = UserState, { type, payload }) => {
  switch (type) {
    case ActionType.SIGNUP_DIALOG:
      return { ...state, SignUpDialog: payload };
    case ActionType.SIGNUP_BTN:
      return { ...state, SignUpBtn: payload };
    case ActionType.CATEGORY_TOGGLE:
      return { ...state, CategoryPopUp: payload };
    default:
      return state;
  }
};

export default UserReducer;