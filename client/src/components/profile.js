import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../lib/UserContext";
import Loading from "./loading";

import * as React from 'react';
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
import { ChakraProvider, Box, Heading } from "@chakra-ui/react";
import { Toaster, toast } from 'react-hot-toast';
import theme from './theme';
import { Provider as WagmiProvider } from "wagmi";
import { providers } from "ethers";
import Comments from "./Comments/Comments";

const provider = ethers.providers.getDefaultProvider('http://localhost:8545'); // This needs to be changed to match the express.js server in the root of this repo (i.e. outside client). Truffle/ganache is used for this provider

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: () => {
      toast.error(
        "Network Error: Ensure Metamask is connected to the same network that your contract is deployed to."
      );
    },
  }),
});

const Profile = () => {
  const history = useHistory();
  const [user] = useContext(UserContext);

  // Redirect to login page if not loading and no user found
  useEffect(() => {
    user && !user.loading && !user.issuer && history.push("/login");
  }, [user, history]);

  return (
    <>
      {user?.loading ? (
        <Loading />
      ) : (
        user?.issuer && (
          <>
            <div className="label">Email</div>
            <div className="profile-info">{user.email}</div>

            <div className="label">User Id</div>
            <div className="profile-info">{user.issuer}</div> {/* Create a function to compare this address to holders, if so then show more content like in the DAO */}
            
            {/* Comment component */}
            <WagmiProvider autoConnect provider={provider}>
              <ChakraProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                  <Box p={8} maxW="600px" minW="320px" m="0 auto">
                    <Heading>No comments yet!</Heading>
                    <Comments topic="my-blog-post" />
                    <Toaster position="bottom-right" />
                  </Box>
                </QueryClientProvider>
              </ChakraProvider>
            </WagmiProvider>
            
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

export default Profile;