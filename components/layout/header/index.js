import React, { useState, useRef } from "react";
import Burger from '../navigation/burger'
import Menu from '../navigation/menu'
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import styles from './Header.module.css'
import Link from "next/link";
import TopTopics from "../../subComponents/TopTopics";
import MainLogo from "../../../public/img/WashStand_v5.svg";
import ErrorBoundary from "../../ErrorBoundary";

const Header = () => {
    const [open, setOpen] = useState(false);
    const node = useRef();
    useOnClickOutside(node, () => setOpen(false));

    return (
        <>
            <header className={styles.header}>
                <Link href={"/"}>
                    <a className={styles.logoLink}>
                        <MainLogo />
                    </a>
                </Link>
                <p className={styles.headingTagLine}>". . . and having done all . . . stand firm." Eph. 6:13</p>
                <div className={styles.leadTopics}>
                <ErrorBoundary>
                    <TopTopics />
                </ErrorBoundary>
                </div>
            </header>
            <div ref={node}>
                <Burger open={open} setOpen={setOpen} />
                <Menu  open={open} setOpen={setOpen} />
            </div>
        </>
    );
}

export default Header;