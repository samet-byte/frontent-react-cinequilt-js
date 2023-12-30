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
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import {Routes, Route} from 'react-router-dom';

import PersistLogin from "./components/PersistLogin";
import AllMetadatas from "./components/metadata/AllMetadatas";
import ProfileMetadata from "./components/metadata/ProfileMetadata";
import AddMetadata from "./components/metadata/AddMetadata";
import LocalDirect from "./components/local/LocalDirect";
import M3UList from "./components/local/M3UList";
import FilmBuff from "./components/FilmBuff";
import EditMetadata from "./components/metadata/EditMetadata";
import InstantSearch from "./components/composes/search/InstantSearch";
import Experimental from "./experimental/Experimental";
import ServiceUnavailable from "./components/auth/ServiceUnavailable";
import Constants from "./common/Constants";
import Paths from "./common/Paths";
import HandleKeyDown from "./components/HandleKeyDown";
import NavBar from "./components/composes/NavBar";
import { useLocation } from 'react-router-dom';
import Settings from "./components/Settings";
import BackgroundImage from "./components/BackgroundImage";
import About from "./components/composes/About";
import ResetPassword from "./components/auth/ResetPassword";

function NavBarConditional() {
    const nonNavBarRoutes = Paths.EXCLUDE_NAVBAR.map(route => `/${route}`);
    const { pathname } = useLocation();
    const showNavBar = !nonNavBarRoutes.includes(pathname);

    return showNavBar ? (
        <>
            <div className="navbar-content">
            <HandleKeyDown />
            <NavBar />
            </div>
            <BackgroundImage>
                {AllRoutes()}
            </BackgroundImage>
        </>
    ) : PublicRoutes();
}

function PublicRoutes() {
    return (
        <Routes>
        <Route path={Paths.HOME} element={<Layout/>}>
            {/* public routes */}
            <Route path={Paths.LOGIN} element={<Login/>}/>
            <Route path={Paths.REGISTER} element={<Register/>}/>
            <Route path={Paths.PASSWORD_FORGET} element={<ResetPassword/>}/>
            <Route path={Paths.LINK_PAGE} element={<LinkPage/>}/>
            <Route path={Paths.UNAUTHORIZED} element={<Unauthorized/>}/>
            <Route path={Paths.SERVICE_UNAVAILABLE} element={<ServiceUnavailable/>}/>
        </Route>
        </Routes>
    );
        }


function AllRoutes() {
    return <Routes>
        <Route path={Paths.HOME} element={<Layout/>}>

            <Route element={<PersistLogin/>}>

                <Route element={<RequireAuth
                    allowedRoles={[Constants.ROLES.User, Constants.ROLES.Manager, Constants.ROLES.Admin]}/>}>
                    <Route path={Paths.HOME} element={<Home/>}/>
                </Route>

                <Route element={<RequireAuth allowedRoles={[Constants.ROLES.Manager]}/>}>
                    <Route path={Paths.MANAGER} element={<Manager/>}/>
                </Route>


                <Route element={<RequireAuth allowedRoles={[Constants.ROLES.Admin]}/>}>
                    <Route path={Paths.ADMIN} element={<Admin/>}/>
                </Route>

                <Route element={<RequireAuth
                    allowedRoles={[Constants.ROLES.User, Constants.ROLES.Manager, Constants.ROLES.Admin]}/>}>
                    <Route exact path={`${Paths.METADATA_PROFILE}`} element={<ProfileMetadata/>}></Route>
                </Route>

                <Route element={<RequireAuth
                    allowedRoles={[Constants.ROLES.User, Constants.ROLES.Manager, Constants.ROLES.Admin]}/>}>
                    <Route exact path={`${Paths.METADATA_PROFILE_ID}`} element={<ProfileMetadata/>}></Route>
                </Route>

                <Route element={<RequireAuth
                    allowedRoles={[Constants.ROLES.User, Constants.ROLES.Manager, Constants.ROLES.Admin]}/>}>
                    <Route path={Paths.VIEW_METADATAS} element={<AllMetadatas/>}/>
                </Route>

                <Route element={<RequireAuth allowedRoles={[Constants.ROLES.Manager, Constants.ROLES.Admin]}/>}>
                    <Route path={Paths.ADD_METADATA} element={<AddMetadata/>}/>
                </Route>

                <Route element={<RequireAuth
                    allowedRoles={[Constants.ROLES.User, Constants.ROLES.Manager, Constants.ROLES.Admin]}/>}>
                    <Route path={Paths.LOCAL} element={<LocalDirect/>}/>
                </Route>

                <Route element={<RequireAuth
                    allowedRoles={[Constants.ROLES.User, Constants.ROLES.Manager, Constants.ROLES.Admin]}/>}>
                    <Route path={Paths.MY_STUFF} element={<M3UList/>}/>
                    {/*<Route path="/my-stuff/:endpoint" element={<M3UList />} />*/}
                </Route>

                <Route element={<RequireAuth
                    allowedRoles={[Constants.ROLES.User, Constants.ROLES.Manager, Constants.ROLES.Admin]}/>}>
                    <Route path={Paths.FILM_BUFF} element={<FilmBuff/>}/>
                </Route>

                <Route element={<RequireAuth allowedRoles={[Constants.ROLES.Admin]}/>}>
                    <Route path={`${Paths.EDIT_METADATA}${Paths.WITH.ID}`} element={<EditMetadata/>}/>
                </Route>

                <Route element={<RequireAuth allowedRoles={[Constants.ROLES.Admin, Constants.ROLES.Manager, Constants.ROLES.User]}/>}>
                    <Route path={Paths.SEARCH} element={<InstantSearch/>}/>
                </Route>

                <Route element={<RequireAuth allowedRoles={[Constants.ROLES.Admin]}/>}>
                    <Route path={Paths.EXPERIMENTAL} element={<Experimental/>}/>
                </Route>

                <Route element={<RequireAuth
                    allowedRoles={[Constants.ROLES.Admin, Constants.ROLES.User, Constants.ROLES.Manager]}/>}>
                    <Route path={Paths.SETTINGS} element={<Settings/>}/>
                </Route>



            </Route>
            {/* catch all */}
            <Route path={Paths.REST_OF_THE_PATH} element={<NotFound/>}/>
        </Route>
    </Routes>;
}

function App() {
    return (
        <>
            <NavBarConditional/>
        </>

    );
}

export default App;
