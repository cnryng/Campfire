import React, {useState} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import {Container, ContentWithPaddingXl} from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import {css} from "styled-components/macro";
import Header from "components/headers/lightCampfire.js";
import {SectionHeading} from "components/misc/Headings";
import {PrimaryButton} from "components/misc/Buttons";
import Picker from 'emoji-picker-react';
import Modal from 'react-bootstrap/Modal'
import Cookies from "universal-cookie";

const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-orange-600`;
const Posts = tw.div`mt-6 sm:-mr-8 flex flex-wrap`;
const PostContainer = styled.div`
  ${tw`mt-10 w-full sm:w-1/2 lg:w-1/3 sm:pr-8`}
  ${props =>
    props.featured &&
    css`
      ${tw`w-full!`}
      ${Post} {
        ${tw`sm:flex-row! h-full sm:pr-4`}
      }
      ${Image} {
        ${tw`sm:h-96 sm:min-h-full sm:w-1/2 lg:w-2/3 sm:rounded-t-none sm:rounded-l-lg`}
      }
      ${Info} {
        ${tw`sm:-mr-4 sm:pl-8 sm:flex-1 sm:rounded-none sm:rounded-r-lg sm:border-t-2 sm:border-l-0`}
      }
      ${Description} {
        ${tw`text-sm mt-3 leading-loose text-gray-600 font-medium`}
      }
    `}
`;
const Post = tw.div`cursor-pointer flex flex-col bg-gray-100 rounded-lg`;
const Image = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-64 w-full bg-cover bg-center rounded-t-lg`}
`;
const Info = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none`;
const Author = tw.div`uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;
const CreationDate = tw.div`mt-4 uppercase text-gray-600 italic font-semibold text-xs`;
const Title = tw.div`mt-1 font-black text-sm text-gray-600 group-hover:text-primary-500 transition duration-300`;
const Description = tw.div``;

const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;
const RandomButton = tw(PrimaryButton)`mt-16 mr-5`;
const TopButton = tw(PrimaryButton)`mt-16 mr-5`;
const YourButton = tw(PrimaryButton)`mt-16 mr-5`;

export default () => {
    const [posts, setPosts] = useState(false);
    const [postInModal, setPostInModal] = useState({});
    if (!posts) {
        fetch("https://harrynull.tech/campfire/api/list").then((r) => r.json()).then((resp) => {
            setPosts(resp.posts)
        })
    }

    let getName = (post) => {
        if (post.anonymous) return "Anonymous";
        else return post.poster_name;
    };

    const [showPicker, setShowPicker] = useState(false);

    const onEmojiClick = (pid, event, emojiObject) => {
        const cookies = new Cookies();
        const session = cookies.get("session");
        fetch("https://harrynull.tech/campfire/api/react", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({react: emojiObject.emoji, post_id: pid, session: session})
        });
        setShowPicker(false);
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <AnimationRevealPage>
            <Header/>
            <Container>
                <ContentWithPaddingXl>
                    <HeadingRow>
                        <Heading>Campfire Feed</Heading>
                    </HeadingRow>
                    <Description>Talking around a fire is credited with advancing human culture 40,000 years ago.
                        It’s how our ancestors bonded, relaxed, and entertained each other. Now we can do the same -
                        to share our individual stories and connect with each other.</Description>
                    <Posts>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>{postInModal.prompt}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div style={{overflowWrap: "break-word"}}>
                                    {postInModal.content}
                                </div>
                                <div>
                                    {postInModal.reacts ? Object.entries(JSON.parse(postInModal.reacts)).map(
                                        (k) => <p>{k}</p>) : ''}
                                </div>
                                <div>
                                    <button onClick={() => setShowPicker(true)}>React</button>
                                    {showPicker ?
                                        <Picker onEmojiClick={(e1, e2) =>
                                            onEmojiClick(postInModal.id, e1, e2)}/> : ''}
                                </div>
                            </Modal.Body>
                        </Modal>
                        {!posts || posts.map((post, index) => (
                            <PostContainer key={index}>
                                <Post className="group" as="a" href={post.url} onClick={() => {
                                    setPostInModal(post);
                                    handleShow();
                                }}>
                                    <Info>
                                        <Author>{getName(post)}</Author>
                                        <CreationDate>{new Date(post.time * 1000).toLocaleTimeString()}</CreationDate>
                                        <Title>{post.prompt}</Title>
                                        <Description>{post.content.substring(0, 24) + ((post.content.length > 25) ? "..." : "")}</Description>
                                    </Info>
                                </Post>
                            </PostContainer>
                        ))}
                    </Posts>
                </ContentWithPaddingXl>
            </Container>
        </AnimationRevealPage>
    );
};
