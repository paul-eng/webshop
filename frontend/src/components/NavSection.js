import React, { useRef } from "react";
import "../styles/NavSection.css";

const NavSection = (props) => {
  function active() {
    navLinks.current.classList.toggle("active");
  }

  const navLinks = useRef(null);

  return (
    <section className="NavSection">
      <button onMouseEnter={active} onMouseLeave={active}>
        <h3>{props.title}</h3>
      </button>
      <ul className={"NavList"} ref={navLinks}>
        {props.links}
      </ul>
    </section>
  );
};

export default NavSection;
