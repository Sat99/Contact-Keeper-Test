// import React, { useReducer } from "react";
// import uuid from "uuid";
// import AlertReducer from "./alertReducer";
// import AlertContext from "./alertContext";
// import { SET_ALERT, REMOVE_ALERT } from "../types";

// const AuthState = props => {
//   const initialState = [];
//   const [state, dispatch] = useReducer(AlertReducer, initialState);

//   //setAlert
//   const setAlert = (msg, type, timeout = 5000) => {
//     const id = uuid.v4();
//     dispatch({
//       type: SET_ALERT,
//       payload: { msg, type, id }
//     });
//     setTimeout(() => {
//       dispatch({
//         type: REMOVE_ALERT,
//         payload: id
//       });
//     }, timeout);
//   };

//   return (
//     <AlertContext.Provider
//       value={{
//         alerts: state,
//         setAlert
//       }}
//     >
//       {props.children}
//     </AlertContext.Provider>
//   );
// };

// export default AuthState;
import React, { useReducer } from "react";
import uuid from "uuid";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
