import React, { useEffect } from "react";
import authStore from "@/store/auth.store";
import { Outlet, useNavigate } from "react-router-dom";

const RouteGuardWrapper: React.FC = () => {
  const navigate = useNavigate();
  const _authStore = authStore((state) => state);

  const checkUserToken = () => {
    if (!_authStore.firebaseToken) navigate(`/auth/sign-in`);
  };

  useEffect(() => {
    checkUserToken();
  }, [_authStore.user]);

  return <Outlet />;
};

export default RouteGuardWrapper;
