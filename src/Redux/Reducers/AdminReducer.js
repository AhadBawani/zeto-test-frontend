import ActionType from "../ActionType";


const AdminState = {
    adminOption:"dashboard",
    leftbar_toggle:false
}

const AdminReducer = (state = AdminState, {type, payload}) => {
    switch(type){
        case ActionType.ADMIN:
            return{...state, adminOption:payload};
        case ActionType.LEFTBAR_TOGGLE:
            return{...state, leftbar_toggle:!state.leftbar_toggle};

        default:
            return state;
    }
}

export default AdminReducer;