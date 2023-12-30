import loadingDot from "../../assets/anim/loading_dot.json";
import loadingFly from "../../assets/anim/loading_fly.json";
import loadingW   from "../../assets/anim/loading_w.json";
import loadingM1 from "../../assets/anim/movie_1.json";
import loadingM2 from "../../assets/anim/movie_2.json";
import loadingHeart from "../../assets/anim/loading_heart.json";
import empty from "../../assets/anim/empty.json";

import Lottie from "lottie-react";
const Loading = ({ anim, tiny, header, footer }) => {

    const w = tiny === true ? 20 : 50;

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
        case "heart":
            animationData = loadingHeart;
            break;
            case "empty":
            animationData = empty;
            break;
        default:
            animationData = loadingDot;
            break;
    }

    return (
        <div className="center-item" style={{overflowX: "hidden"}} >
            <article
                className="center-item"
                style={tiny === true ? null : { padding: "100px" }}
            >
                {header ? header : null}
                <div className="flexGrow">
                    <Lottie
                        className={'center-item'}
                        animationData={animationData}
                        options={defaultOptions}
                        style={tiny !== true ? null : { width: `${w}%`, height: `${w}%` }}
                    />
                </div>
                {footer ? footer : null}
            </article>
        </div>
    )
}

export default Loading

