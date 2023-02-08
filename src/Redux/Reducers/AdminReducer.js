import ActionType from "../ActionType";


const AdminState = {
    adminOption:"dashboard",
    All_User:[],
    leftbar_toggle:false
}

const AdminReducer = (state = AdminState, {type, payload}) => {
    switch(type){
        case ActionType.ADMIN:
            return{...state, adminOption:payload};
        case ActionType.LEFTBAR_TOGGLE:
            return{...state, leftbar_toggle:!state.leftbar_toggle};
        case ActionType.ALL_USER:
            return{...state, All_User:payload};

        default:
            return state;
    }
}

export default AdminReducer;