import { Link } from "react-router-dom"
import animationData from '../assets/anim/notfd.json';
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
                <Link to="/">
        <div style={{minWidth: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Lottie Animation */}
            <Lottie
                animationData={animationData}
                options={defaultOptions}
                height="auto"
                width="100%"
            />

            {/* Content */}
            {/*<div style={{ position: 'absolute', textAlign: 'center', color: 'white' }}>*/}
            {/*    <h1>Oops!</h1>*/}
            {/*    <p>Page Not Found</p>*/}
            {/*</div>*/}
        </div>
        </Link>
    );
};

export default Missing
