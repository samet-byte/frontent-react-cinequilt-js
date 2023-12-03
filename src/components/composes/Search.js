import React from "react";

const Search = ({ search, setSearch }) => {
	return (
		<div className="col-sm-6 mb-4">
			<form 
            onSubmit={(e) => e.preventDefault()}
            // !!
            >
				<input
					width={"100%"}
					className="form-control text-center"
					type="search"
					role="searchbox"
					placeholder="🔍 Search content.."
					value={search}
					onChange={(e) =>
						setSearch(e.target.value)
					}></input>
			</form>
		</div>
	);
};

export default Search;