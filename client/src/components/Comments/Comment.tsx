import * as React from "react";
import { Text, Heading, HStack, Stack } from "@chakra-ui/react";
import TimeAgo from "react-timeago";
import Avatar from "@davatar/react";
import { Comment } from "../../hooks/useCommentsContract";

interface CommentProps {
    comment: Comment; // Render each individual comment
}

const Comment: React.FunctionComponent<CommentProps> = ({ comment }) => {
    return (
        <HStack spacing={3} alignItems="start">
            <Avatar size={48} address={comment.creator_address} /> {/* A unique avatar for the user's comment has been generated - later, sync to their Metamask wallet & did(magic.link) or allow them to upload their own avatar*/}
            <Stack spacing={1} flex={1} bg="whiteAlpha.100.100" rounded="2xl" p={3}>
                <Heading color="whiteAlpha.900" fontSize="lg">
                    {comment.creator_address}
                </Heading>
                <Text color="whiteAlpha.800" fontSize="lg">
                    {comment.message}
                </Text>
                <Text color="whiteAlpha.500" fontSize="md">
                    <TimeAgo date={comment.created_at.toNumber() * 1000} />
                </Text>
            </Stack>
        </HStack>
    );
};

export default Comment;