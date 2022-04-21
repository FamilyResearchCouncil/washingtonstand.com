import React, { useState, useRef, useEffect } from "react";
import Burger from '../navigation/burger'
import Menu from '../navigation/menu'
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import styles from './Header.module.css'
import {StyledReadingSection} from "../../subComponents/readingTextBlock";
import Link from "next/link";

import MainLogo from "../../../public/img/WashStand_v5.svg";

const TopTopics = () => {
    const [error, setError] = useState(null);
    const [displayHtml, setDisplayHtml] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() =>{
        fetch(`https://api.frc.org/api/webtext/WX22D07.cfm?trackDownload=0`)
            .then(res => res.text())
            .then(
                (result) => {
                    setDisplayHtml({
                        __html: result
                    })
                    setIsLoaded(true);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error.message);
                }
            );
    },[])


    if (error || !isLoaded) {
        return <div />;
    } else {
        return (
            <>
                <StyledReadingSection className={styles.leadTopics} dangerouslySetInnerHTML={displayHtml} />
            </>
        );
    }

}

const Header = () => {
    const [open, setOpen] = useState(false);
    const node = useRef();
    useOnClickOutside(node, () => setOpen(false));

    return (
        <header ref={node} className={styles.header}>
            <Link href={"/"}>
                <a className={styles.logoLink}>
                    <MainLogo />
                </a>
            </Link>
            <TopTopics />
            <Burger open={open} setOpen={setOpen} />
            <Menu  open={open} setOpen={setOpen} />
        </header>
    );
}

export default Header;