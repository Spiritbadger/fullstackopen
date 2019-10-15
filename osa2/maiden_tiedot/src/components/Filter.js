import React from 'react'

const Filter = ({ searchTerm, handleSearchTermChange }) => {
    return (
        <div>
            find countries <input value={searchTerm} onChange={handleSearchTermChange} />
        </div>
    )
}

export default Filter
