import { Link } from "react-router-dom";
import Users from './Users';
import AddMetadata from "./metadata/AddMetadata";

const Admin = () => {
    return (
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
    )
}

export default Admin
