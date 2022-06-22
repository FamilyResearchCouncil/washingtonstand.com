import styled from "styled-components";
import appUrls from "../../storage/baseUrls.json"
import Link from "next/link";
import {formatTopicForDocumentTitle} from "../../helpers/DataManipulators";

const TopicListWrapper = styled.div`
  margin: 4rem 0 6rem;
  span {
    margin-right: 1rem;
  }
  a {
    color: ${({theme}) => theme.colors.primaryYellow}
  }
`


const TopicLink = (props) => (
  <>
      <Link href={`${appUrls.urlDirectories.topic}/${props.topic}`}>
          <a>
              {formatTopicForDocumentTitle(props.topic)}{props.index ? ", " : ""}
          </a>
      </Link>
  </>
);

const TopicList = (props) => {
    let topicArray = (typeof props.list === "string") ? props.list.split(",") : props.list;
    return (
        <>
            <TopicListWrapper>
                <span>Topics:</span>
                {
                topicArray.map((topic,idx) => <TopicLink key={topic} topic={topic} index={topicArray.length-idx-1}/>)
                }
            </TopicListWrapper>
        </>
    );
}

export default TopicList;

