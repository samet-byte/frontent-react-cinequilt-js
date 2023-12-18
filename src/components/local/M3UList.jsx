import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import ThumbnailComponent from '../ThumbnailComponent';
import Lottie from 'lottie-react';
import errorAnimation from '../../assets/lottie/errorLottie.json';
import {useParams} from "react-router-dom"; // Replace with the actual path to your Lottie animation JSON file


const M3UList = () => {
  // const {endpoint} = useParams();
  // if (endpoint === undefined || endpoint === null || endpoint === '') {
  // const  endpoint = localStorage.getItem('DLNA') || useParams() || '';


  let endpoint = localStorage.getItem('DLNA');
  const params = useParams();

  if (!endpoint) {
    endpoint = params ? params.endpoint : ''; // Adjust to match your actual parameter name
  }


  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const parseM3UPlaylist = (playlistString) => {

    console.log(playlistString)
    const lines = playlistString.split('\n');
    const playlistData = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith('#EXTINF')) {
        const info = line.split(',');
        const title = info[1];
        const url = lines[i + 1].trim();
        playlistData.push({ title, url });
      }
    }

    return playlistData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/${encodeURIComponent(endpoint)}`);
        // const response = fetch(`http://localhost:3001/${encodeURIComponent(endpoint)}`)
        //     .then(response => {
        //       console.log(response)
        //       response.json()
        //     })
        //     .then(data => console.log(data))
        //     .catch(error => console.error('Error:', error));
        // console.log(response.data)
        const parsedData = parseM3UPlaylist(response.data);
        setData(parsedData);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [endpoint]); // Re-run effect when endpoint changes

  if (error) {
    return (
        <div>
          <h3>Error: {error.message}</h3>
          <Lottie animationData={errorAnimation} height={100} width={100} />
        </div>
    );
  }

  const filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pastelColors = [
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
    // Add more pastel colors as needed
  ];

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setSearchTerm('');
    }
  };

  return (
      <div
          className="container text-center"
          style={{ fontSize: '20px' }}
          onKeyDown={handleKeyDown}
      >
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">M3U Playlist</h1>
            <input
                className="form-control text-center"
                type="text"
                placeholder="🔍 Search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
            />
            <br/>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
              {filteredData.map((item, index) => (
                  <div key={item.url} className="col mb-4" style={{ height: '100%' }}>
                    <div
                        className="card"
                        style={{
                          // backgroundColor: generateRandomColor(),
                          backgroundColor: pastelColors[index % pastelColors.length],
                          height: '50', // Set a fixed height for the card
                        }}
                    >
                      <div className="card-body">
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none', color: 'black' }}
                        >
                          <h5 className="card-title">{item.title}</h5>
                          {/*<video src={item.url} width="320" height="240" controls/>*/}
                        </a>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );



};

export default M3UList;