import {StyledGreySection} from "../layout/sections/GeySection";
import {TopDisplayDiv} from "../../pages/news/[id]";

const paragraphStyles = {
    marginTop: ".5rem"
}

const AuthorTeaserBios = (props) => (
    <>
        <StyledGreySection>
            <TopDisplayDiv>
                {
                    props.authors.map(author => (
                        <div key={author.PERSONAL_ID}>
                            <strong>{author.AUTHOR_NAME}</strong>
                            <p style={paragraphStyles}>{author.TEASER_BIO}</p>
                        </div>
                    ))
                }
            </TopDisplayDiv>
        </StyledGreySection>
    </>
);

export default AuthorTeaserBios;