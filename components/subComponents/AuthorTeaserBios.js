import {StyledGreySection} from "../layout/sections/GeySection";
import {TopDisplayDiv} from "../../pages/news/[id]";

const paragraphStyles = {
    marginTop: ".5rem",
    fontStyle: "italic"
}

const AuthorTeaserBios = (props) => (
    <>
        {
            props.authors.map(author => (
                <>
                    <p key={author.PERSONAL_ID} style={paragraphStyles}>{author.TEASER_BIO}</p>
                </>

            ))
        }
    </>
);

export default AuthorTeaserBios;