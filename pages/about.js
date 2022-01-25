import styles from "../styles/Main.module.css";
import HeadTag from "../components/layout/HeadTag"
import {StyledContentContainer} from "../components/layout/sections/contentContainer";
import {StyledPrimaryBlueSection} from "../components/layout/sections/primaryBlueSection";
import StaffListing from "../components/subComponents/staffList";
import {StyledReadingSection} from "../components/subComponents/readingTextBlock";

const AboutUs = () => (
    <>
        <HeadTag title="About Us" description="About FRC's Association of Churches & Ministries" />

        <StyledPrimaryBlueSection>
            <StyledReadingSection>
                <h2 className={` ${styles.h2} ${styles.h2NoMargin} `}>Some about text</h2>
                Spicy jalapeno bacon ipsum dolor amet short ribs pork loin pork chicken pork chop pastrami chislic frankfurter, picanha pig. Ham pork loin cupim short ribs. Pork loin fatback alcatra, pork belly pastrami brisket shank meatloaf flank. Chislic pig shank corned beef spare ribs. Kielbasa andouille spare ribs, porchetta sirloin pork pancetta ribeye shoulder. Pastrami landjaeger meatball, pancetta boudin jerky chislic shoulder sausage drumstick.<br />
                Burgdoggen pancetta ribeye, picanha ground round boudin short ribs corned beef tongue strip steak shoulder. Turkey short ribs salami tenderloin venison shoulder boudin beef ribs. Pork belly salami corned beef, jerky jowl rump tail turducken meatball cupim andouille sausage ham sirloin biltong. Boudin andouille kevin, tongue bresaola frankfurter swine pastrami. Buffalo turducken sausage cupim fatback. Hamburger pork chop kielbasa leberkas ham burgdoggen porchetta shank salami picanha bresaola.<br />
            </StyledReadingSection>

            <StyledContentContainer>
                <h2 className={` ${styles.h2} ${styles.h2NoMargin} `}>OUR STAFF</h2>
                <StaffListing />
            </StyledContentContainer>

            <StyledReadingSection>
                <h2 className={` ${styles.h2} ${styles.h2NoMargin} `}>More about text</h2>
                Spicy jalapeno bacon ipsum dolor amet short ribs pork loin pork chicken pork chop pastrami chislic frankfurter, picanha pig. Ham pork loin cupim short ribs. Pork loin fatback alcatra, pork belly pastrami brisket shank meatloaf flank. Chislic pig shank corned beef spare ribs. Kielbasa andouille spare ribs, porchetta sirloin pork pancetta ribeye shoulder. Pastrami landjaeger meatball, pancetta boudin jerky chislic shoulder sausage drumstick.<br />
                Burgdoggen pancetta ribeye, picanha ground round boudin short ribs corned beef tongue strip steak shoulder. Turkey short ribs salami tenderloin venison shoulder boudin beef ribs. Pork belly salami corned beef, jerky jowl rump tail turducken meatball cupim andouille sausage ham sirloin biltong. Boudin andouille kevin, tongue bresaola frankfurter swine pastrami. Buffalo turducken sausage cupim fatback. Hamburger pork chop kielbasa leberkas ham burgdoggen porchetta shank salami picanha bresaola.<br />
            </StyledReadingSection>
        </StyledPrimaryBlueSection>
    </>
);

export default AboutUs;