import { Link } from "react-router-dom"
import Paths from "../common/Paths";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Manager = () => {

    useDocumentTitle('Editors Page');
    return (
        <section>
            <h1>Editors Page</h1>
            <br />
            <p>You must have been assigned an Editor role.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
                <Link to={{pathname: `${Paths.ADD_METADATA}`}}>Add Content</Link>
            </div>
        </section>
    )
}

export default Manager
