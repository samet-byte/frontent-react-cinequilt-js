import { useNavigate } from "react-router-dom"
import useDocumentTitle from "../hooks/useDocumentTitle";

const Unauthorized = () => {

    useDocumentTitle('Unauthorized');
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <div className="center-item" style={{overflowX: "hidden"}}>
        <section>
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <p>Uh-oh! Looks like the page is playing hard to get, giving us the old digital cold shoulder. It's probably whispering secrets to its firewall, saying, "No entry without the secret handshake!" Meanwhile, our access credentials are out there practicing their stand-up comedy routine to charm their way in. Stay tuned for the unauthorized access comedy show – it's a real byte-sized performance! 🕵️‍♂️🚫🤖</p>
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
        </div>
    )
}

export default Unauthorized
