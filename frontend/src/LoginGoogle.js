import React from 'react';
import tw from "twin.macro";
import styled from "styled-components";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import { GoogleLogin } from 'react-google-login';

const clientId = '42584847096-0l1ab2ofqql8qh5laiokvgkmhboot6t2.apps.googleusercontent.com';
const SignInButtonText = "Sign In with Google"
const SubmitButtonIcon = SignUpIcon
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

function LoginGoogle() {
	const onSuccess = (res) => {
		console.log('[Login Success] currentUser:', res.profileObj);
	};
	const onFailure = (res) => {
		console.log('[Login failed] res:', res);
	};

	return (
        <GoogleLogin
            clientId={clientId}
            render={renderProps => (
                <SubmitButton type="submit" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <SubmitButtonIcon className="icon" />
                    <span className="text">{SignInButtonText}</span>
                </SubmitButton>          
            )}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
	);
}

export default LoginGoogle;