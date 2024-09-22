import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleLoginComponent = () => {
  const handleGoogleLoginSuccess = async (response) => {
    try {
      const res = await fetch('https://muta-engine-google-api-backend-4pvxsmryo.vercel.app/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.credential }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("User saved to MongoDB:", data);
      } else {
        console.error("Error during login:", data.error);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

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

