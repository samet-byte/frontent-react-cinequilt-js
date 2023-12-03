// Author: sametbayat
// Dec 02, 2023 4:11 PM

import React from 'react';

const EditRow = ({ metadata, contentString }) => {
    return (
        <div className="card mb-4">
            <div className="card-body">

                <div className="row">
                    <div className="col-sm-3">
                        <h5 className="mb-0">{contentString}</h5>
                    </div>
                    <div className="col-sm-9">
                        <p className="text-muted mb-0">{metadata}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditRow;
