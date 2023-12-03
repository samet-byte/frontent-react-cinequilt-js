// import React, {useEffect, useState} from 'react'
// import axios from 'axios';
// import {FaTrashAlt, FaEdit, FaEye} from "react-icons/fa";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import image1 from '../../assets/advertisement/add_1.jpg';
import image2 from '../../assets/advertisement/add_2.jpg';
import image3 from '../../assets/advertisement/add_3.jpg';
import image4 from '../../assets/advertisement/add_4.jpg';
import image5 from '../../assets/advertisement/add_5.webp';
import image6 from '../../assets/advertisement/add_6.jpeg';
import image7 from '../../assets/advertisement/add_7.webp';
import image8 from '../../assets/advertisement/add_8.webp';
import image9 from '../../assets/advertisement/add_9.webp';
import image10 from '../../assets/advertisement/add_10.webp';
import image11 from '../../assets/advertisement/add_11.webp';
import image12 from '../../assets/advertisement/add_12.jpeg';
import image13 from '../../assets/advertisement/add_13.webp';
import image14 from '../../assets/advertisement/add_14.webp';
import image15 from '../../assets/advertisement/add_15.webp';
import image16 from '../../assets/advertisement/add_16.webp';


import {
	// Link, useNavigate,
	useParams
} from 'react-router-dom';
import EditRow from '../composes/EditRow';
import OtherPlayer from '../video/OtherPlayer';

import VideoEmbed from "../video/VideoEmbed";
import VideoPlayer from "../video/VideoPlayer";
import trvtt from '../video/tr.vtt?url'
import envtt from '../video/en.vtt?url'
import SoundtrackEmbed from '../composes/SoundtrackEmbed';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


function showEditRowIfAvailable(url, desc) {
	return <>
		{
			url != null &&
			url.trim() > 5 &&
			 (
				<EditRow metadata={url}
						 contentString={desc}/>
			)
		}
	</>;
}

const ProfileMetadata = () => {

    // let navigate = useNavigate();
	const { id } = useParams();
	const { title } = useParams();

	const navigate = useNavigate();
	const location = useLocation();
	const axiosPrivate = useAxiosPrivate();

	const[metadata, setmetadata] = useState({
        title : '',
        director : '',
        releaseYear : 0,
        duration : '',
		posterUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/07/The_Horse_in_Motion-anim.gif',
		videoUrl: null,
		trailerUrl: null,
		soundtrackUrl: null
	});

	// useEffect(() => {
	// 	loadmetadata();
	// }, []);
	//
	// const loadmetadata = async () => {
	// 	const result = await axios.get(
	// 		// `http://localhost:9192/metadatas/metadata/${id}`
	// 		`http://localhost:9192/metadatas/metadata/title/${title}`
	// 	);
	// 	setmetadata(result.data);
	// };

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getInfo = async () => {
			try {
				const response = await axiosPrivate.get(`/metadatas/title/single/${title}`, {
					signal: controller.signal
				});
				console.log(response.data);
				isMounted && setmetadata(response.data);
			} catch (err) {
				console.error(err);
				navigate('/login', { state: { from: location }, replace: false });
			}
		}

		getInfo();
		console.log()

		return () => {
			isMounted = false;
			controller.abort();
		}
	}, [])


	const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16];

	const getRandomIndex = () => Math.floor(Math.random() * images.length);


	const [randomImage, setRandomImage] = useState(images[getRandomIndex()]);

	// const handleRandomImage = () => {
	// 	const newIndex = getRandomIndex();
	// 	setRandomImage(images[newIndex]);
	// };

	const handleImageClick = () => {

		window.location.href = 'https://sametb.com';
	};

	return (
		<sam
			className="shadow"
			style={{backgroundColor: "whitesmoke"}}>
			<div className="container py-5">
				<div className="row">
					<div className="col-lg-3">

						<div className="card ">
							<div className="card-body text-center">
								<img
									src={metadata.posterUrl}
									alt="avatar"
									className="img-fluid"
									// className="rounded-circle img-fluid"
									style={{width: 150}}
								/>
								<h5 className="my-3">
									{`${metadata.title} (${metadata.releaseYear})`}
								</h5>
								<div className="d-flex justify-content-center mb-2">
									{
										metadata.videoUrl != null &&
										metadata.videoUrl.trim().length > 5 &&
										 (
											<button
												type="button"
												className="btn btn-outline-warning ms-1"
												onClick={() => {
													window.open(metadata.videoUrl, '_blank');
												}}
											>
												Play
											</button>
										)
									}

									{


										<button
											type="button"
											className="btn btn-outline-secondary ms-1"
											onClick={() => {
												const trailerUrl = metadata.trailerUrl && metadata.trailerUrl.toString().trim().length > 5
													? metadata.trailerUrl
													: `https://www.youtube.com/results?search_query=${metadata.title}+${metadata.releaseYear}+trailer`;
												window.open(trailerUrl, '_blank');
											}}
										>
											Trailer
										</button>
									}



									{

									}

								</div>
							</div>
						</div>

						<div>
							<br/> <br/>
							<img
								src={randomImage}
								alt="Random Advertisement"
								width="100%"
								style={{ borderRadius: '10px', cursor: 'pointer' }}
								onClick={handleImageClick}
							/>

						</div>


					</div>

					<div className="col-lg-9">
						<div className="card "> {/* mb-4 */}
							<div className="card-body">
								<EditRow metadata={metadata.title} contentString="Title"/>
								<EditRow metadata={metadata.director} contentString="Director"/>
								<EditRow metadata={metadata.releaseYear} contentString="Release Year"/>
								<EditRow metadata={metadata.duration} contentString="Duration"/>
								<EditRow metadata={metadata.id} contentString="ID"/>
								{/*<EditRow metadata={metadata.videoUrl} contentString="Video URL"/>*/}


								{showEditRowIfAvailable(metadata.trailerUrl, "Trailer URL")}
								{showEditRowIfAvailable(metadata.videoUrl, "Video URL")}
								
								{showEditRowIfAvailable(metadata.soundtrackUrl, "Soundtrack URL")}

								{/*<EditRow metadata={metadata.posterUrl} contentString="Poster URL" />*/}







								<SoundtrackEmbed soundtrackLink={metadata.soundtrackUrl}/>
								{/* <SoundtrackEmbed soundtrackLink={"https://www.deezer.com/us/album/294596"}/> */}

								<OtherPlayer metadata={metadata}/>


								



								{/*<iframe title="deezer-widget" src="https://widget.deezer.com/widget/dark/album/294596"*/}
								{/*		width="100%" height="300" frameBorder="0" allowTransparency="true"*/}
								{/*		allow="encrypted-media; clipboard-write"></iframe>*/}


								{/*<VideoEmbed embedUrl={*/}
								{/*	"https://my.mail.ru/video/embed/7706774030430244614"*/}
								{/*	// "http://192.168.1.69:9876/1_Friends%201.%20Sezon%209.%20B%C3%B6l%C3%BCm%20izle%20-%20SezonlukDizi.mp4"*/}
								{/*}/>*/}


								
								<VideoEmbed embedUrl={metadata.videoUrl}/>

								{/*<VideoPlayer src={*/}
								{/*	// "http://192.168.1.69:9876/1_Friends%201.%20Sezon%209.%20B%C3%B6l%C3%BCm%20izle%20-%20SezonlukDizi.mp4"*/}
								{/*	// "https://kanaldvod.duhnet.tv/hls/C/6J/yar70_blm/yar70_blm.smil/hlssubplaylist-ovbnGvek_oacnsx7.m3u8"*/}
								{/*	"https://my.mail.ru/video/embed/4330996934832554685"*/}

								{/*}*/}
								{/*subtitles={*/}
								{/*	// trvtt*/}
								{/*	"https://www.iandevlin.com/html5test/webvtt/upc-video-subtitles-en.vtt"*/}
								{/*}*/}
								{/*/>*/}


							</div>
						</div>
					</div>
				</div>


			</div>
		</sam>
	);
};

export default ProfileMetadata;




								{/* <div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Title
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{metadata.title}
										</p>
									</div>
								</div>
								<hr />
								*/

								}



								{/*{(() => {*/}
								{/*	if (spotifyEmbedPlaylistId){*/}
								{/*		return <SpotifyEmbed playlistId={spotifyEmbedPlaylistId}/>*/}
								{/*	}*/}
								{/*	else {*/}
								{/*		return <h5>No playlist found!</h5>*/}
								{/*	}*/}
								{/*})}*/}
