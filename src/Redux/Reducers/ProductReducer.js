import ActionType from "../ActionType";
const productState = {
  Products: null,
  ProdCategory:null
};

const ProductReducer = (state = productState, { type, payload }) => {
  switch (type) {
    case ActionType.PRODUCTS:
      return { ...state, Products: payload };
    case ActionType.CATEGORY:
      return { ...state, ProdCategory: payload };

    default:
      return state;
  }
};

export default ProductReducer;
