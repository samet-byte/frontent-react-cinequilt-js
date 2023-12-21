// Author: sametbayat
// Dec 20, 2023 10:09 PM


import Paths from "../common/Paths";
import HandleKeyDown from "./HandleKeyDown";
import NavBar from "./composes/NavBar";

export const NavBarConditional = () => {
    const nonNavBarRoutes = Paths.EXCLUDE_NAVBAR;
    const currentPath = window.location.pathname;
    const showNavBar = !nonNavBarRoutes.includes(currentPath);
    // const showNavBar = !nonNavBarRoutes.every((route) => !route.startsWith(currentPath));
    return showNavBar ? (
        <>
            <HandleKeyDown />
            <NavBar />
        </>
    ) : null;
};