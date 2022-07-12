import Link from 'next/link';
import { bool, func } from 'prop-types';
import { StyledMenu } from './menu.styled';
import TopTopics from "../../../subComponents/TopTopics";
import appUrls from "../../../../storage/baseUrls.json";
import ErrorBoundary from "../../../ErrorBoundary";
import StartSearch from "../../../subComponents/StartSearch";

const Menu = ({ open, setOpen }) => (
        <StyledMenu open={open}>
            <StartSearch open={open} setOpen={setOpen}/>
            <Link href="/">
                <a onClick={() => setOpen(!open)}>HOME</a>
            </Link>
            <Link href="/about">
                <a onClick={() => setOpen(!open)}>About Us</a>
            </Link>
            <Link href="/authors">
                <a onClick={() => setOpen(!open)}>Authors</a>
            </Link>
            <a href="mailto:tips@washingtonstand.com?subject=Story tip for The Washington Stand" target={`_blank`} onClick={() => setOpen(!open)}>
                Tips
            </a>
            <a href={appUrls.external.donate} target={`_blank`} onClick={() => setOpen(!open)}>
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