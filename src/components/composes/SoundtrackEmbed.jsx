import React from 'react';

const SoundtrackEmbed = ({ soundtrackLink }) => {

    if (soundtrackLink == null) return;
    // Regular expressions for Spotify and Deezer
    const spotifyRegex = /^https:\/\/open\.spotify\.com\/(track|playlist|album|podcast)\/(\w+)$/i;
    const deezerRegex = /^https:\/\/www\.deezer\.com\/(us|tr|en)?\/(track|playlist|album|podcast)\/(\d+)$/i;



    // Function to extract the contentType and ID from the end of the URL
    const extractContentInfo = (link) => {
        const parts = link.split('/');
        const id = parts.pop();
        const contentType = parts.pop();
        return { contentType, id };
    };

    // Function to generate the embed link based on the platform and content type
    const getEmbedLink = (link) => {
        const matchSpotify = link.match(spotifyRegex);
        const matchDeezer = link.match(deezerRegex);

        if (matchSpotify) {
            //   const contentType = matchSpotify[1];
            //   const id = matchSpotify[2];
            const { contentType, id } = extractContentInfo(link);

            // Spotify embed link format

            return (
                <iframe
                    title="Spotify Playlist"
                    style={{ borderRadius: '12px' }}
                    src={`https://open.spotify.com/embed/${contentType}/${id}`}
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                ></iframe>
            );


        } else if (matchDeezer) {
            const { contentType, id } = extractContentInfo(link);


            // Deezer embed link format
            return (
                <iframe
                    title="deezer-widget"
                    src={`https://widget.deezer.com/widget/dark/${contentType}/${id}`}
                    width="100%"
                    height="300"
                    frameBorder="0"
                    allowTransparency="true"
                    allow="encrypted-media;
            clipboard-write"
                >
                </iframe>
            );


        } else {
            // Unsupported platform
            // return 'Unsupported platform';
            return null;
        }
    };

    // Get the embed link based on the provided soundtrack link
    const embedLink = getEmbedLink(soundtrackLink);

    // Render the embedded player or error message
    return (
        <div>
            <h5>{embedLink}</h5>
            {/* {embedLink !== 'Unsupported platform' ? (
        <iframe
          title="Soundtrack Embed"
          width="700"
          height="350"
          src={embedLink}
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
          clipboard-write="true"
        ></iframe>
      ) : (
        <p>{embedLink}</p>
      )} */}
        </div>
    );
};

export default SoundtrackEmbed;
