import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css'
import Image from "next/image";
import styles from "./AroundTheWebCarousel.module.css"

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
        partialVisibilityGutter: 50
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        partialVisibilityGutter: 40
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        partialVisibilityGutter: 30
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        partialVisibilityGutter: 20
    }
};

const AroundTheWebCarousel = (props) => (
    <Carousel
        className={styles.homepageCarousel}
        responsive={responsive}
        autoPlay={false}
        renderButtonGroupOutside={true}

        ssr={true}>
        {
            props.linkArray.map((link,idx) => (
                    <a key={idx} href={link.EXTERNAL_LINK}>
                        <Image src={link.SCREENCAP_IMAGE} width={763} height={400} layout='responsive' alt={link.ITEM_DESC}/>
                        <h3>
                            {link.ITEM_DESC}
                        </h3>
                    </a>
                )
            )
        }
    </Carousel>
);

export default AroundTheWebCarousel;