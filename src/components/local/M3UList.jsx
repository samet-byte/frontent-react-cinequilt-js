import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import errorAnimation from '../../assets/anim/errorLottie.json';
import {useNavigate, useParams} from 'react-router-dom';
import Constants from '../../common/Constants';
import './Local.css'
import useDocumentTitle from "../../hooks/useDocumentTitle";
const M3UList = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('bgImage') !== Constants.COMMON_BACKGROUND_URL) {
      localStorage.setItem('bgImage', Constants.COMMON_BACKGROUND_URL);
      navigate(0)
    }
  }, []);

  let endpoint = localStorage.getItem('DLNA');
  const params = useParams();

  if (!endpoint) {
    endpoint = params ? params.endpoint : '';
  }

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
    useDocumentTitle(`MyStuff ${data.length>0 ? `(${data.length})`:''}`)

  const parseM3UPlaylist = (playlistString) => {

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
        const parsedData = parseM3UPlaylist(response.data);
        setData(parsedData);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [endpoint]);

  if (error) {
    return (
        <div>
          <h3>Error: {error.message}</h3>
          <Lottie animationData={errorAnimation} height={100} width={100} />
        </div>
    );
  }

  const handleItemClick = (item) => {
    // setSelectedItem(item);
  };

  const filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <br />
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
              {filteredData.map((item, index) => (
                  <div
                      key={item.url}
                      className="col mb-4 hover-zoom"
                      style={{ height: '100%' }}
                      onClick={() => handleItemClick(item)}
                  >
                    <div
                        className="card"
                        style={{
                          backgroundColor:
                              Constants.PASTEL_COLORS[index % Constants.PASTEL_COLORS.length],
                          height: '50',
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
