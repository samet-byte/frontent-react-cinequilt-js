import OffCanvasFilter from "../OffCanvasFilter";

export function SortView(sortBy, handleSortChange, sortOrder, contentType, pageSize, pageNumber) {
    return <OffCanvasFilter
        title={'Filter & Sort Content'}
        content={
            <div className="container mt-4">
                <div>
                    <label className="form-label">
                        Sort By:
                        <select className="form-select" name="sortBy" value={sortBy} onChange={handleSortChange}>
                            <option value="title">Title</option>
                            <option value="director">Director</option>
                            <option value="releaseYear">Release Year</option>
                            <option value="duration">Duration</option>
                            <option value="createDate">Create Date</option>
                            <option value="id">ID</option>"
                            {/*<option value="genre">Genre</option>*/}
                        </select>
                    </label>
                </div>
                <div>
                    <label className="form-label">
                        Sort Order:
                        <select className="form-select" name="sortOrder" value={sortOrder} onChange={handleSortChange}>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label className="form-label">
                        Content Type:
                        <select className="form-select" name="contentType" value={contentType} onChange={handleSortChange}>
                            <option value="MOVIE">Movie</option>
                            <option value="TV_SHOW">TV Show</option>
                            <option value="ANY">Any</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label className="form-label">
                        Page Size:
                        <input
                            className="form-control"
                            type="number"
                            name="pageSize"
                            min="1"
                            max="100" //change
                            value={pageSize}
                            onChange={handleSortChange}
                        ></input>
                    </label>
                </div>
                <div>
                    <label className="form-label">
                        Page Number:
                        <input
                            className="form-control"
                            type="number"
                            name="pageNumber"
                            min="1"
                            max="100" //change
                            value={pageNumber}
                            onChange={handleSortChange}
                        ></input>
                    </label>
                </div>
            </div>
        }
    />
}