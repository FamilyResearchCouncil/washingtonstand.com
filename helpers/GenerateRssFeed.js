import fs from "fs";
import {Feed} from "feed";
import {decode} from 'html-entities';
import {getPublicationAuthorArray} from "./DataManipulators";
import appUrls from "../storage/baseUrls.json"

const transformAuthorsArray = (authorsArray) => {
    return authorsArray.map(author => {
        return {
            name: author.AUTHOR_NAME,
            link: `https://washingtonstand.com${appUrls.urlDirectories.staff}/${author.AUTHOR_SLUG}`
        }
    })
}

const GenerateRssFeed = (publicationType,posts,authors) => {

    const siteURL = 'https://washingtonstand.com';
    const date = new Date();
    const author = {
        name: "The Washington Stand",
        email: "tips@washingtonstand.com",
    };

    const feed = new Feed({
        title: "The Washington Stand",
        description: "The Washington Stand is Family Research Council’s outlet for news and commentary from a biblical worldview.",
        id: siteURL,
        link: siteURL,
        image: `${siteURL}/img/WashStand_v5.svg`,
        favicon: `${siteURL}/favicon.ico`,
        copyright: `All rights reserved ${date.getFullYear()}, The Washington Stand`,
        updated: date,
        generator: "Feed for Node.js",
        feedLinks: {
            rss2: `${siteURL}/rss/${publicationType}/feed.xml`,
            json: `${siteURL}/rss/${publicationType}/feed.json`,
            atom: `${siteURL}/rss/${publicationType}/atom.xml`,
        },
        author,
    });

    posts.forEach((post) => {
        const url = post.CANONICAL_URL;
        const authorArray = getPublicationAuthorArray(post.AUTHOR_ID_LIST,authors);

        feed.addItem({
            title: decode(post.ITEM_DESC),
            id: url,
            link: url,
            description: post.SUMMARY_TEXT,
            content: post.SUMMARY_TEXT,
            author: transformAuthorsArray(authorArray),
            date: new Date(post.START_DATE)
        });
    });

    fs.mkdirSync(`./public/rss/${publicationType}`, { recursive: true });
    fs.writeFileSync(`./public/rss/${publicationType}/feed.xml`, feed.rss2());
    fs.writeFileSync(`./public/rss/${publicationType}/atom.xml`, feed.atom1());
    fs.writeFileSync(`./public/rss/${publicationType}/feed.json`, feed.json1());
};

export default GenerateRssFeed;