import loadingDot from "../../assets/anim/loading_dot.json";
import loadingFly from "../../assets/anim/loading_fly.json";
import loadingW   from "../../assets/anim/loading_w.json";
import loadingM1 from "../../assets/anim/movie_1.json";
import loadingM2 from "../../assets/anim/movie_2.json";

import Lottie from "lottie-react";
const Loading = ({ anim }) => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    let animationData;

    switch (anim) {
        case "dot":
            animationData = loadingDot;
            break;
        case "fly":
            animationData = loadingFly;
            break;
        case "w":
            animationData = loadingW;
            break;
        case "m1":
            animationData = loadingM1;
            break;
        case "m2":
            animationData = loadingM2;
            break;
        default:
            animationData = loadingDot;
            break;
    }

    return (
        <div className="center-item" style={{overflowX: "hidden"}}>
            <article style={{ padding: "100px" }}>
                <div className="flexGrow">
                    <Lottie animationData={animationData} options={defaultOptions} height="50%" width="60%" />
                </div>
            </article>
        </div>
    )
}

export default Loading
