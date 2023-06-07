import { useEffect, useRef } from "react";

import Card from "../components/UI/Card";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";

import useCountdown from "../hooks/useCountdown";
import useAuthRequests from "../hooks/useAuthRequests";
import { useAuth } from "../store/auth-context";
import DisplayWrapper from "../components/display/DisplayWrapper";
import Label from "../components/UI/Label";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuthRequests();
  const { loggedIn } = useAuth();
  const emailRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const { isSuccess, isError, error, isLoading } = login;
  const {
    triggerTimerState: sentEmail,
    setTriggerTimerState: setSentEmail,
    timeRemaining,
  } = useCountdown(5);

  useEffect(() => {
    if (isSuccess) {
      setSentEmail(true);
    }
  }, [isSuccess, setSentEmail]);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    login.mutate(emailRef.current.value);
  };

  return (
    <DisplayWrapper>
      {loggedIn && <p> You are already logged in</p>}
      {!loggedIn && (
        <Card className="border-[2px] border-sand w-[30rem]">
          {location.state && location.state.newUser && (
            <p className="text-center font-light italic  text-sand">
              Succesfully registered! Log in here.
            </p>
          )}
          <p className="text-[2.5rem] text-center pb-5">Login</p>
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

            {isSuccess && (
              <p className="text-light-blue text-[1.1rem] text-semibold whitespace-pre-wrap">
                *Please check your email to complete logging in{" "}
              </p>
            )}

            {isError && (
              <p>
                {error.response.data
                  ? error.response.data
                  : "*Something went wrong, please try again later *"}
              </p>
            )}
            <Button
              disabled={isLoading || sentEmail}
              className="border-[1px] border-sand disabled:bg-onyx my-3 py-2"
              type="submit"
            >
              {!sentEmail && timeRemaining == null && "send verification email"}
              {sentEmail &&
                timeRemaining > 0 &&
                `resend email in ${timeRemaining}s`}
              {!sentEmail && timeRemaining === 0 && "resend email now"}
            </Button>
            <div
              className="underline text-center hover:cursor-pointer text-sand"
              onClick={() => {
                navigate("/register");
              }}
            >
              register as a visitor
            </div>
          </form>
        </Card>
      )}
    </DisplayWrapper>
  );
};

export default Login;
