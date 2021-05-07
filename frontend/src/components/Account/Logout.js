import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../styles/Account.css";

const Logout = (props) => {
  const [timer, setTimer] = useState(5);
  let history = useHistory();
  useEffect(() => {
    if (!timer) history.push("/");
    let countdown = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(countdown);
  }, [timer, history]);

  return (
    <div className="Logout">
      <div>
        <section>
          <h3>YOU ARE SIGNED OUT</h3>
          <article>
            <h3>
              You have signed out and will go to our homepage in {timer} seconds.
            </h3>
          </article>
        </section>
      </div>
    </div>
  );
};

export default Logout;
