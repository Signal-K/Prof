import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../lib/UserContext";
import Loading from "./loading";

export default function Payment({ Elements, PaymentForm, promise }) {
    const [user] = useContext(UserContext);
    const history = useHistory();

    // If not loading & no user found, redirect to /login page
    useEffect(() => {
        user && !user.loading && !user.issuer && history.push("/login");
    }, [user, history]);

    return (
        <>
            <h3 className="h3-header">
                Purchase Star Sailors to join the club
            </h3>
            <p>
                Hi {user?.loading ? <Loading /> : user?.email}! You've signed up with your email account - now enter your card information. Currently, payment is conducted through our custom ERC20 token, or in Australian Dollars using the Stripe secure payment system
            </p>
            {user?.loading ? (
                <Loading />
            ) : (
                <Elements stripe={promise}>
                    <PaymentForm email={user.email} />
                </Elements>
            )}
            <style>{`
                p {
                    margin-bottom: 15px;
                }
                .h3-header {
                    font-size: 22px;
                    margin: 25px 0;
                }
            `}</style>
        </>
    );
}