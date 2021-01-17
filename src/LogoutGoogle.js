import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = '42584847096-0l1ab2ofqql8qh5laiokvgkmhboot6t2.apps.googleusercontent.com'

function LogoutGoogle() {
	const onSuccess = () => {
		alert('Logout made successfully');
	};

	return (
		<div>
			<GoogleLogout
				clientId={clientId}
				buttonText="Logout"
				onLogoutSuccess={onSuccess}
			></GoogleLogout>
		</div>
	);
}

export default Logout;
