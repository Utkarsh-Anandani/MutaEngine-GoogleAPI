import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Navigate } from "react-router-dom";

const GoogleLoginComponent = ({setToken}) => {

  const [redirect, setredirect] = useState(false);

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const res = await fetch('https://muta-engine-google-api-backend.vercel.app/google-login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.credential }),
      });

      const data = await res.json();

      if (res.ok) {
        setToken(data.token);
        console.log("User saved to MongoDB:", data.message);
        setredirect(true);
      } else {
        console.error("Error during login:", data.error);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };


  if(redirect) {
    return <Navigate to={'/'}/>
  }

  return (
    <GoogleOAuthProvider clientId="690137169343-ags8105pdld6tpdstq6mg278tmh880jd.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;

