![
0
](<ss/Screenshot 2023-12-31 at 5.59.46 PM.png>)
![
1
](<ss/Screenshot 2023-12-31 at 6.04.16 PM.png>)  ![
4
](<ss/Screenshot 2024-01-02 at 11.03.43 PM.png>) ![
5
](<ss/Screenshot 2024-01-02 at 11.04.41 PM.png>) ![
6
](<ss/Screenshot 2024-01-02 at 11.05.04 PM.png>) ![
7
](<ss/Screenshot 2024-01-02 at 11.05.58 PM.png>) ![
8
](<ss/Screenshot 2024-01-02 at 11.07.08 PM.png>) ![
9
](<ss/Screenshot 2024-01-02 at 11.08.28 PM.png>)
![
10
](<ss/Screenshot 2024-01-02 at 11.09.00 PM.png>) ![
11
](<ss/Screenshot 2024-01-02 at 11.09.12 PM.png>) ![
12
](<ss/Screenshot 2024-01-02 at 11.09.21 PM.png>) ![
13
](<ss/Screenshot 2024-01-02 at 11.11.29 PM.png>) ![
14
](<ss/Screenshot 2024-01-02 at 11.14.20 PM.png>) ![
15
](<ss/Screenshot 2024-01-02 at 11.22.27 PM.png>) ![
16
](<ss/Screenshot 2024-01-02 at 11.24.10 PM.png>) ![
17
](<ss/Screenshot 2024-01-02 at 11.33.40 PM.png>) ![
18
](<ss/Screenshot 2024-01-02 at 11.33.53 PM.png>) ![
19
](<ss/Screenshot 2024-01-02 at 11.34.06 PM.png>) ![
20
](<CleanShot 2024-01-03 at 4 .37.03@2x-1.png>)  ![
2
](<ss/Screenshot 2023-12-31 at 6.27.41 PM.png>)


# Getting Started: CineQuilt React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm start-server`

Runs the server that allows CORS requests from the React app.

## Code Overview

### `src/App.js`

This is the main React component that renders the entire app. It contains the `Router` component that handles routing to different pages.

### `src/components/`

This folder contains all the React components that are used in the app.

### `src/video/`

This folder contains the video properties that are used in the app.

### `src/hooks/`

This folder contains the custom hooks that are used in the app. 
They let you use state and other React features without writing a class.


### Sample Code Blocks


#### `src/components/MovieCard.js`
``` jsx
<MovieCard
    title={metadata.title?.trim()}
    posterUrl={metadata.posterUrl}
    releaseYear={metadata.releaseYear}
    mediaType={metadata.type}
    linkTo={`${Paths.METADATA_PROFILE}/${metadata.metadataId}`}
/>
```

#### `src/video`
``` jsx
    {/*< usage of Video Components */}
    <VideoEmbed embedUrl={episode.videoUrl} /> :
    <CustomPlayer metadata={episode} />
```

#### `src/components/App.js`
``` jsx
    {/* Background image listens useBgImage.js hook.*/}

    <BackgroundImage> 
        ...
        
        <Route element={<RequireAuth allowedRoles={[Constants.ROLES.Admin]}/>}>
            <Route path={Paths.ADMIN} element={<Admin/>}/>
        </Route>

        <Route element={<RequireAuth
            allowedRoles={[Constants.ROLES.User, Constants.ROLES.Manager, Constants.ROLES.Admin]}/>}>
            <Route path={Paths.VIEW_METADATAS} element={<AllMetadatas/>}/>
        </Route>
        ...
    </BackgroundImage>
```

#### `src/hooks/useAuth.js`
``` jsx
    const {auth} = useAuth();
    ...
    // While sending Bearer token to the server
    const authHeader = auth ? {Authorization: `Bearer ${auth.token}`} : {};
```

#### `src/components/RequireAuth.jsx`
``` jsx
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.accessToken //changed from user to accessToken to persist login after refresh
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;
```


#### `src/api/axios.js`
> **Warning:** The proxy set in package.json is used to redirect requests to the server.
> ``` json
>/// package.json     
>"proxy": "http://localhost:8080", ...
> ```

``` jsx
import axios from 'axios';

const BASE_URL = '/api/v1';

export default axios.create({
    baseURL: '/api/v1'
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
```


#### `src/server.js`
> **Warning:**  `:/endpoint` allows any request to be made to the server for development purposes. This is not secure and shall be changed on production. 
``` jsx
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

app.get(`/:endpoint`, async (req, res) => {
  try {
    const endpoint = req.params.endpoint;
    const response = await axios.get(`${endpoint}`);
    const data = response.data;
    console.log(data)
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    res.status(403).json({ error: 'Forbidden' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```