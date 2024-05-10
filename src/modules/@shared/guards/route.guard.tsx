import React, { useEffect } from "react";
import authStore from "@/store/auth.store";
import { Outlet, useNavigate } from "react-router-dom";

const RouteGuardWrapper: React.FC = () => {
  const navigate = useNavigate();
  const _authStore = authStore((state) => state);

  const checkUserToken = () => {
    console.log("OOOOPA", _authStore);
    if (!_authStore.token) {
      console.log("OOOOPA ENTREI");
      navigate(`/auth/sign-in`);
    }
  };

  useEffect(() => {
    checkUserToken();
  }, [_authStore.user]);

  return <Outlet />;
};

export default RouteGuardWrapper;
