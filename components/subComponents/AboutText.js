import {StyledReadingSection} from "./ReadingTextBlock";

const styling = {
    h2: {
        marginBottom: 0
    },
    text: {
        paddingLeft: "2rem",
    }
}

const AboutBlock = () => (
    <>
        <StyledReadingSection>
            <h2 style={styling.h2}>ABOUT</h2>
            <div style={styling.text}>
            <AboutText />
            </div>
        </StyledReadingSection>
    </>
);

export default AboutBlock;

const AboutText = () => (
    <p>
        Spicy jalapeno bacon ipsum dolor amet prosciutto voluptate boudin ipsum laboris bresaola enim ball tip kielbasa deserunt ex reprehenderit flank t-bone pig. Incididunt boudin picanha short ribs. Cupidatat sed quis short ribs. Pig turkey lorem bacon esse. Nisi boudin anim turducken cow, biltong landjaeger cupidatat ullamco alcatra short ribs brisket strip steak elit. Boudin in picanha esse irure landjaeger.
    </p>
);

export {AboutText};