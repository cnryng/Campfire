import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import {
  Container as ContainerBase
} from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import {
  css
} from "styled-components/macro"; //eslint-disable-line
import logo from "images/logo.svg";
import googleIconImageSrc from "images/google-icon.png";
import twitterIconImageSrc from "images/twitter-icon.png";
import {
  ReactComponent as SignUpIcon
} from "feather-icons/dist/icons/user-plus.svg";
import Header from "components/headers/lightCampfire.js";
import night from "images/night.jpg";

const Container = tw(ContainerBase)
`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div `max-w-screen-2xl h-screen m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div `lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a ``;
const LogoImage = tw.img `h-12 mx-auto`;
const MainContent = tw.div `mt-12 flex flex-col items-center`;
const Heading = tw.h1 `text-2xl xl:text-3xl font-extrabold text-orange-600`;
const FormContainer = tw.div `w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div `flex flex-col items-center`;
const SocialButton = styled.a `
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

const DividerTextContainer = tw.div `my-12 border-b text-center relative`;
const DividerText = tw.div `leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;
const Description = tw`text-sm mt-3 leading-loose text-gray-600 font-medium`
const Form = tw.form `mx-auto max-w-xs`;
const Input = tw.textarea `w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-2xl focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button `
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div `sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div `
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

var sectionStyle = {
  width: "100%",
  height: "400px",
  backgroundImage: `url(${night})`
};

export default ({
  logoLinkUrl = "#",
  illustrationImageSrc = night,
  questions = ["Who inspires you? Why?",
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
  ],

headingText = questions[Math.floor(Math.random() * questions.length)],

  socialButtons = [{
      iconImageSrc: googleIconImageSrc,
      text: "Sign Up With Google",
      url: "https://google.com"
    },
    {
      iconImageSrc: twitterIconImageSrc,
      text: "Sign Up With Twitter",
      url: "https://twitter.com"
    }
  ],
  submitButtonText = "Submit",
  SubmitButtonIcon = SignUpIcon,
  tosUrl = "#",
  privacyPolicyUrl = "#",
  signInUrl = "#"
}) => (

  <AnimationRevealPage >
  <Header / >
  <Content >
  <MainContainer >
  <MainContent >

  <Heading > {
    headingText
  } < /Heading> <
  Input type = "text"
  maxLength = "250"
  placeholder = "Write here..." / >
  <SubmitButton type = "submit" >
  <span className = "text" > {
    submitButtonText
  } < /span>
  </SubmitButton>
  <div>
  <h2 >*500 Word Limit </h2>
  </div>
  </MainContent>
  </MainContainer>
  </Content>
  </AnimationRevealPage>
);
