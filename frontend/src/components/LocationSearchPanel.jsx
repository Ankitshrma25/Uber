import React from 'react'

const LocationSearchPanel = ({ suggestions, onSelect, setPanelOpen }) => {
  return (
    <div>
      {suggestions && suggestions.length > 0 ? (
        suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => {
              onSelect(suggestion)
            }}
            className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'
          >
            <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className='font-medium'>{suggestion}</h4>
          </div>
        ))
      ) : (
        <div className='p-3 text-gray-500 text-center'>
          Type to search locations...
        </div>
      )}
    </div>
  )
}

export default LocationSearchPanel


