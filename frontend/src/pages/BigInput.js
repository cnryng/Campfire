import React, {useState} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import {Container as ContainerBase} from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
//eslint-disable-line
import Header from "components/headers/lightCampfire.js";
import night from "images/night.jpg";
import Checkbox from "components/misc/Checkbox.js"
import {useHistory} from "react-router-dom";
import Cookies from "universal-cookie";

const Container = tw(ContainerBase)
    `min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-2xl h-screen m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold text-orange-600`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

// <<<<<<< HEAD
// import CheckIcon from '@material-ui/icons/Check';
// import ToggleButton from '@material-ui/lab/ToggleButton';
// import StandaloneToggleButton from "pages/toggle.js"
//
// const SocialButtonsContainer = tw.div `flex flex-col items-center`;
// const SocialButton = styled.a `
// =======
const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
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

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;
const Description = tw`text-sm mt-3 leading-loose text-gray-600 font-medium`
const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.textarea`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-2xl focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;


var sectionStyle = {
    width: "100%",
    height: "400px",
    backgroundImage: `url(${night})`
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
];

export default () => {
    const [prompt, setPrompt] = useState("");
    const [anonymous, setAnonymous] = useState(false);
    if (prompt === "") {

        setPrompt(questions[Math.floor(Math.random() * questions.length)]);
    }
    const [content, setContent] = useState("");
    let history = useHistory();

    let submit = () => {
        const cookies = new Cookies();
        const session = cookies.get("session");
        fetch("https://ourcampfire.space/api/post", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({content: content, anonymous: anonymous, prompt: prompt, session: session})
        }).then(() => {
            setContent("");
            history.push('/read');
        })
    };
    return (<AnimationRevealPage><Header/><Content>
            <MainContainer>
                <MainContent>
                    <Heading> {prompt} </Heading>
                    <Input type="text"
                           maxLength="1000"
                           placeholder="Write here..."
                           value={content}
                           onChange={(e) => setContent(e.target.value)}
                    />
                    <SubmitButton type="submit" onClick={submit}>
                        <span className="text"> Submit </span>
                    </SubmitButton>
                    <div><h2 style={{margin: "10px"}}>*1000 Character Limit</h2></div>
                    <Checkbox label=" Post as Anonymous?" checked={anonymous} onChange={() => {
                        setAnonymous(!anonymous)
                    }}/>
                </MainContent>
            </MainContainer>
        </Content>
        </AnimationRevealPage>
    );
}
