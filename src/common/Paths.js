// Author: sametbayat
// Dec 20, 2023 7:50 PM

const Paths = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    PASSWORD_FORGET: '/reset',
    PROFILE: '/profile',
    ADMIN: '/admin',
    VIEW_METADATAS: '/all',
    LOCAL: '/local',
    SEARCH: '/search',
    FILM_BUFF: '/filmbuff',
    ADD_METADATA: '/add-metadata',
    EXPERIMENTAL: '/x',
    SETTINGS: '/settings',
    MANAGER: '/m',
    SIGN_UP: '/signup',
    SIGN_IN: '/signin',
    SIGN_OUT: '/signout',
    PASSWORD_CHANGE: '/pw-change',
    KAYDOL: '/kaydol',
    GIRIS: '/giris',
    SERVICE_UNAVAILABLE: '/service-unavailable',
    UNAUTHORIZED: '/unauthorized',
    LINK_PAGE: '/linkpage',
    MY_STUFF: '/my-stuff',
    REST_OF_THE_PATH: '*',

    METADATA_PROFILE: '/metadata',
    METADATA_PROFILE_ID: `/metadata/:id`,
    METADATA_PROFILE_TITLE: `/metadata/:title`,

    TV_SHOW: '/tv',
    EDIT_METADATA: '/edit-metadata',

    EXCLUDE_NAVBAR: [
        'login',
        'register',
        'reset',
        '/reset',
        '/reset/',
        'linkpage',
        'unauthorized',
        'service-unavailable',
        'signup',
        'signin',
        'pw-forget',
        'pw-change',
        'kaydol',
        'giris',
        '/login',
        '/login/',
        '/register',
        '/register/',
        '/linkpage',
        '/linkpage/',
        '/unauthorized',
        '/service-unavailable',
        '/signup',
        '/signin',
        '/pw-forget',
        '/pw-change',
        '/kaydol',
        '/giris'
    ],

    WITH: {
        TITLE: '/:title',
        SEASON: '/:season',
        EPISODE: '/:episode',
        ENDPOINT: '/:endpoint',
        ID: '/:id',
        NAME: '/:name',
        YEAR: '/:year',
        GENRE: '/:genre',
        TYPE: '/:type',
        PAGE: '/:page',
        QUERY: '/:query',

    },
        ABOUT: '/about'


}

export default Paths;