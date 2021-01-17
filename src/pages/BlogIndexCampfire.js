import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import Header from "components/headers/lightCampfire.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton } from "components/misc/Buttons";


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
const Title = tw.div`mt-1 font-black text-2xl text-gray-900 group-hover:text-primary-500 transition duration-300`;
const Description = tw.div``;

const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;
const RandomButton = tw(PrimaryButton)`mt-16 mr-5`;
const TopButton = tw(PrimaryButton)`mt-16 mr-5`;
const YourButton = tw(PrimaryButton)`mt-16 mr-5`;

export default ({
  headingText = "Campfire Feed",
  description = "Talking around a fire is credited with advancing human culture 40,000 years ago. It’s how our ancestors bonded, relaxed, and entertained each other. Now we can do the same - to share our individual stories and connect with each other.",
  posts = [
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
  ]
}) => {
  const [visible, setVisible] = useState(6);
  const onLoadMoreClick = () => {
    setVisible(v => v + 6);
  };
  const onRandomClick = () => {
    setVisible(v => v + 6);
  };
  const onTopClick = () => {
    setVisible(v => v + 6);
  };
  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Heading>{headingText}</Heading>
          </HeadingRow>
          <Description>{description}</Description>
        <div class="flex flex-row">
          <TopButton onClick={onLoadMoreClick}>Top Submissions</TopButton>
        <RandomButton onClick={onLoadMoreClick}>Random Submissions</RandomButton>
      <YourButton onClick={onLoadMoreClick}>Your Submissions</YourButton>
    </div>
          <Posts>
            {posts.slice(0, visible).map((post, index) => (
              <PostContainer key={index} featured={post.featured}>
                <Post className="group" as="a" href={post.url}>
                  <Info>
                    <Author>{post.category}</Author>
                    <CreationDate>{post.date}</CreationDate>
                    <Title>{post.title}</Title>
                    {post.featured && post.description && <Description>{post.description}</Description>}
                  </Info>
                </Post>
              </PostContainer>
            ))}
          </Posts>
          {visible < posts.length && (
            <ButtonContainer>
              <LoadMoreButton onClick={onLoadMoreClick}>Load More</LoadMoreButton>
            </ButtonContainer>
          )}
        </ContentWithPaddingXl>
      </Container>
    </AnimationRevealPage>
  );
};

const questions = ["Who inspires you? Why?",
    "What is something you are proud of?",
    "Write a short letter to your high school self.",
    "What would you do if you knew you could not fail?",
    "What is your ideal life? How can you achieve it?",
    "What is going well in your life right now?",
    "Describe in detail what you want your life to be like 5 years from now.",
    "If you had a million dollars, what would you spend it on and why?",
    "Are you living to your full potential? If not, why?",
    "Are you holding grudges? Write them down and let them go.",
    "What makes you feel the most confident?",
    "What was your biggest learning moment this week?",
    "Write a thank you letter to your body.",
    "What do you wish more people knew about you and why?",
    "If you could change anything about yourself what would it be and why?",
    "How would you describe yourself to a stranger?"
  ]
const getPlaceholderPost = () => ({
  category: "Pen Name",
  title: questions[Math.floor(Math.random() * questions.length)],
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  url: "https://reddit.com"
});
