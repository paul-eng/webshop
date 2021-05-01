import React from "react";

const Account = React.forwardRef((props, ref) => {
  return (
    <div
      style={{ display: props.active ? "block" : "none" }}
      ref={ref}
      className="Account"
    >
      <form>
        <input type="text" placeholder="Email address" />
        <input type="text" placeholder="Password" />
        <input type="submit" value="SIGN IN" />
      </form>
    </div>
  );
});

export default Account;
