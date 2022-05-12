import HeadTag from "../components/layout/HeadTag"
import {StyledReadingSection} from "../components/subComponents/ReadingTextBlock";
import DisplayPublicationHtml from "../components/subComponents/DisplayPublicationHtml";

const AboutUs = (props) => (
    <>
        <HeadTag title="About Us" description="About The Washington Stand" />

        <StyledReadingSection>
            <DisplayPublicationHtml displayHtml={props.displayHtml}/>
        </StyledReadingSection>

    </>
);


export async function getStaticProps() {

    let pageProps = {}

    await fetch(`https://api.frc.org/api/webtext/WX22E08.cfm?trackDownload=0`)
        .then(res => res.text())
        .then(
            (result) => {
                pageProps.displayHtml = {
                    __html: result
                };
            },
            (error) => {

            }
        );

    return {
        props: {...pageProps},
        revalidate: 60
    };

}



export default AboutUs;