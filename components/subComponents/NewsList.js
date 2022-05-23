import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import {concatAuthorNames} from "../../helpers/DataManipulators";

const ArticleLink = styled.article`
  h2, h3 {
    font-family: ${({theme}) => theme.fonts.titleText };
    font-size: 2rem;
    margin-top: 0;
  }
  &:last-child {
    border-bottom: none;
  }
`

const NewsItem = (props) => (
    <ArticleLink>
        {

            props.displayImg ?
            <Link href={`/${props.article.TYPE_DESC.toLowerCase()}/${props.article.URL_SLUG}`}>
                <a>
                    <Image src={props.article.SCREENCAP_IMAGE} width={763} height={400} layout='responsive'/>
                </a>
            </Link> : ""
        }
        <div>
            <Link href={`/${props.article.TYPE_DESC.toLowerCase()}/${props.article.URL_SLUG}`}>
                <a>
                    <h2 dangerouslySetInnerHTML={{__html: props.article.ITEM_DESC}} />
                </a>
            </Link>
            {
                props.displayByLine ?
                    <span>
                        <i>{props.article.FULL_DATE}</i> &nbsp;|&nbsp; {concatAuthorNames(props.article.authorDetailsArray)}
                    </span>
                    : <></>
            }
        </div>
    </ArticleLink>
);

const NewsListing = (props) => {

    return (
        <>
            {
                props.list.map((item,idx) => (
                    <>
                    <NewsItem
                        key={idx}
                        displayImg={props.displayImg}
                        displaySummary={props.displaySummary}
                        displayByLine={props.displayByLine}
                        article={item}
                    />
                    </>
                ))
            }
        </>
    );
}

export default NewsListing;
