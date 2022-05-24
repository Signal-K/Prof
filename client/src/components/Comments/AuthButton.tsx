import * as React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import { useAccount, useConnect } from "wagmi";
import toast from "react-hot-toast";

interface AuthButtonProps extends ButtonProps {}

const AuthButton: React.FunctionComponent<AuthButtonProps> = (props) => {
    const [connectQuery, connect] = useConnect();
    const [accountQuery] = useAccount();

    React.useEffect(() => {
        if (connectQuery.error?.name === "ConnectorNotFoundError") {
            toast.error("Metamask extensionr equired to sign in");
        }
    }, [connectQuery.error]);

    // If not authenticated
    if (!accountQuery.data?.address) {
        return (
            <Button
                {...props}
                onClick={() => {
                    connect(connectQuery.data.connectors[0]);
                }}
            >
                Sign in
            </Button>
        );
    }

    // If authenticated
    return <Button {...props}>{props.children}</Button>;
};

export default AuthButton;