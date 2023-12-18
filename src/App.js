// Author: sametbayat
// Dec 01, 2023 5:16 PM

import './App.css';
import './custom.css';
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
import InstantSearch from "./components/composes/search/InstantSearch";
import Experimental from "./experimental/Experimental";
import ServiceUnavailable from "./components/auth/ServiceUnavailable";
import HandleKeyDown from "./components/HandleKeyDown";
import Constants from "./common/Constants";


const NavBarConditional = () => {
    // Use the useNavigate hook to get access to the navigate function
    const navigate = useNavigate();

    // List of routes where the NavBar should not be displayed
    const nonNavBarRoutes = ['/login', '/signup', '/giris', '/kaydol', '/register', '/login/', '/service-unavailable', '/unauthorized', '/linkpage', '/linkpage/'];

    // Get the current route path
    const currentPath = window.location.pathname;

    // Check if the current route is in the list of non-NavBar routes
    const showNavBar = !nonNavBarRoutes.includes(currentPath);
    // const showNavBar = !nonNavBarRoutes.every((route) => !route.startsWith(currentPath));


    // Render NavBar only if showNavBar is true
    return showNavBar ? (
        <>
            <NavBar />
        </>
    ) : null;

};


function App() {
    return (
        <>
        <HandleKeyDown/>
        <NavBarConditional />

        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public routes */}
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="linkpage" element={<LinkPage />} />
                <Route path="unauthorized" element={<Unauthorized />} />
                <Route path="service-unavailable" element={<ServiceUnavailable />} />


                <Route element={<PersistLogin/>}>

                    <Route element={<RequireAuth allowedRoles={[Constants.ROLES.User, Constants.ROLES.Manager, Constants.ROLES.Admin]} />}>
                        <Route path="/" element={<Home />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[Constants.ROLES.Manager]} />}>
                        <Route path="editor" element={<Manager />} />
                    </Route>


                    <Route element={<RequireAuth allowedRoles={[Constants.ROLES.Admin]} />}>
                        <Route path="admin" element={<Admin />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[Constants.ROLES.Manager, Constants.ROLES.Admin]} />}>
                        <Route path="lounge" element={<Lounge />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[Constants.ROLES.User, Constants.ROLES.Manager, Constants.ROLES.Admin]} />}>
                        <Route exact path="/metadata-profile/:title" element={<ProfileMetadata />}></Route>
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[Constants.ROLES.User, Constants.ROLES.Manager, Constants.ROLES.Admin]} />}>
                        <Route exact path="/tv/:title" element={<ProfileMetadata />}></Route>
                        {/*<Route exact path="/tv/:title/:season/:episode" element={<ProfileEpisode />}></Route>*/}
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[Constants.ROLES.User, Constants.ROLES.Manager, Constants.ROLES.Admin]} />}>
                        <Route path="view-metadatas" element={<AllMetadatas />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[Constants.ROLES.Manager, Constants.ROLES.Admin]} />}>
                        <Route path="/add-metadata" element={<AddMetadata />} />
                    </Route>


                    <Route element={<RequireAuth allowedRoles={[Constants.ROLES.User, Constants.ROLES.Manager, Constants.ROLES.Admin]} />}>
                        <Route path="/local" element={<LocalDirect />} />
                    </Route>


                    <Route element={<RequireAuth allowedRoles={[Constants.ROLES.User, Constants.ROLES.Manager, Constants.ROLES.Admin]} />}>
                        <Route path="/my-stuff" element={<M3UList />} />
                        {/*<Route path="/my-stuff/:endpoint" element={<M3UList />} />*/}
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[Constants.ROLES.User, Constants.ROLES.Manager, Constants.ROLES.Admin]} />}>
                        <Route path="/filmbuff" element={<FilmBuff />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[Constants.ROLES.Admin]} />}>
                        <Route path="/edit-metadata/:id" element={<EditMetadata />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[Constants.ROLES.Admin]} />}>
                        <Route path="/search" element={<InstantSearch />} />
                    </Route>



                    <Route element={<RequireAuth allowedRoles={[Constants.ROLES.Admin]} />}>
                        <Route path="/x" element={<Experimental />} />
                    </Route>

                </Route>
                {/* catch all */}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
        </>
        //todo: </main>
    );
}

export default App;
