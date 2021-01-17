import React, {useState} from "react";
import tw from "twin.macro";
import styled from "styled-components";
import {SectionHeading, Subheading as SubheadingBase} from "components/misc/Headings.js";
import {PrimaryButton as PrimaryButtonBase} from "components/misc/Buttons.js";
import campfireillustrationSrc from "images/campfire-illustration.gif"
import Cookies from "universal-cookie/cjs/Cookies";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
    tw`md:w-7/12 mt-16 md:mt-0`,
    props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
    `background-image: url("${props.imageSrc}");`,
    tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Subheading2 = tw(SubheadingBase)`text-center lg:text-lg md:text-left ml-10 mt-10 text-orange-600`;
const Subheading3 = tw(SubheadingBase)`text-center lg:text-lg md:text-left ml-10 mt-10 text-orange-600`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;

const Heading2 = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center leading-tight mx-auto`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`
const ErrorMessage = tw.p`text-red-800`;

const Form = tw.div`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const Textarea = styled(Input).attrs({as: "textarea"})`
  ${tw`h-24`}
`

const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`

export default ({
                    subheading = "Profile",
                    subheading2 = "Total Number of Submissions",
                    subheading3 = "Total Number of Likes",
                    heading = <>Talk at the campfire <span tw="text-primary-500">without compromising</span> your
                        identity
                        <wbr/>
                    </>,
                    heading2 = "Statistics🔎",
                    description = "All of your works will be published anonymously using your pen name.",
                    submitButtonText = "Change Pen Name",
                    formAction = "#",
                    formMethod = "get",
                    textOnLeft = true,
                }) => {
    // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

    let [penName, setPenName] = useState(new Cookies().get("penname"));
    let [message, setMessage] = useState("");
    let submit = () => {
        const cookies = new Cookies();
        const session = cookies.get("session");
        fetch("https://harrynull.tech/campfire/api/user/change_pen_name", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({penname: penName, session: session})
        }).then((r) => r.json()).then((r) => {
            if (r.success) {
                cookies.set('penname', penName, {path: '/'});
                setMessage('');
            } else {
                setMessage(r.reason);
            }
        })
    };

    return (
        <Container>
            <TwoColumn>
                <ImageColumn>
                    <Image imageSrc={campfireillustrationSrc}/>
                </ImageColumn>
                <TextColumn textOnLeft={textOnLeft}>
                    <TextContent>
                        {subheading && <Subheading>{subheading}</Subheading>}
                        <Heading>{heading}</Heading>
                        {description && <Description>{description}</Description>}
                        <Form action={formAction} method={formMethod}>
                            <Input type="text" name="username" value={penName}
                                   onChange={(e) => setPenName(e.target.value)} placeholder="Pen Name"/>
                            <SubmitButton type="submit" onClick={submit}>{submitButtonText}</SubmitButton>
                            <ErrorMessage>{message}</ErrorMessage>

                        </Form>
                    </TextContent>
                </TextColumn>
            </TwoColumn>

            <Heading2>{heading2}</Heading2>
            <TextColumn textOnLeft={textOnLeft}>
                <TextContent>
                    {subheading2 && <Subheading2>{subheading2}</Subheading2>}
                    {subheading3 && <Subheading3>{subheading3}</Subheading3>}
                </TextContent>
            </TextColumn>
        </Container>
    );
};
