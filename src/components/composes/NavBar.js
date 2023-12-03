import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';

const NavBar = () => {
  const appName = "Movie Metadata App Demo";
  const w_h = 50;
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to the search page with the provided query
    // navigate(`/search/${encodeURIComponent(searchQuery)}`, { state: { searchQuery } });
  };

    useEffect(() => {
        // Check if responseText is set before navigating
        if (
            searchQuery !== null
            && searchQuery !== ''
            && searchQuery !== undefined
            && !searchQuery.includes("error")
        ) {
            // Now, you can navigate to the dashboard

            // navigate(`/search/${encodeURIComponent(searchQuery)}`, { state: { searchQuery } });
            setShowPopup(true);

        }
        // else if (
        //     searchQuery === '' &&
        //
        //     window.location.pathname.startsWith("/search/") &&
        //     !window.location.pathname.startsWith(`/search/${encodeURIComponent(searchQuery)}`)) {
        //     navigate(`/view-metadatas`);
        // }

    }, [navigate, searchQuery]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // Perform navigation logic here
            if (searchQuery === '') {
                navigate(`/view-metadatas`);
            }
            else {
                navigate(`/search/${encodeURIComponent(searchQuery)}`, { state: { searchQuery } });
            }

        }
    };

    // const handlePopupClose = () => {
    //     // Close the popup and navigate when it's closed
    //     setShowPopup(false);
    //     navigate(`/search/${encodeURIComponent(searchQuery)}`, { state: { searchQuery } });
    // };

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Add event listener to handle window resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array means this effect runs once after the initial render

    const navbarClass = `navbar navbar-dark bg-dark mb-5 ${windowWidth < 992 ? 'navbar-expand-md' : 'navbar-expand-lg'}`;


    return (

        <nav className={navbarClass}>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <Link className="navbar-brand" to={"/"}>
          <img src="https://sdk.bitmoji.com/render/panel/10227185-100025018093_7-s5-v1.png?transparent=1&palette=1&scale=2" width={w_h} height={w_h} className="d-inline-block align-top" alt="" loading="lazy"/>
        </Link>
        <Link className="navbar-brand" to={"/"}>{appName}</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to={"/view-metadatas"}>View All of 'em<span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/add-metadata"}>Add new Content</Link>
            </li>
            <li>
              <Link className="nav-link" to={"/local"}>Local Files</Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0" onSubmit={handleSearch}>
            <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="🔍 Search"
                aria-label="Search"
                value={searchQuery}
                onKeyPress={handleKeyPress}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/*<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>*/}
          </form>


            {/*/!* Popup *!/*/}
            {/*{showPopup && (*/}
            {/*    <div>*/}
            {/*        /!* List contents *!/*/}
            {/*        /!*<ul>*!/*/}
            {/*        /!*    /!* Map over titles and render list items *!/*!/*/}
            {/*        /!*    {titles.map((title, index) => (*!/*/}
            {/*        /!*        <li key={index}>{title}</li>*!/*/}
            {/*        /!*    ))}*!/*/}
            {/*        /!*</ul>*!/*/}

            {/*        /!* Close button or any other way to close the popup *!/*/}
            {/*        <button onClick={handlePopupClose}>Close</button>*/}
            {/*    </div>*/}
            {/*)}*/}


        </div>
      </nav>
  );
}

export default NavBar;







      {/*<li className="nav-item dropdown">*/}
      {/*  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
      {/*    Dropdown*/}
      {/*  </a>*/}
      {/*  <div className="dropdown-menu" aria-labelledby="navbarDropdown">*/}
      {/*    <Link className="dropdown-item" href="#">Add new Content Dropdown</Link>*/}
      {/*    <Link className="dropdown-item" href="#">Another action</Link>*/}
      {/*    <div className="dropdown-divider"></div>*/}
      {/*    <a className="dropdown-item" href="#">Something else here</a>*/}
      {/*  </div>*/}
      {/*</li>*/}
      {/*<li className="nav-item">*/}
      {/*  <a className="nav-link disabled" href="#">Disabled</a>*/}
      {/*</li>*/}
