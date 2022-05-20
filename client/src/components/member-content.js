import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../lib/UserContext";
import { LifetimeContext } from "../lib/LifetimeContext";
import { LifetimeAccessRequestStatusContext } from "../lib/LifetimeAccessRequestStatusContext";
import { CallToAction } from "@magiclabs/ui";
import Loading from "./loading";

const MemberContent = () => { // Content that can only be viewed by members who are logged in (including free members)
    const [user] = useContext(UserContext);
    const history = useHistory();

    useEffect(() => { // If not logged in, redirect to the login page
        user && !user.loading && !user.issuer && history.push("/login");
    }, [user, history]);

    return (
        <>
            {user?.loading ? (
                <Loading />
            ) : (
                user?.issuer && (
                    <>
                        <div className="label">Hi</div>
                    </>
                )
            )}
            <style>{`
                .label {
                    font-size: 12px;
                    color: #6851ff;
                    margin: 30px 0 5px;
                }
                .profile-info {
                    font-size: 17px;
                    word-wrap: break-word;
                }
            `}</style>
        </>
    );
};

export default MemberContent;

// This can also be put into `./profile`