import { useState, useEffect } from "react";
import {useNavigate, useLocation, Link} from "react-router-dom";
import { useParams } from 'react-router-dom';
import ProfileRow from '../composes/ProfileRow';
import VideoEmbed from "../video/VideoEmbed";
import SoundtrackEmbed from '../composes/SoundtrackEmbed';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import FavoriteButton from "../composes/FavouriteButton";
import useAuth from "../../hooks/useAuth";
import RandomAd from "../composes/RandomAd";
import TVShowOverview from "./TVShowOverview";
import SearchOnGoogle from "../composes/SearchOnGoogle";
import SearchTinyButton from "../composes/SearchTinyButton";
import wikiLogo from '../../assets/img/wiki_logo.png';
import {ShouldShow} from "../../common/ShouldShow";
import Constants from "../../common/Constants";
import {DeleteMetadataButton} from "../composes/DeleteMetadataButton";
import {FaEdit} from "react-icons/fa";
import Loading from "../composes/Loading";
import { useBgImage } from "../../hooks/useBgImage";

// film dizi sayfası

function GoToTrailerButton(metadata) {
	return <button
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
	</button>;
}

function PlayButtonIfExists(metadata) {
	return metadata.videoUrl != null &&
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
		);
}

function ContentView(metadata, navigate, ParentFavButton) {
	return (
		<div
			className="shadow-lg rounded-3"


			>
			<div className="container py-5"
				style={{zIndex: 10}}
			>
				<div className="row">
					<div className="col-lg-3">

						<div className="card" >
							<div style={{backgroundColor: "transparent", filter: 'blur(1px)'}}></div>
							<div className="card-body text-center">
								<img
									src={metadata.posterUrl}
									alt="avatar"
									className="img-fluid"
									// className="rounded-circle img-fluid"
									style={{width: 150, borderRadius: '15px'}}
								/>
								<h5 className="my-3">
									{`${metadata.title} (${metadata.releaseYear})`}
								</h5>
								<div className="d-flex justify-content-center mb-2">
									{ PlayButtonIfExists(metadata) }
									{ GoToTrailerButton(metadata) }

								</div>

								<div>
									<ShouldShow
										allowedRoles={[Constants.ROLES.Admin, Constants.ROLES.Manager]}
										content={
											<Link to={`/edit-metadata/${metadata.id}`} >
												<button
													type="button"
													className="btn btn-outline-warning"
												>
													<FaEdit/>
												</button>
											</Link>
										}
									/>
									{' '}
									<ShouldShow
										allowedRoles={[Constants.ROLES.Admin]}
										content={
											<DeleteMetadataButton
												id={metadata.id}
											/>
										}
									/>

								</div>

								<div>
									<SearchOnGoogle metadata={metadata.title}
													query={`${metadata.title} ${metadata.director} ${metadata.releaseYear}`}
									/>
									{' '}
									<SearchTinyButton
										btnCls="btn-outline-secondary"
										img={wikiLogo}
										metadata={metadata}
										query={`https://en.wikipedia.org/wiki/Special:Search/${encodeURIComponent(`${metadata.title}_${metadata?.type?.toLowerCase()}`)}`}
									/>
								</div>
								{<ParentFavButton/>}
							</div>
						</div>

						<br/>
						<RandomAd />
						<br/>


					</div>

					<div className="col-lg-8">
						<div className="card" style={{backgroundColor: "transparent"}}> {/* mb-4 */}
							<div className="card-body">
								{/*<ProfileRow metadata={metadata.title} contentString="Title"/>*/}
								<ProfileRow metadata={metadata.director} contentString="Dir. / Prod."/>
								{/*<ProfileRow metadata={metadata.releaseYear} contentString="Release Year"/>*/}
								{metadata.type === 'MOVIE' && <ProfileRow metadata={`${metadata.duration} min.`} contentString="Duration "/>}
								{metadata.type === 'TV_SHOW' && <ProfileRow metadata={metadata.seasonNumber} contentString="Seasons"/>}
								{metadata.type === 'TV_SHOW' && <ProfileRow metadata={metadata.episodeNumber} contentString="Episodes"/>}
								{/*<ProfileRow metadata={metadata.id} contentString="ID"/>*/}
								<ProfileRow metadata={metadata.genre} contentString="Genre"/>
								<ProfileRow metadata={metadata.description} contentString="Description"/>
								<ProfileRow metadata={metadata.type} contentString="Type"/>
								<ProfileRow metadata={metadata.videoUrl} contentString="Video URL"/>
								<ProfileRow metadata={metadata.trailerUrl} contentString="Trailer URL"/>
								{/*<ProfileRow metadata={metadata.soundtrackUrl} contentString="Soundtrack URL"/>*/}

								<SoundtrackEmbed soundtrackLink={metadata.soundtrackUrl}/>

								{/*todo: CustomPlayer handle*/}
								{/*<CustomPlayer metadata={metadata}/>*/}

								<VideoEmbed embedUrl={metadata.videoUrl}/>


								{(metadata.type === 'TV_SHOW') &&
								<div style={{backgroundColor: "whitesmoke", padding: 10, borderRadius: 10}} >
									<TVShowOverview metadata={metadata}/>
								</div>
								}
							</div>
						</div>
					</div>
				</div>


			</div>
		</div>
	);
}

function NoMetadataView() {
	return (
		<div className="container">
			<div className="text-center">
				<h3 className="text-danger">Metadata not found</h3>
			</div>
		</div>
	);
}

const ProfileMetadata = () => {

	const [isLoaded, setIsLoaded] = useState(false);

    // let navigate = useNavigate();
	// const { title } = useParams();
	const { id } = useParams();

	const navigate = useNavigate();
	const location = useLocation();
	const axiosPrivate = useAxiosPrivate();
	const { setBgImageHandler } = useBgImage();
	const { auth } = useAuth();

	const[metadata, setmetadata] = useState({
        title : '',
        director : '',
        releaseYear : 0,
        duration : 0,
		posterUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/07/The_Horse_in_Motion-anim.gif',
		videoUrl: null,
		trailerUrl: null,
		soundtrackUrl: null,
		genre: null,
		description: null,
		type: null,
	});


	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();


		isLoaded && setIsLoaded(false);
				// const response = await axiosPrivate.get(`/metadatas/title/single/${title}`, {
		const getInfo = async () => {
			try {
				const response = await axiosPrivate.get(`/metadatas/${id}`, {
					signal: controller.signal
				});
				console.log(response.data);
				if (response.data.backgroundImageUrl !== null && response.data.backgroundImageUrl !== localStorage.getItem('bgImage')) {
					// setBgImageHandler(response.data.backgroundImageUrl);
					setBgImageHandler(response.data.backgroundImageUrl, () => {
						localStorage.setItem('bgImage', response.data.backgroundImageUrl);
						navigate(0)
						isMounted = false;
					});
					console.log("bg image set " + response.data.backgroundImageUrl)
				}
				isMounted && setmetadata(response.data);
			} catch (err) {
				console.error(err);
				navigate('/ooooooooops', { state: { from: location }, replace: false });
			} finally {
				isMounted && setIsLoaded(true);
			}
		}

		getInfo();
		// console.log()

		return () => {
			isMounted = false;
			controller.abort();
		}
	}, [])


	const ParentFavButton = () => {
		const metadataId = metadata.id;
		const userId = auth?.userId || -1;

		// console.log("userId: " + userId);

		if (userId !== -1) {
		return <FavoriteButton metadataId={metadataId} userId={userId} />;
		}
	};

	return (
		isLoaded ? (
		metadata ? (
			ContentView(metadata, navigate, ParentFavButton)
		) : (
			NoMetadataView()
		)
	) : (
		<Loading anim="m2" />
	)
);



};

export default ProfileMetadata;