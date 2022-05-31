import Link from 'next/link';
import { bool, func } from 'prop-types';
import { StyledMenu } from './menu.styled';
import TopTopics from "../../../subComponents/TopTopics";
import AppSearchIo from "../../../subComponents/AppSearchIo";

const Menu = ({ open }) => (
        <StyledMenu open={open}>
            {/*<AppSearchIo />*/}
            <Link href="/">
                <a>HOME</a>
            </Link>
            <Link href="/about">
                <a>About Us</a>
            </Link>
            <Link href="/authors">
                <a>Authors</a>
            </Link>
            <a href={`https://www.frc.org/d-2205_73`} target={`_blank`}>
                Donate
            </a>
            <div className={`topicNews`}>
                <strong>NEWS</strong>
                <TopTopics />
            </div>
        </StyledMenu>
    );

Menu.propTypes = {
    open: bool.isRequired
}

export default Menu;