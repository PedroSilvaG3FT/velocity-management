import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Outlet, useNavigate } from "react-router-dom";

const RouteGuardWrapper: React.FC = () => {
  const navigate = useNavigate();
  const { user, firebaseToken } = useSelector((state: RootState) => state.auth);

  const checkUserToken = () => {
    if (firebaseToken) navigate(`/home`);
    else navigate(`/auth/sign-in`);
  };

  useEffect(() => {
    checkUserToken();
  }, [user]);

  return <Outlet />;
};

export default RouteGuardWrapper;
