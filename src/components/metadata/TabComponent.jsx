// Author: sametbayat
// Dec 14, 2023 12:19 AM



import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function TabComponent() {
    return (
        <Tabs
            defaultActiveKey="profile"
            id="justify-tab-example"
            className="mb-3"
            justify
        >
            <Tab eventKey="home" title="Home">
                Tab content for Home
            </Tab>
            <Tab eventKey="profile" title="Profile">
                Tab content for Profile
            </Tab>
            <Tab eventKey="longer-tab" title="Loooonger Tab">
                Tab content for Loooonger Tab
            </Tab>
            <Tab eventKey="contact" title="Contact" disabled>
                Tab content for Contact
            </Tab>
        </Tabs>
    );
}

export default TabComponent();


// import React, { useState } from 'react';
//
// const TabComponent = ({ seasons }) => {
//     const [activeTab, setActiveTab] = useState(1);
//
//     const handleTabClick = (seasonNumber) => {
//         setActiveTab(seasonNumber);
//     };
//
//     return (
//         <div>
//             <nav>
//                 <div className="nav nav-tabs" id="nav-tab" role="tablist">
//                     {seasons.map((season, index) => (
//                         <button
//                             key={index}
//                             className={`nav-link ${activeTab === index + 1 ? 'active' : ''}`}
//                             id={`nav-season-${index + 1}-tab`}
//                             data-bs-toggle="tab"
//                             data-bs-target={`#nav-season-${index + 1}`}
//                             type="button"
//                             role="tab"
//                             aria-controls={`nav-season-${index + 1}`}
//                             aria-selected={activeTab === index + 1}
//                             onClick={() => handleTabClick(index + 1)}
//                         >
//                             Season {index + 1}
//                         </button>
//                     ))}
//                 </div>
//             </nav>
//
//             <div className="tab-content" id="nav-tabContent">
//                 {seasons.map((season, index) => (
//                     <div
//                         key={index}
//                         className={`tab-pane fade ${activeTab === index + 1 ? 'show active' : ''}`}
//                         id={`nav-season-${index + 1}`}
//                         role="tabpanel"
//                         aria-labelledby={`nav-season-${index + 1}-tab`}
//                     >
//                         <ul>
//                             {season.map((episode) => (
//                                 <li key={episode.id}>
//                                     <strong>{episode.title}</strong> - {episode.description}
//                                     <br />
//                                     <a href={episode.videoUrl} target="_blank" rel="noopener noreferrer">
//                                         Watch Episode
//                                     </a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default TabComponent;
