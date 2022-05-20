import React, { useState, useEffect, useMemo } from "react";
import { Box, Button, Flex, Image, Link, Spacer } from "@chakra-ui/react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { UserContext } from "./lib/UserContext";
import { LifetimeContext } from "./lib/LifetimeContext";
import { LifetimeAccessRequestStatusContext } from "./lib/LifetimeAccessRequestStatusContext";

// UI Components
import Home from "./components/home";
import PremiumContent from "./components/premium-content";
import Login from "./components/login";
import SignUp from "./components/signup";
import Profile from "./components/profile";
import Payment from "./components/payment";
import PaymentForm from "./components/payment-form";
import Layout from "./components/layout";

// Magic/stripe
import { magic } from "./lib/magic";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(process.env.REACT_APP_STRIPE_PK_KEY);

function Magic() { // Aka function App() {
    const [lifetimeAccess, setLifetimeAccess] = useState(false); // Check if the user has lifetime access
    const [
        lifetimeAccessRequestStatus,
        setLifetimeAccessRequestStatus
    ] = useState(""); // Prevent infinite loop in the useEffect that is part of `components/premium-content` (which stores super.so config/embed)

    const [user, setUser] = useState(); // Determine whether the user is logged in

    // set the usercontext with the user['s] data if the user is logged in - otherwise set to {user: null}
    useEffect(() => {
        setUser({ loading: true });
        magic.user.isLoggedIn().then((isLoggedIn) => {
            return isLoggedIn
                ? magic.user.getMetadata().then((userData) => setUser(userData))
                : setUser({ user: null });
        });
    }, []);

    return (
        <Router>
            <Switch>
                <UserContext.Provider value={[user, setUser]}>
                    <LifetimeContext.Provider value={[lifetimeAccess, setLifetimeAccess]}>
                        <LifetimeAccessRequestStatusContext.Provider
                            value={[
                                lifetimeAccessRequestStatus,
                                setLifetimeAccessRequestStatus
                            ]}
                        >
                            <Layout>
                                <Route path="/" exact component={Home} />
                                <Route path="/premium-content" component={PremiumContent} />
                                <Route path="/signup" component={SignUp} />
                                <Route path="/login" component={Login} />
                                <Route path="/profile" component={Profile} />
                                <Route
                                    path="/payment"
                                    render={(props) => {
                                        return (
                                            <Payment
                                                Elements={Elements}
                                                PaymentForm={PaymentForm}
                                                promise={promise}
                                            />
                                        );
                                    }}
                                />
                            </Layout>
                        </LifetimeAccessRequestStatusContext.Provider>
                    </LifetimeContext.Provider>
                </UserContext.Provider>
            </Switch>
        </Router>
    )
}

export default Magic; // originally export default App;