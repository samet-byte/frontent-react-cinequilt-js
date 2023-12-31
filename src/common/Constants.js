// Author: sametbayat
// Dec 04, 2023 9:16 PM

/**
 *
 * @LS_ : LOCAL STORAGE
 *
 */


const Constants = {
    APP_NAME: 'CineQuilt',
    APP_ICON_URL: "https://sdk.bitmoji.com/render/panel/10227185-100025018093_7-s5-v1.png?transparent=1&palette=1&scale=2",
    // apiUrl: 'https://api.example.com',
    // posterBaseUrl: 'https://posters.example.com',
    // COMMON_BACKGROUND_URL: 'https://images.pexels.com/photos/6985001/pexels-photo-6985001.jpeg',
    COMMON_BACKGROUND_URL: 'https://img.freepik.com/free-vector/vibrant-summer-ombre-background-vector_53876-105765.jpg?w=2000&t=st=1704024431~exp=1704025031~hmac=406628cbfa45d2cf2a58d42a32df797c470f11fb87b1d2937cdf85d96b32806f',
    // COMMON_BACKGROUND_URL: 'https://sametb.com/quilt_up/17.png',
    POSTER_PLACEHOLDER_URL: 'https://sdk.bitmoji.com/me/sticker/j78cRDYobOkbHKwnQQDlnCATyVeig0bGqzyNqTVZDdcLtj9hn4hRcg/10227185.png?p=dD1zO2w9ZW4.v1&size=thumbnail',

    //INSTANT SEARCH
    INSTANT_SEARCH_GRID_COL: 2,
    LS_INSTANT_SEARCH_QUERY: 'searchQueryInstant',

    // FILM BUFF
    GPT_API: '',
    NOT_AVAILABLE_COUNTRIES: ["ir", "nk"],
    CONTENT_TYPES_MAP: {
        'TV_SHOW': 'TV Show',
        'MOVIE': 'Movie',
        // 'FILM_SERIES': 'Film Series'
    },


    ROLES: {
        'User': 'ROLE_USER',
        'Manager': 'ROLE_MANAGER',
        'Admin': 'ROLE_ADMIN'
    },


    // COUNTRY CODES

    COUNTRIES: [
        { value: 'tr', label: '🇹🇷 Turkey' },
        { value: 'us', label: '🇺🇸 United States' },
        { value: 'ca', label: '🇨🇦 Canada' },
        { value: 'gb', label: '🇬🇧 United Kingdom' },
        { value: 'au', label: '🇦🇺 Australia' },
        { value: 'de', label: '🇩🇪 Germany' },
        { value: 'fr', label: '🇫🇷 France' },
        { value: 'jp', label: '🇯🇵 Japan' },
        { value: 'in', label: '🇮🇳 India' },
        { value: 'br', label: '🇧🇷 Brazil' },
        { value: 'mx', label: '🇲🇽 Mexico' },
        { value: 'cn', label: '🇨🇳 China' },
        { value: 'ru', label: '🇷🇺 Russia' },
        { value: 'za', label: '🇿🇦 South Africa' },
        { value: 'kr', label: '🇰🇷 South Korea' },
        { value: 'se', label: '🇸🇪 Sweden' },
        { value: 'es', label: '🇪🇸 Spain' },
        { value: 'it', label: '🇮🇹 Italy' },
        { value: 'nl', label: '🇳🇱 Netherlands' },
        { value: 'pl', label: '🇵🇱 Poland' },
        { value: 'ir', label: '🇮🇷 Iran' },
        { value: 'nk', label: '🇰🇵 North Korea' },
    ],

    SERVICE_UNAVAILABLE: [
        'ir',
        'nk',
    ],


    PASTEL_COLORS: [
        '#FFD1DC', // pastel pink
        '#FFECB3', // pastel yellow
        '#B2DFDB', // pastel green
        '#C9D6EA', // pastel blue
        '#FFD180', // pastel orange
        '#FFB6C1', // pastel pink (lighter shade)
        '#FFFACD', // pastel yellow (lighter shade)
        '#98FB98', // pastel green (lighter shade)
        '#ADD8E6', // pastel blue (lighter shade)
        '#FFCC80', // pastel orange (lighter shade)
        '#FF69B4', // pastel pink (darker shade)
        '#FFD700', // pastel yellow (darker shade)
        '#32CD32', // pastel green (darker shade)
        '#87CEEB', // pastel blue (darker shade)
        '#FF8C00', // pastel orange (darker shade)
    ],
};



export default Constants;


