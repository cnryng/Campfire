// import React, { useState, useEffect } from "react";
// import AnchorLink from 'react-anchor-link-smooth-scroll'
// import { Rnd } from "react-rnd";
// import { motion } from "framer-motion";
//
// import { components } from "ComponentRenderer.js";
// import AnimationRevealPage from "helpers/AnimationRevealPage.js";
// import { Container, Content2Xl, ContentWithVerticalPadding } from "components/misc/Layouts";
// import tw from "twin.macro";
// import styled from "styled-components";
// import { css } from "styled-components/macro";
// import { LogoLink } from "components/headers/light.js";
// import { SectionHeading as HeadingBase } from "components/misc/Headings";
// import { SectionDescription as DescriptionBase } from "components/misc/Typography";
// import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
//
// import { ReactComponent as CheckboxIcon } from "feather-icons/dist/icons/check-circle.svg";
// import { ReactComponent as HandleIcon } from "images/handle-icon.svg";
// import { ReactComponent as ArrowRightIcon} from "images/arrow-right-3-icon.svg";
//
// import heroScreenshotImageSrc from "images/demo/MainLandingPageHero.png";
// import logo from "images/logo.svg";
// import useInView from "use-in-view";
//
// /* Hero */
// const Row = tw.div`flex`;
// const NavRow = tw(Row)`flex flex-col sm:flex-row items-center justify-between`;
// const DownloadLink = tw.a`mt-8 sm:mt-0 transition duration-300 font-medium pb-1 border-b-2 text-primary-500 border-purple-300 hocus:border-primary-500`;
// const HeroRow = tw(Row)`flex-col lg:flex-row justify-between items-center py-20 lg:py-24 max-w-screen-2xl mx-auto`;
//
// const Column = tw.div``;
// const TextColumn = tw(Column)`mx-auto lg:mr-0 max-w-2xl lg:max-w-xl xl:max-w-2xl flex-shrink-0`;
// const Heading = tw(HeadingBase)`text-center lg:text-left text-primary-900 leading-snug`;
// const Description = tw(
//   DescriptionBase
// )`mt-4 text-center lg:text-left lg:text-base text-gray-700 max-w-lg mx-auto lg:mx-0`;
// const Actions = tw.div`flex flex-col sm:flex-row justify-center lg:justify-start`;
// const ActionButton = tw(
//   AnchorLink
// )`px-8 py-3 font-bold rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 mt-12 inline-block tracking-wide text-center px-10 py-4 font-semibold tracking-normal`;
// const PrimaryButton = tw(ActionButton)``;
// const SecondaryButton = tw(
//   ActionButton
// )`mt-6 sm:mt-12 sm:ml-8 bg-gray-300 text-gray-800 hocus:bg-gray-400 hocus:text-gray-900`;
// const FeatureList = tw.ul`mt-6 leading-loose flex flex-wrap max-w-xl mx-auto lg:mx-0`;
// const Feature = tw.li`mt-2 flex items-center flex-shrink-0 w-full sm:w-1/2 justify-center lg:justify-start`;
// const FeatureIcon = tw(CheckboxIcon)`w-5 h-5 text-primary-500`;
// const FeatureText = tw.p`ml-2 font-medium text-gray-700`;
// const ImageColumn = tw(Column)`mx-auto lg:mr-0 relative mt-16 lg:mt-0 lg:ml-8`;
// const ImageContainer = tw.div``;
// const Image = tw.img`max-w-full rounded-t sm:rounded`;
//
// const SectionContainer = tw(ContentWithVerticalPadding)``;
// const SectionHeading = tw(HeadingBase)`text-primary-900`;
// const SectionDescription = tw(DescriptionBase)`text-center mx-auto text-gray-600 max-w-4xl`;
//
// const PreviewCards = tw.div`flex flex-wrap -mr-12`;
// const PreviewCardContainer = tw.div`mt-24 mx-auto md:mx-0 max-w-lg w-full md:w-1/2 lg:w-1/3 pr-12`;
// const PreviewCard = tw(motion.a)`block rounded-lg shadow-raised`;
// const PreviewCardImageContainer = tw.div`rounded-t-lg border-0 border-b-0`;
// const PreviewCardImage = styled(motion.div)`
//   ${props => css`background-image: url("${props.imageSrc}");`}
//   ${tw`h-128 md:h-144 bg-cover bg-left-top`}
// `;
// const PreviewButton = tw(PrimaryButtonBase)`w-full rounded-b-lg rounded-t-none py-5 font-semibold`;
//
// const ComponentsContainer = tw.div`mt-24`;
// const ComponentsType = tw.h3`text-4xl font-black text-primary-500 border-b-4 border-primary-500 inline-block`;
// const Components = tw.div``;
// const Component = tw.div`mt-12 border rounded-lg bg-white`;
// const ComponentHeading = tw.div`px-8 py-5 border-b flex flex-col sm:flex-row justify-between items-center`
// const ComponentName = tw.h6`text-lg`;
// const ComponentPreviewLink = tw.a`mt-4 sm:mt-0 text-primary-500 hocus:text-primary-900 transition duration-300 font-semibold flex items-center`
// const ComponentContent = tw.div`flex justify-between overflow-hidden rounded-b-lg bg-gray-600 relative`;
// const ResizableBox = styled(Rnd)`
//   ${tw`relative! bg-white pr-4`}
//   .resizeHandleWrapper > div {
//     ${tw`w-4! right-0!`}
//   }
// `;
// const ResizeHandleButton = tw.button`cursor-col-resize focus:outline-none w-4 border-l bg-gray-100 absolute right-0 inset-y-0`;
//
// export default ({
//   features = null,
//   primaryButtonUrl = "#landingPageDemos",
//   primaryButtonText = "Explore Demos",
//   secondaryButtonUrl = "#componentDemos",
//   secondaryButtonText = "View Components",
//   buttonRoundedCss = "",
//   landingPages = components.landingPages,
//   innerPages = components.innerPages,
//   blocks = components.blocks
// }) => {
//   const previewImageAnimationVariants = {
//     rest: {
//       backgroundPositionY: "0%"
//     },
//     hover: {
//       backgroundPositionY: "100%",
//       transition: { type: "tween", ease: "linear", duration: 5 }
//     }
//   };
//
//   const noOfLandingPages = Object.keys(landingPages).length;
//   const noOfInnerPages = Object.keys(innerPages).length;
//   const noOfComponentBlocks = Object.values(blocks).reduce((acc, block) => acc + Object.keys(block.elements).length, 0);
//
//   features = features || [
//     `${noOfLandingPages} Landing Page Demos`,
//     `${noOfInnerPages} Inner Pages`,
//     `${noOfComponentBlocks} Components`,
//     "Lifetime Updates",
//     "Fully Responsive",
//     "Fully Customizable"
//   ];
//
//   return (
//     <AnimationRevealPage disabled>
//       <Container tw="bg-gray-100 -mx-8 -mt-8 pt-8 px-8">
//         <Content2Xl>
//           <NavRow>
//             <LogoLink href="/">
//               <img src={logo} alt="" />
//               Treact
//             </LogoLink>
//             <DownloadLink target="_blank" href="https://gum.co/QaruQ">
//               Download Now
//             </DownloadLink>
//           </NavRow>
//           <HeroRow>
//             <TextColumn>
//               <Heading>Modern React Templates for every need.</Heading>
//               <Description>
//                 Easily customizable modern React Templates which are also lightweight and simple to setup. All
//                 components are modular and fully responsive for great mobile experience as well as big desktop screens. Brand Colors
//                 are also fully customizable.
//               </Description>
//               <FeatureList>
//                 {features.map((feature, index) => (
//                   <Feature key={index}>
//                     <FeatureIcon />
//                     <FeatureText>{feature}</FeatureText>
//                   </Feature>
//                 ))}
//               </FeatureList>
//               <Actions>
//                 <PrimaryButton href={primaryButtonUrl} css={buttonRoundedCss}>
//                   {primaryButtonText}
//                 </PrimaryButton>
//                 <SecondaryButton href={secondaryButtonUrl}>
//                   {secondaryButtonText}
//                 </SecondaryButton>
//               </Actions>
//             </TextColumn>
//             <ImageColumn>
//               <ImageContainer>
//                 <Image src={heroScreenshotImageSrc} />
//               </ImageContainer>
//             </ImageColumn>
//           </HeroRow>
//           <SectionContainer id="landingPageDemos">
//             <SectionHeading>Landing Pages</SectionHeading>
//             <SectionDescription>
//               We have {noOfLandingPages} premade landing pages. Click on the "View Live Demo" button to see them in
//               action. Customizing or Creating your own custom landing page is really simple by using our UI components.
//             </SectionDescription>
//             <PreviewCards>
//               {Object.entries(landingPages).map(([pageName, page], index) => (
//                 <PreviewCardContainer key={index}>
//                   <PreviewCard initial="rest" animate="rest" whileHover="hover" href={page.url} target="_blank">
//                     <PreviewCardImageContainer>
//                       <PreviewCardImage
//                         transition={{ type: "tween" }}
//                         variants={previewImageAnimationVariants}
//                         imageSrc={page.imageSrc}
//                       />
//                     </PreviewCardImageContainer>
//                     <PreviewButton>View Live Demo</PreviewButton>
//                   </PreviewCard>
//                 </PreviewCardContainer>
//               ))}
//             </PreviewCards>
//           </SectionContainer>
//           <SectionContainer>
//             <SectionHeading>Inner Pages</SectionHeading>
//             <SectionDescription>
//               We also provide {noOfInnerPages} additional inner pages for your various needs like a signup, login,
//               pricing, about us, contact, blog etc. To view them in action click the "View Live Demo" button.
//             </SectionDescription>
//             <PreviewCards>
//               {Object.entries(innerPages).map(([pageName, page], index) => (
//                 <PreviewCardContainer key={index}>
//                   <PreviewCard initial="rest" animate="rest" whileHover="hover" href={page.url} target="_blank">
//                     <PreviewCardImageContainer>
//                       <PreviewCardImage
//                         transition={{ type: "tween" }}
//                         variants={!page.scrollAnimationDisabled && previewImageAnimationVariants}
//                         imageSrc={page.imageSrc}
//                       />
//                     </PreviewCardImageContainer>
//                     <PreviewButton>View Live Demo</PreviewButton>
//                   </PreviewCard>
//                 </PreviewCardContainer>
//               ))}
//             </PreviewCards>
//           </SectionContainer>
//
//           <SectionContainer id="componentDemos">
//             <SectionHeading>Component Blocks</SectionHeading>
//             <SectionDescription>
//               We also provide {noOfComponentBlocks} components along with the premade landing pages so you can create your own landing page
//               within minutes as you see fit. You can combine these components to create 1000s of unique attractive web
//               pages.
//             </SectionDescription>
//             <BlocksRenderer blocks={Object.values(blocks)} />
//           </SectionContainer>
//         </Content2Xl>
//       </Container>
//     </AnimationRevealPage>
//   );
// };
//
// const BlocksRenderer = ({blocks}) => {
//   const [lastVisibleBlockIndex, setLastVisibleBlockIndex] = useState(0)
//
//   const updateLastVisibleBlockIndex = (index) => {
//     console.log("LAST WAS ", lastVisibleBlockIndex)
//     if(index > lastVisibleBlockIndex)
//       setLastVisibleBlockIndex(index)
//   }
//
//   return (
//     <ComponentsContainer>
//       {blocks.map((block, index) => ((lastVisibleBlockIndex+1) >= index) && <Block key={index} components={block} notifyIsVisible={() => updateLastVisibleBlockIndex(index)} />)}
//     </ComponentsContainer>
//   )
// }
//
// const Block = ({notifyIsVisible, components}) => {
//   const offset = 30;
//   const [ref, inView] = useInView(offset);
//
//   useEffect(() => {
//     if(inView)
//       notifyIsVisible()
//   }, [inView, notifyIsVisible])
//
//   const ResizeHandle = (
//     <ResizeHandleButton>
//       <HandleIcon tw="w-4 h-4 text-gray-600" />
//     </ResizeHandleButton>
//   );
//
//   const componentBlockRefs = {};
//
//   const updateComponentBlockIframeHeight = iframe => {
//     iframe.style.height = "auto";
//     iframe.style.height = (iframe.contentWindow.document.body.scrollHeight) + "px";
//   };
//
//   return (
//     <div ref={ref} tw="mt-32">
//       <ComponentsType>{components.type}</ComponentsType>
//       <Components>
//         {Object.values(components.elements).map((component, componentIndex) => (
//           <Component key={componentIndex}>
//             <ComponentHeading>
//               <ComponentName>{component.name}</ComponentName>
//               <ComponentPreviewLink className="group" href={component.url} target="_blank">View Live Demo <ArrowRightIcon tw="transition duration-300 transform group-hover:translate-x-px ml-2 w-4 h-4" /></ComponentPreviewLink>
//             </ComponentHeading>
//             <ComponentContent>
//               <ResizableBox
//                 minWidth={420}
//                 default={{
//                   width: "100%",
//                   height: "100%"
//                 }}
//                 bounds="parent"
//                 disableDragging={true}
//                 enableResizing={{ right: true }}
//                 resizeHandleComponent={{ right: ResizeHandle }}
//                 resizeHandleWrapperClass={`resizeHandleWrapper`}
//                 onResize={() => updateComponentBlockIframeHeight(componentBlockRefs[component.url])}
//               >
//                 <iframe
//                   src={component.url}
//                   title="Hero"
//                   width="100%"
//                   ref={ref => (componentBlockRefs[component.url] = ref)}
//                   onLoad={e => updateComponentBlockIframeHeight(e.target)}
//                 />
//               </ResizableBox>
//             </ComponentContent>
//           </Component>
//         ))}
//       </Components>
//     </div>
//   )
// }

import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "images/features.png";
import logo from "images/flamelogo.png";
import campfireillustrationSrc from "images/campfire-people.jpg";
import googleIconImageSrc from "images/google-icon.png";
import twitterIconImageSrc from "images/twitter-icon.png";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import Header from "components/headers/lightCampfire.js";

import { GoogleLogin } from 'react-google-login';
import LoginGoogle from 'LoginGoogle.js';

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-2xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`lg:w-10/12 m-5 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold text-orange-600 `;
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

const clientId = '42584847096-0l1ab2ofqql8qh5laiokvgkmhboot6t2.apps.googleusercontent.com';
const responseGoogle = (response) => {
  console.log(response);
}

export default ({
                    logoLinkUrl = "#",
                    illustrationImageSrc = campfireillustrationSrc,
                    headingText = "Share your thoughts just like you would at a campfire.",
                    socialButtons = [
                        {
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
                    SignUpButtonText = "Sign Up",
                    SignInButtonText = "Sign In with Google",
                    SubmitButtonIcon = SignUpIcon,
                    tosUrl = "#",
                    privacyPolicyUrl = "#",
                    signInUrl = "#"
                }) => (

    <AnimationRevealPage>
        <Header />
        <Content>
            <MainContainer>
                <MainContent>
                    <Heading>{headingText}</Heading>
                    {/*<FormContainer>*/}
                    {/*
              <SocialButtonsContainer>
                {socialButtons.map((socialButton, index) => (
                  <SocialButton key={index} href={socialButton.url}>
                    <span className="iconContainer">
                      <img src={socialButton.iconImageSrc} className="icon" alt="" />
                    </span>
                    <span className="text">{socialButton.text}</span>
                  </SocialButton>
                ))}
              </SocialButtonsContainer>
              */}
                    {/*<DividerTextContainer>
                            <DividerText>something</DividerText>
                        </DividerTextContainer>
                        <Form>
                            <Input type="text" placeholder="Name" />
                            <Input type="text" placeholder="Pen Name" />
                            <Input type="number" placeholder="Age" />
                            <Input type="password" placeholder="Password" />
                            <Input type="email" placeholder="Email" />
                            <Input type="password" placeholder="Password" />
                            <SubmitButton type="submit">
                                <SubmitButtonIcon className="icon" />
                                <span className="text">{submitButtonText}</span>
                            </SubmitButton>*/}
                    {/*
                <p tw="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by treact's{" "}
                  <a href={tosUrl} tw="border-b border-gray-500 border-dotted">
                    Terms of Service
                  </a>{" "}
                  and its{" "}
                  <a href={privacyPolicyUrl} tw="border-b border-gray-500 border-dotted">
                    Privacy Policy
                  </a>
                </p>
                */}
                <LogoImage src={illustration} />

                {/*
                <SubmitButton type="submit">
                  <SubmitButtonIcon className="icon" />
                  <span className="text">{SignUpButtonText}</span>
                </SubmitButton>
                */}

                <GoogleLogin
                    clientId={clientId}
                    render={renderProps => (
                        <SubmitButton type="submit" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                          <SubmitButtonIcon className="icon" />
                          <span className="text">{SignInButtonText}</span>
                        </SubmitButton>
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />

                {/*<LoginGoogle />*/}
                </MainContent>

            </MainContainer>

            <IllustrationContainer>
                <IllustrationImage imageSrc={illustrationImageSrc} />
            </IllustrationContainer>
        </Content>
    </AnimationRevealPage>
);
