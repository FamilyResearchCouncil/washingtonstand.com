import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import {concatAuthorNames} from "../../helpers/DataManipulators";
import {PublicationTypeGreyText} from "./PublicationTypeGreyText";

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
    <ArticleLink key={props.ITEM_CODE}>
        {

            props.displayImg ?
            <Link href={`/${props.article.TYPE_DESC.toLowerCase()}/${props.article.URL_SLUG}`}>
                <a>
                    <Image src={props.article.SCREENCAP_IMAGE} width={763} height={400} layout='responsive'/>
                </a>
            </Link> : ""
        }
        <div>
            <PublicationTypeGreyText>{props.article.TYPE_DESC}</PublicationTypeGreyText>
            <Link href={`/${props.article.TYPE_DESC.toLowerCase()}/${props.article.URL_SLUG}`}>
                <a>
                    <h2 dangerouslySetInnerHTML={{__html: props.article.ITEM_DESC}} />
                </a>
            </Link>
            {
                props.displayByLine ?
                    <span>
                        <i>{props.article.FULL_DATE}</i>
                        { props.article.authorDetailsArray.length ? <>&nbsp;|&nbsp;</> : <></>}
                        {
                            (props.listAuthorId && props.article.authorDetailsArray.length ) ? <>with&nbsp;</> : <></>
                        }
                        {concatAuthorNames(props.article.authorDetailsArray)}
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
                    <NewsItem
                        key={idx}
                        displayImg={props.displayImg}
                        displaySummary={props.displaySummary}
                        displayByLine={props.displayByLine}
                        listAuthorId={props.listAuthorId}
                        article={item}
                    />
                ))
            }
        </>
    );
}

export default NewsListing;
