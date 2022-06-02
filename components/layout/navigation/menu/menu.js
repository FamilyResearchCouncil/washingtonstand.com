import Link from 'next/link';
import { bool, func } from 'prop-types';
import { StyledMenu } from './menu.styled';
import TopTopics from "../../../subComponents/TopTopics";
import AppSearchIo from "../../../subComponents/AppSearchIo";
import appUrls from "../../../../storage/baseUrls.json";
import ErrorBoundary from "../../../ErrorBoundary";

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
            <a href={appUrls.external.donate} target={`_blank`}>
                Donate
            </a>
            <div className={`topicNews`}>
                <ErrorBoundary>
                    <strong>NEWS</strong>
                    <TopTopics />
                </ErrorBoundary>
            </div>
        </StyledMenu>
    );

Menu.propTypes = {
    open: bool.isRequired
}

export default Menu;