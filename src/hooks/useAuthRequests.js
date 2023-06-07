import { useMutation } from "@tanstack/react-query";
import { authUser, loginUser, registerUser } from "../api/auth";

const useAuthRequests = () => {
  const login = useMutation((email) => loginUser(email));
  const register = useMutation((data) =>
    registerUser(data.email, data.username)
  );
  const authenticate = useMutation((token) => authUser(token));

  return { login, authenticate, register };
};

export default useAuthRequests;
