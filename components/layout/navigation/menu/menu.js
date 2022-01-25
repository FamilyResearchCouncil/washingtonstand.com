import Link from 'next/link';
import { bool, func } from 'prop-types';
import { StyledMenu } from './menu.styled';

const Menu = ({ open }) => (
        <StyledMenu open={open}>
            <Link href="/">
                <a>HOME</a>
            </Link>
            <Link href="/about">
                <a>About Us</a>
            </Link>
        </StyledMenu>
    );

Menu.propTypes = {
    open: bool.isRequired
}

export default Menu;