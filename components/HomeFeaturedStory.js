import Link from "next/link";
import appUrls from "../storage/baseUrls.json";
import Image from "next/image";

const FeaturedPublication = (props) => (
    <article>
        <Link href={`/${appUrls.urlDirectories.news}/${props.ITEM_CODE}`}>
            <a>
                <Image src={props.SCREENCAP_IMAGE} width={763} height={400} layout='responsive'/>
            </a>
        </Link>
        <Link href={`/${appUrls.urlDirectories.news}/${props.ITEM_CODE}`}>
            <a>
                <h3>{props.ITEM_DESC}</h3>
            </a>
        </Link>
        <p>{props.SUMMARY_TEXT}</p>
    </article>
);

export default FeaturedPublication;