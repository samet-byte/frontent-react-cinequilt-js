
import React from 'react';
import App from './App';

import './index.css';
import {AuthProvider} from "./context/AuthProvider";

import {BrowserRouter, Routes, Route} from "react-router-dom";


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import ReactDOM from 'react-dom';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/*" element={<App/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);



// import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'react-toastify/dist/ReactToastify.css';
// import 'react-lazy-load-image-component/src/effects/blur.css';
// import 'react-lazy-load-image-component/src/effects/black-and-white.css';
// 👇️ IMPORTANT: use correct ID of your root element
// this is the ID of the div in your index.html file
// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);

// 👇️ if you use TypeScript, add non-null (!) assertion operator
// const root = createRoot(rootElement!);

// root.render(
//     <StrictMode>
//         <BrowserRouter>
//             <AuthProvider>
//                 <Routes>
//                     <Route path="/*" element={<App/>}/>
//                 </Routes>
//             </AuthProvider>
//         </BrowserRouter>
//     </StrictMode>,
// );

