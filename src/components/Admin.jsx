import { Link } from "react-router-dom";
import Users from './Users';
import useDocumentTitle from "../hooks/useDocumentTitle";
import useUserStuff from "../hooks/useUserStuff";

const Admin = () => {

    const {userStuff} = useUserStuff();

    useDocumentTitle(`Admin (${userStuff?.username})`);
    return (
        <div className="centered-container">
        <section>

                <h1>Admins Page</h1>
                <br />
                <Users />

                <br />
                <div className="flexGrow">
                    <Link to="/add-metadata">Add Metadata</Link>
                </div>

                <br />
                <div className="flexGrow">
                    <Link to="/">Home</Link>
                </div>
        </section>
        </div>

    )
}

export default Admin
