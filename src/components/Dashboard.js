// Author: sametbayat
// Dec 02, 2023 3:00 PM


import { Link } from "react-router-dom";
import Users from './Users';
import AllMetadatas from "./metadata/AllMetadatas";

const Dashboard = () => {
    return (
        <section>
            <h1>Admins Page</h1>
            <br />
            <AllMetadatas />
            <br />
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Dashboard
