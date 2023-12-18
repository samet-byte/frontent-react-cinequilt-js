import { Link } from "react-router-dom"
import animationData from '../assets/notfd.json';
import Lottie from "lottie-react";
const Missing = () => {

    const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div className="center-item" style={{overflowX: "hidden"}}>
        <article style={{ padding: "100px" }}>
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <div className="flexGrow">
                <Link to="/">Visit Our Homepage</Link>
                <Lottie animationData={animationData} options={defaultOptions} height="50%" width="60%" />
            </div>
        </article>
        </div>
    )
}

export default Missing
