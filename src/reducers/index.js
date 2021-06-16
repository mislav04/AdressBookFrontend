import { combineReducers } from "redux";

import ui from "./ui"
import contact from "./contact"    


export default () => combineReducers({
    ui,
    contact
});