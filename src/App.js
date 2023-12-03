// Author: sametbayat
// Dec 01, 2023 5:16 PM

import './App.css';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import Home from './components/Home';
import Layout from './components/Layout';
import Manager from './components/Manager';
import Admin from './components/Admin';
import NotFound from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import {Routes, Route, useNavigate} from 'react-router-dom';

import PersistLogin from "./components/PersistLogin";
import AllMetadatas from "./components/metadata/AllMetadatas";
import ProfileMetadata from "./components/metadata/ProfileMetadata";
import AddMetadata from "./components/metadata/AddMetadata";
import LocalDirect from "./components/local/LocalDirect";
import M3UList from "./components/local/M3UList";
import FilmBuff from "./components/FilmBuff";
import EditMetadata from "./components/metadata/EditMetadata";
import NavBar from "./components/composes/NavBar";
import MetadataSearch from "./components/composes/MetadataSearch";


const ROLES = {
    'User': 'ROLE_USER',
    'Manager': 'ROLE_MANAGER',
    'Admin': 'ROLE_ADMIN'
}

const NavBarConditional = () => {
    // Use the useNavigate hook to get access to the navigate function
    const navigate = useNavigate();

    // List of routes where the NavBar should not be displayed
    const nonNavBarRoutes = ['/login', '/signup', '/giris', '/kaydol', '/register'];

    // Get the current route path
    const currentPath = window.location.pathname;

    // Check if the current route is in the list of non-NavBar routes
    const showNavBar = !nonNavBarRoutes.includes(currentPath);

    // Render NavBar only if showNavBar is true
    return showNavBar ? (
        <>
            <NavBar />
            <MetadataSearch />
        </>
    ) : null;

};




function App() {
    return (
        <main>

            <NavBarConditional />
            {/*<MetadataSearch/>*/}

        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public routes */}
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="linkpage" element={<LinkPage />} />
                <Route path="unauthorized" element={<Unauthorized />} />


                {/* we want to protect these routes */}
                <Route element={<PersistLogin/>}>

                    <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Manager, ROLES.Admin]} />}>
                        <Route path="/" element={<Home />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[ROLES.Manager]} />}>
                        <Route path="editor" element={<Manager />} />
                    </Route>


                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                        <Route path="admin" element={<Admin />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                        <Route path="lounge" element={<Lounge />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Manager, ROLES.Admin]} />}>
                        <Route exact path="/metadata-profile/:title" element={<ProfileMetadata />}></Route>
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Manager, ROLES.Admin]} />}>
                        <Route path="view-metadatas" element={<AllMetadatas />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                        <Route path="/add-metadata" element={<AddMetadata />} />
                    </Route>


                    <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Manager, ROLES.Admin]} />}>
                        <Route path="/local" element={<LocalDirect />} />
                    </Route>


                    <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Manager, ROLES.Admin]} />}>
                        <Route path="/my-stuff" element={<M3UList />} />
                        {/*<Route path="/my-stuff/:endpoint" element={<M3UList />} />*/}
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Manager, ROLES.Admin]} />}>
                        <Route path="/filmbuff" element={<FilmBuff />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                        <Route path="/edit-metadata/:id" element={<EditMetadata />} />
                    </Route>







                </Route>
                {/* catch all */}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
        </main>
    );
}

export default App;
