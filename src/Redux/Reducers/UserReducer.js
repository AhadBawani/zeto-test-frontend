import ActionType from "../ActionType";
const UserState = {
  user: null,
  usercart: null,
  userOrders: null,
  userPhone: null,
  userLocalCart: null
};

const UserReducer = (state = UserState, { type, payload }) => {
  switch (type) {
    case ActionType.USER:
      return { ...state, user: payload };
    case ActionType.CHANGE_PHONE:
      return { ...state, userPhone: payload };
    case ActionType.USERCART:
      return { ...state, usercart: payload };
    case ActionType.ADD_TO_CART:
      return { ...state, usercart: payload };
    case ActionType.REMOVE_TO_CART:
      return { ...state, usercart: payload };
    case ActionType.USERLOCALCART:
      return { ...state, userLocalCart: payload };

    default:
      return state;
  }
};

export default UserReducer;
