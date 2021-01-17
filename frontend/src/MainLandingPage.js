import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import {Container as ContainerBase} from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import illustration from "images/features.png";
import campfireillustrationSrc from "images/campfire-people.jpg";
import {ReactComponent as SignUpIcon} from "feather-icons/dist/icons/user-plus.svg";
import Header from "components/headers/lightCampfire.js";
import {Link} from "react-router-dom";
import Cookies from "universal-cookie";


const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-2xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`lg:w-10/12 m-5 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-3xl xl:text-4xl font-extrabold text-orange-600 `;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-white text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;


export default ({
                    illustrationImageSrc = campfireillustrationSrc,
                    headingText = "Share your thoughts just like you would at a campfire.",
                    SignUpButtonText = "Sign Up",
                    SignInButtonText = "Sign In",
                    SubmitButtonIcon = SignUpIcon
                }) => {


    const penname = new Cookies().get("penname");

    return (

        <AnimationRevealPage>
            <Header/>
            <Content>
                <MainContainer>
                    <MainContent>
                        <Heading>{headingText}</Heading>
                        <LogoImage src={illustration}/>
                        {penname ? <p>Welcome {penname}!</p> : 
                            <div style={{ width:'30vw'}}>
                                <Link tw="w-full" to="/signup">
                                    <SubmitButton type="submit">
                                        <SubmitButtonIcon className="icon"/>
                                        <span className="text">{SignUpButtonText}</span>
                                    </SubmitButton>
                                </Link>
                                <Link tw="w-full" to="/signin">
                                    <SubmitButton type="submit">
                                        <SubmitButtonIcon className="icon"/>
                                        <span className="text">{SignInButtonText}</span>
                                    </SubmitButton>
                                </Link>
                            </div>
                        }
                    </MainContent>
                </MainContainer>
                <IllustrationContainer>
                    <IllustrationImage imageSrc={illustrationImageSrc}/>
                </IllustrationContainer>
            </Content>
        </AnimationRevealPage>
    );
}
