
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState, /* useContext */ } from "react";
import { Link, useNavigate } from 'react-router';
import { AxiosError } from "axios";
import internalApi from '@/services/internalApi';
import { Button } from "@/components/ui/button";
import {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { login } from "@/features/authentication/slice";
// import { useAppDispatch } from "@/store";
// import { AuthenticationContext } from "../../contexts/Authentication";

interface Payload {
  username: String,
  password: String,
}

export default function () {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [error, setError] = useState('');

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();
  // const dispatch = useAppDispatch();

  // const {token, setToken} = useContext(AuthenticationContext);

  const navigateTo = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async function request(payload: Payload) {
      setError('');

      const response
        = await internalApi.post('/register', payload);

      const token = response.data.token;

      localStorage.setItem('token', token);

      // Can't redirect react-router based on redux store update.
      // dispatch(login(token));

      // if (setToken) setToken(token);

      // "Usage of this hook should be uncommon. It's recommended
      // to use the other APIs in this guide when possible."
      // my arse
      navigateTo('/register');
    },
    onSuccess: async function () {
      queryClient.invalidateQueries({ queryKey: [] });
    },
    onError: function (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.error);
      }
    }
  });

  const handleInputUpdate = function () {
    setIsSubmitDisabled(true);

    if (
      usernameRef.current?.value != ''
      && passwordRef.current?.value != ''
      && (
        passwordRef.current?.value
        == passwordConfirmationRef.current?.value
      )
    ) {
      setIsSubmitDisabled(false);
    }
  }

  const handleSubmit = function (event: React.SyntheticEvent) {
    event.preventDefault();

    mutate({
      username: usernameRef.current?.value ?? '',
      password: passwordRef.current?.value ?? '',
    });
  }

  return <>
    <CardHeader>
      <CardTitle>Sign Up</CardTitle>
      <CardDescription>
        Enter your credentials below to create an account
      </CardDescription>
      <CardAction>
        {/* <Button variant="link">Sign Up</Button> */}
      </CardAction>
    </CardHeader>
    <CardContent className="flex flex-col gap-3">
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              ref={usernameRef}
              onChange={handleInputUpdate}
              id="username"
              type="text"
              required
              autoFocus
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {/* <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a> */}
            </div>
            <Input ref={passwordRef} onChange={handleInputUpdate} id="password" type="password" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="passwordConfirmation">Confirm password</Label>
              {/* <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a> */}
            </div>
            <Input ref={passwordConfirmationRef} onChange={handleInputUpdate} id="passwordConfirmation" type="password" required />
          </div>
        </div>
      </form>
    </CardContent>
    <CardFooter className="flex-col gap-3">
      <Button onSubmit={handleSubmit} onClick={handleSubmit} disabled={isSubmitDisabled} type="submit" className="w-full">
        Sign Up
      </Button>
      {/* <Button variant="outline" className="w-full">
          Login with Google
        </Button> */}
      <p>Already have an account? <Link to="/login"><Button variant="link">Sign In</Button></Link></p>
    </CardFooter>
  </>
}