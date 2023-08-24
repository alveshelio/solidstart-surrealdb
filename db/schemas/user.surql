DEFINE TABLE user SCHEMAFULL
    PERMISSIONS
    FOR select FULL
    FOR update WHERE id = $auth.id
    FOR create, delete NONE;

DEFINE FIELD name ON user TYPE string ASSERT $value != NONE;
DEFINE FIELD email ON user TYPE string ASSERT is::email($value);
DEFINE FIELD password ON user TYPE string ASSERT $value != NONE;
DEFINE FIELD registeredAt ON user TYPE datetime VALUE $before OR time::now();
DEFINE FIELD updatedAt ON user TYPE datetime VALUE $before OR time::now();
DEFINE FIELD avatar ON user TYPE string;

DEFINE FIELD permissions ON user TYPE array VALUE [permission:createInvoice];
DEFINE FIELD permissions.* ON user TYPE record(permission);

DEFINE INDEX uniqueEmail ON user COLUMNS email UNIQUE;

DEFINE SCOPE userScope
    SESSION 24h
    SIGNUP (
        CREATE user
        SET
            name = $name,
            email = $email,
            avatar = "https://www.gravatar.com/avatar/" + crypto::md5($email),
            password = crypto::argon2::generate($password)
    )
    SIGNIN (
        SELECT *
        FROM user
        WHERE email = $email AND crypto::argon2::compare(password, $password)
    );