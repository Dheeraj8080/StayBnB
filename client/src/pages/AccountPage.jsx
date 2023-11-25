import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, useParams, Navigate } from "react-router-dom";
import axios from "axios";
import AccountNav from "../AccountNav";

export default function AccountPage() {
  const { user, ready, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logOut() {
    await axios.post("/logout");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    setRedirect("/");
  }

  if (!ready) {
    return "loading..";
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  //if subpage is undefined then profile or then other

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto mt-8">
          Logged In as {user.name} with {user.email}
          <br />
          <button className="primary max-w-xs mt-2" onClick={logOut}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
