// Author: sametbayat
// Dec 24, 2023 11:07 PM

import {Form} from "react-bootstrap";
import Constants from "../../common/Constants";
import {ALL_GENRES} from "../../common/genres";
import {Link} from "react-router-dom";
import React from "react";
import Paths from "../../common/Paths";

// ekleme düzenleme ortak form
export function MetadataForm(saveMetadata, type, handleInputChange, title, director, releaseYear, seasonNumber, episodeNumber, duration, description, genre, posterUrl, videoUrl, trailerUrl, soundtrackUrl, backgroundImageUrl) {
    return <Form onSubmit={(e) => saveMetadata(e)}>


        <Form.Group controlId="type">
            <Form.Label column sm="3">
                Type
            </Form.Label>

            <Form.Control
                as="select"
                name="type"
                value={type || 'MOVIE'}
                onChange={handleInputChange}
                className="form-control col-span-small-6 mb-3 input-black-border"
            >
                {Object.entries(Constants.CONTENT_TYPES_MAP).map(([key, value]) => (
                    <option key={key} value={key}>
                        {value}
                    </option>
                ))}
            </Form.Control>

        </Form.Group>


        <Form.Group controlId="title">
            <Form.Label column sm="3">
                Title
            </Form.Label>

            <Form.Control
                type="text"
                name="title"
                value={title || ''}
                onChange={(e) => handleInputChange(e)}
                className="form-control col-span-small-6 mb-3 input-black-border"
            />

        </Form.Group>


        <Form.Group controlId="director">
            <Form.Label column sm="3">
                Director
            </Form.Label>

            <Form.Control
                type="text"
                name="director"
                value={director || ''}
                onChange={(e) => handleInputChange(e)}
                className="form-control col-span-small-6 mb-3 input-black-border"
            />

        </Form.Group>


        <Form.Group controlId="releaseYear">
            <Form.Label column sm="3">
                Release Year
            </Form.Label>

            <Form.Control
                type="number"
                name="releaseYear"
                value={releaseYear || 0}
                onChange={(e) => handleInputChange(e)}
                className="form-control col-span-small-6 mb-3 input-black-border"
            />

        </Form.Group>


        {
            type === 'TV_SHOW' &&
            <Form.Group controlId="seasonNumber">
                <Form.Label column sm="3">
                    Season Number
                </Form.Label>

                <Form.Control
                    type="number"
                    name="seasonNumber"
                    value={seasonNumber || null}
                    onChange={(e) => handleInputChange(e)}
                    className="form-control col-span-small-6 mb-3 input-black-border"
                />

            </Form.Group>
        }

        {


            type === 'TV_SHOW' &&
            <Form.Group controlId="episodeNumber">
                <Form.Label column sm="3">
                    Episode Number
                </Form.Label>

                <Form.Control
                    type="number"
                    name="episodeNumber"
                    value={episodeNumber || null}
                    onChange={(e) => handleInputChange(e)}
                    className="form-control col-span-small-6 mb-3 input-black-border"
                />

            </Form.Group>


        }

        <Form.Group controlId="duration">
            <Form.Label column sm="3">
                Duration
            </Form.Label>

            <Form.Control
                type="number"
                name="duration"
                value={duration || 0}
                onChange={(e) => handleInputChange(e)}
                className="form-control col-span-small-6 mb-3 input-black-border"
            />

        </Form.Group>


        <Form.Group controlId="description">
            <Form.Label column sm="3">
                Description
            </Form.Label>

            <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={description || ''}
                onChange={(e) => handleInputChange(e)}
                className="form-control col-span-small-6 mb-3 input-black-border"
            />

        </Form.Group>


        <Form.Group controlId="genre">
            <Form.Label column sm="3">
                Genre
            </Form.Label>

            <Form.Control
                as="select"
                name="genre"
                value={genre || ''}
                onChange={handleInputChange}
                className="form-control col-span-small-6 mb-3 input-black-border"
            >
                <option value=''>Select Genre</option>
                {ALL_GENRES.map((genre) => (
                    <option key={genre.id} value={genre.name}>
                        {genre.name}
                    </option>
                ))}
            </Form.Control>

        </Form.Group>


        <Form.Group controlId="posterUrl">
            <Form.Label column sm="3">
                Poster URL
            </Form.Label>
            <Form.Control
                type="text"
                name="posterUrl"
                value={posterUrl || ''}
                onChange={(e) => handleInputChange(e)}
                className="form-control col-span-small-6 mb-3 input-black-border"
            />
        </Form.Group>

        <Form.Group controlId="videoUrl">
            <Form.Label column sm="3">
                Video URL
            </Form.Label>

            <Form.Control
                type="text"
                name="videoUrl"
                value={videoUrl || ''}
                onChange={(e) => handleInputChange(e)}
                className="form-control col-span-small-6 mb-3 input-black-border"
            />

        </Form.Group>

        <Form.Group controlId="trailerUrl">
            <Form.Label column sm="3">
                Trailer URL
            </Form.Label>

            <Form.Control
                type="text"
                name="trailerUrl"
                value={trailerUrl}
                onChange={(e) => handleInputChange(e)}
                className="form-control col-span-small-6 mb-3 input-black-border"
            />

        </Form.Group>

        <Form.Group controlId="soundtrackUrl">
            <Form.Label column sm="3">
                Soundtrack URL
            </Form.Label>

            <Form.Control
                type="text"
                name="soundtrackUrl"
                value={soundtrackUrl || ''}
                onChange={(e) => handleInputChange(e)}
                className="form-control col-span-small-6 mb-3 input-black-border"
            />

        </Form.Group>

        <Form.Group controlId="backgroundImageUrl">
            <Form.Label column sm="3">
                Background Image URL
            </Form.Label>

            <Form.Control
                type="text"
                name="backgroundImageUrl"
                value={backgroundImageUrl || ''}
                onChange={(e) => handleInputChange(e)}
                className="form-control col-span-small-6 mb-3 input-black-border"
            />

        </Form.Group>

        <div className="row mb-5 justify-content-center">
            <div className="col-sm-2">
                <button type="submit" className="btn btn-outline-success btn-lg">
                    Save
                </button>
            </div>

            <div className="col-sm-2 justify-content-center">
                <Link to={`${Paths.VIEW_METADATAS}`}>
                    <button
                        type="submit"
                        className="btn btn-outline-warning btn-lg"
                    >
                        Cancel
                    </button>
                </Link>
            </div>
        </div>
    </Form>;
}