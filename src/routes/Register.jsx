import DisplayWrapper from "../components/display/DisplayWrapper";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import Label from "../components/UI/Label";
import Input from "../components/UI/Input";

import useAuthRequests from "../hooks/useAuthRequests";
import { useAuth } from "../store/auth-context";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const Register = () => {
  const { loggedIn } = useAuth();
  const { register } = useAuthRequests();
  const { isSuccess, isError, error, isLoading } = register;
  const navigate = useNavigate();
  const emailRef = useRef();
  const usernameRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    register.mutate({
      email: emailRef.current.value,
      username: usernameRef.current.value,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/login", { state: { newUser: true } });
    }
  }, [isSuccess, navigate]);

  return (
    <DisplayWrapper>
      {loggedIn && <p> You are already logged in</p>}
      {!loggedIn && (
        <Card className="border-[2px] border-sand w-[30rem]">
          <p className="text-[2.5rem] text-center p-5">Register</p>
          <form
            action="/"
            onSubmit={formSubmitHandler}
            className="px-5 pb-5 grid grid-col-[auto,1fr]"
          >
            <Label htmlFor="email" className="pr-5 font-bold">
              Email Address:
            </Label>
            <Input
              type="email"
              id="email"
              pattern="\S*"
              required
              ref={emailRef}
            />

            <Label htmlFor="username" className="pr-5 font-bold">
              Username:
            </Label>
            <Input type="text" id="username" required ref={usernameRef} />

            {isSuccess && (
              <div>
                Success, <Link to="/login">log in here</Link>
              </div>
            )}

            {isError && (
              <p className=" text-dirty-pink text-[1.1rem] text-semibold whitespace-pre-wrap">
                {error.response.data
                  ? error.response.data
                  : "*Something went wrong, please try again later*"}
              </p>
            )}

            <Button
              disabled={register.isLoading}
              className="border-[1px] border-sand disabled:bg-onyx my-3 py-2"
              type="submit"
            >
              register as a visitor
            </Button>
            <div
              className="underline text-center hover:cursor-pointer text-sand"
              onClick={() => navigate("/login")}
            >
              have account? log in here
            </div>
            <div className="border-2 rounded-md p-3 mt-3">
              Note: through register you can only access my dummy database, in
              which you can mess around with the hero data however you like!
            </div>
          </form>
        </Card>
      )}
    </DisplayWrapper>
  );
};

export default Register;
