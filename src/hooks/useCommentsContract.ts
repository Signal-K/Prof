import * as wagmi from "wagmi";
import { useProvider, useSigner } from "wagmi";
import type { BigNumber } from "ethers";
import CommentsContract from "../../artifacts/contracts/Comments.sol/Comments.json";

export interface Comment {
    id: string;
    topic: string;
    message: string;
    creator_address: string;
    created_at: BigNumber;
}

export enum EventType {
    CommentAdded = "CommentAdded",
}

const useCommentsContract = () => {
    // ethers.signer instance
    const signer = useSigner();
    const provider = useProvider(); // ethers.provider instance

    const contract = wagmi.useContract({
        addressOrName: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
        contractInterface: CommentsContract.abi,
        signerOrProvider: signer.data || provider,
    });

    // Wrapper to add types to the getComments function
    const getComments = async (topic: string): Promise<Comment[]> => {
        return contract.getComments(topic).then((comments) => {
            return comments.map((c) => ({ ...c })); // Comments are represented as arrays, so this converts them to an object
        });
    };

    // Wrapper to add tyes to `addComment`
    const addComment = async (topic: string, message: string): Promise<void> => {
        const tx = await contract.addComment(topic, message); // Create a new transaction
        await tx.wait(); // Wait for the transaction to be mined
    };

    return {
        contract,
        chainId: contract.provider.network?.chainID,
        getComments,
        addComment,
    };
};

export default useCommentsContract;

/* This hook allows the interaction with contract functions from the UI
Also returns a new contract instance whenever the active signer/provider changes via wagmi/Metamask*/