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
<<<<<<< HEAD
const Subheading2 = tw(SubheadingBase)`text-center lg:text-lg md:text-left ml-12 mt-10 text-orange-600`;
const Subheading3 = tw(SubheadingBase)`text-center lg:text-lg md:text-left ml-12 mt-10 text-orange-600`;
=======
const Subheading2 = tw.span`text-center lg:text-lg md:text-left ml-10 mt-10 text-orange-600`;
>>>>>>> a834efb88279b52e2bfd08f62781bb9310fa1dc5
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
                    heading = <>Talk at the campfire <span tw="text-primary-500">without compromising</span> your
                        identity
                        <wbr/>
                    </>,
                    description = "All of your works will be published anonymously using your pen name.",
                    submitButtonText = "Change Pen Name",
                    formAction = "#",
                    formMethod = "get",
                    textOnLeft = true,
                }) => {
    // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

    const cookies = new Cookies();
    const session = cookies.get("session");

    let [penName, setPenName] = useState(new Cookies().get("penname"));
    let [message, setMessage] = useState("");
    let [stats, setStats] = useState({});
    let [statsRequested, setStatsRequested] = useState(false);
    let submit = () => {
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
    if (!statsRequested) {
        fetch("https://harrynull.tech/campfire/api/stats", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({penname: penName, session: session})
        }).then((r) => r.json()).then((r) => {
            setStats(r.stats);
            setStatsRequested(true);
        })
    }

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
                        <Heading2>Statistics🔎</Heading2>
                        <TextColumn textOnLeft={textOnLeft}>
                            <TextContent>
                                <p>Total Number of Submission <Subheading2>{stats.n_posts}</Subheading2></p>
                                <p>Total Number of Comments Received <Subheading2>{stats.total_comments}</Subheading2>
                                </p>
                                <p>Total Number of Reacts
                                    Received <Subheading2>{stats.total_emoji_response}</Subheading2></p>
                            </TextContent>
                        </TextColumn>
                    </TextContent>
                </TextColumn>
            </TwoColumn>

        </Container>
    );
};
