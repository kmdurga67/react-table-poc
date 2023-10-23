import React from 'react'

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className="flex items-center justify-end space-x-2 mb-2">
      <span className="text-blue-500 text-lg font-bold">Search:</span>
      <input
        className="border border-gray-300 rounded px-4 py-3 text-lg"
        value={filter || ''}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  )
}

export default GlobalFilter
