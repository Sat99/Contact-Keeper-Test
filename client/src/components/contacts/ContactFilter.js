// import React, { useContext, useRef } from "react";
// import ContactContext from "../../context/contact/contactContext";

// const ContactFilter = e => {
//   const contactContext = useContext(ContactContext);
//   const { filtered, clearFilter, filterContacts } = contactContext;
//   const text = useRef("");
//   const onChange = e => {
//     if (e.target.value === null) {
//       clearFilter();
//     } else {
//       filterContacts(e.target.value);
//     }
//   };

//   return (
//     <input type="text" placeholder="Filter Contacts..." onChange={onChange} />
//   );
// };

// export default ContactFilter;

import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const text = useRef("");

  const { filterContacts, clearFilter, filtered } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = e => {
    if (text.current.value !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Contacts..."
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
