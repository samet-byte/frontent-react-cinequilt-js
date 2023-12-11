import { Link } from "react-router-dom";
import Users from './Users';

const Admin = () => {
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
