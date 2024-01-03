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