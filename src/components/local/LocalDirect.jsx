// Import necessary dependencies
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Constants from "../../common/Constants";

const LocalDirect = () => {

    useEffect(() => {
        if (localStorage.getItem('bgImage') !== Constants.COMMON_BACKGROUND_URL) {
            localStorage.setItem('bgImage', Constants.COMMON_BACKGROUND_URL);
            navigate(0)
        }
    }, []);

    const [endpoint, setEndpoint] = useState(localStorage.getItem('endpoint') || '');
    const navigate = useNavigate();

    let cEndpoint = endpoint.trim();


    const handleNavigate = () => {
        if (cEndpoint === '') {
            alert('Please enter a valid endpoint')
            return;
        }
        else if (cEndpoint.startsWith('10.')){
            cEndpoint = `http://${cEndpoint}/playlist.m3u`
            // cEndpoint = `http://${cEndpoint}/playlist.m3u`
        }
        else if (cEndpoint.length < 10 ){
            cEndpoint = `http://192.168.1.${cEndpoint}/playlist.m3u`;
        }
        else if (cEndpoint.length > 9  && cEndpoint.length < 19){
            cEndpoint = `http://${cEndpoint}/playlist.m3u`;
        }
        else if (cEndpoint.length > 18){
            cEndpoint = `${cEndpoint}/playlist.m3u`;
        }

        localStorage.setItem('DLNA', cEndpoint)
        navigate(`/my-stuff`);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'cursive' }}>
            <h1 style={{ color: '#4CAF50' }}>Wanna wrap yourself<br/> with your own quilt?</h1>
            {/*<p style={{ fontSize: '1.2em', margin: '20px 0' }}>*/}
            {/*    Explore the magic of your local content by entering the enchanting endpoint below:*/}
            {/*</p>*/}
            <p>
                Valid Endpoints:
                <br />
                <span style={{ fontSize: '1.2em' }}>192.168.1.X:xxxx</span>
                <br />
                <span style={{ fontSize: '1.2em' }}>X:xxxx</span>
                <br />
                <span style={{ fontSize: '1.2em' }}>http://10.X.X.X:xxxx</span>
            </p>
            <label style={{ fontSize: '1.2em' }}>
                Endpoint
                <br/>
                <input
                    type="text"
                    value={endpoint}
                    onChange={(e) => {
                        setEndpoint(e.target.value)
                        localStorage.setItem('endpoint', e.target.value)
                    }}
                    style={{ marginLeft: '10px', padding: '5px' }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleNavigate();
                        }
                    }}
                />
            </label>
            <br />
            <button
                onClick={handleNavigate}
                style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '10px 20px',
                    fontSize: '1.2em',
                    marginTop: '20px',
                    cursor: 'pointer',
                    border: 'none',
                    borderRadius: '5px',
                }}
            >
                Embark on the Journey to M3UList
            </button>
        </div>
    );
};

export default LocalDirect;
