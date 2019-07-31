// import React, { Fragment } from "react";
// import spinner from "./spinner.gif";

// const Spinner = () => (
//   <Fragment>
//     <img
//       src={spinner}
//       alt="Loading..."
//       style={{ width: "200px", margin: "auto", display: "block" }}
//     />
//   </Fragment>
// );

// export default Spinner;
import React, { Fragment } from "react";
import spinner from "./spinner.gif";

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: "200px", margin: "auto", display: "block" }}
      alt="Loading..."
    />
  </Fragment>
);
