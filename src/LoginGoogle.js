import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = '42584847096-0l1ab2ofqql8qh5laiokvgkmhboot6t2.apps.googleusercontent.com';

function LoginGoogle() {
	const onSuccess = (res) => {
		console.log('[Login Success] currentUser:', res.profileObj);
	};
	const onFailure = (res) => {
		console.log('[Login failed] res:', res);
	};

	return (
		<div>
			<GoogleLogin
				clientId={clientId}
				buttonText="Login"
				onSuccess={onSuccess}
				onFailure={onFailure}
				cookiePolicy={'single_host_origin'}
				style={{ marginTop: '100px' }}
				isSignedIn={true}
			/>
		</div>
	);
}

export default LoginGoogle;