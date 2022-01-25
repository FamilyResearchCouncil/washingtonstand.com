import styled from 'styled-components';
import styles from "./videoContainer.module.css"

const StyledVideoContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const VideoContainer = (props) => (
    <>
        <StyledVideoContainer>
            <div className={styles.outterDiv}>
                <div className={styles.innerDiv}>
                    <iframe
                        src={`https://players.brightcove.net/5194481742001/ErHOgbIwP_default/index.html?videoId=${props.videoId}`}
                        allow="encrypted-media"
                        className={styles.videoElement}></iframe>
                </div>
            </div>
        </StyledVideoContainer>
    </>
);

export default VideoContainer;