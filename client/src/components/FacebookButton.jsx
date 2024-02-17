import React from "react";
import { FacebookProvider, LoginButton } from "react-facebook";
import FacebookLogin from "@greatsumini/react-facebook-login";

const FacebookButton = () => {
  function handleSuccess(response) {
    console.log("success hit");
    console.log(response.status);
  }

  function handleError(error) {
    console.log("error hit");
    console.log(error);
  }

  return (
    <div className="flex gap-2 bg-gray-400 p-2 rounded-lg text-blue-200">
      <FacebookProvider appId="366700416143572">
        <LoginButton
          scope="email"
          onError={handleError}
          onSuccess={handleSuccess}
        >
          Login via Facebook
        </LoginButton>
      </FacebookProvider>
      <FacebookLogin
        appId="366700416143572"
        onSuccess={(response) => {
          console.log("Login Success!", response);
        }}
        onFail={(error) => {
          console.log("Login Failed!", error);
        }}
        onProfileSuccess={(response) => {
          console.log("Get Profile Success!", response);
        }}
      />
    </div>
  );
};

export default FacebookButton;
