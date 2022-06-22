import {Feed} from "feed";

const GenRssFee = (posts) => {

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
        image: `${siteURL}/logo.svg`,
        favicon: `${siteURL}/favicon.png`,
        copyright: `All rights reserved ${date.getFullYear()}, The Washington Stand`,
        updated: date,
        generator: "Feed for Node.js",
        feedLinks: {
            rss2: `${siteURL}/rss/feed.xml`,
            json: `${siteURL}/rss/feed.json`,
            atom: `${siteURL}/rss/atom.xml`,
        },
        author,
    });

    posts.forEach((post) => {
        const url = `${siteURL}/blog/${post.slug}`;
        feed.addItem({
            title: post.title,
            id: url,
            link: url,
            description: post.summary,
            content: post.summary,
            author: [author],
            contributor: [author],
            date: new Date(post.START_DATE),
        });
    });
};

export default GenRssFee;