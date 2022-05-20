import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { magic } from "../lib/magic";
import { UserContext } from "../lib/UserContext";
import LoginForm from "./login-form";

const Login = () => {
    const history = useHistory();
    const [disabled, setDisabled] = useState(false);
    const [user, setUser] = useContext(UserContext);

    // If user is already logged in: redirect to profile page
    useEffect(() => {
        user && user.issuer && history.push("/profile");
    }, [user, history]);

    async function handleLoginWithEmail(email) {
        try {
            setDisabled(true); // Prevent multiple emails from being triggered by disabling the login button

            // Trigger Magic.Link email to user
            let didToken = await magic.auth.loginWithMagicLink({
                email,
            });

            // Validate didToken with server
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + didToken,
                },
            });

            if (res.status === 200) {
                let userMetadata = await magic.user.getMetadata(); // save information for the logged in user
                await setUser(userMetadata); // UserContext is set to the logged in user
                history.push('/profile');
            }
        } catch (error) {
            setDisabled(false); // Reenable login button (if the user requests to edit their email)
            console.log(error);
        }
    }

    return (
        <>
            <div className="login">
                <LoginForm disabled={disabled} onEmailSubmit={handleLoginWithEmail} />
            </div>
            <style>{`
                .login {
                    max-width: 20rem;
                    margin: 40px auto 0;
                    padding: 1rem;
                    border: 1px solid #dfe1e5;
                    border-radius: 4px;
                    text-align: center;
                    box-shadow: 0px 0px 6px 6px #f7f7f7;
                    box-sizing: border-box;
                }
            `}</style>
        </>  
    );
};

export default Login;