import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button"
import {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import internalApi from '@/services/internalApi';
import { AxiosError } from 'axios';

interface Payload {
  username: String,
  password: String,
}

export default function () {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [error, setError] = useState('');

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async function (payload: Payload) {
      const response = await internalApi.post('/login', payload);

      return response.data;
    },
    onSuccess: function () {
      queryClient.invalidateQueries({queryKey: []});

      // navigate('/dashboard');
    },
    onError: function(error) {
      if(error instanceof AxiosError) {
        setError(error.response?.data.error);
      }
    }
  });

  const handleInputUpdate = function () {
    setIsSubmitDisabled(true);

    if (
      usernameRef.current?.value != ''
      && passwordRef.current?.value != ''
    ) {
      setIsSubmitDisabled(false);
    }
  }

  const handleSubmit = function (event: React.SyntheticEvent) {
    event.preventDefault();
    setError('');

    mutate({
      username: usernameRef.current?.value ?? '',
      password: passwordRef.current?.value ?? '',
    });
  }

  return <>
    <CardHeader>
      <CardTitle>Sign In</CardTitle>
      <CardDescription>
        Enter your credentials below to sign in
      </CardDescription>
      <CardAction>
        {/* <Button variant="link">Sign Up</Button> */}
      </CardAction>
    </CardHeader>
    <CardContent className="flex flex-col gap-3">
      {error && <p className='text-red-500'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
          <Input
            ref={usernameRef}
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
          <Input ref={passwordRef} id="password" type="password" required />
        </div>
      </div>
    </form>
  </CardContent >
    <CardFooter className="flex-col gap-3">
      <Button onSubmit={handleSubmit} onClick={handleSubmit} type="submit" className="w-full">
        Sign In
      </Button>
      {/* <Button variant="outline" className="w-full">
          Login with Google
        </Button> */}
      <p>Don't have an account? <Link to="/register"><Button variant="link">Sign Up</Button></Link></p>
    </CardFooter>
  </>
}