DEFINE SCOPE userScope SESSION 1d
	SIGNIN (
		SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(password, $password)
	)
	SIGNUP (
		CREATE user CONTENT {
			name: $name,
			email: $email,
			password: crypto::argon2::generate($password)
		}
	);