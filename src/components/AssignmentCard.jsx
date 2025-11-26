import React from 'react'

const AssignmentCard = () => {
  return (
    <div className="assignment-card-exact rounded-2xl p-6 card-shadow" style={{ height: '100%', width: '100%' }}>
      <div className="flex items-center gap-2 mb-4">
        {/* Treasure Chest/Box Icon */}
        <img 
          src="/images/box.png" 
          alt="Box" 
          className="w-10 h-10 object-contain"
        />
        <h3 className="text-2xl font-bold text-gray-900">Assignment</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900 text-lg">Gita Verse</p>
            <p className="font-semibold text-gray-900 text-lg">Practice</p>
          </div>
          {/* Scroll with Quill Image */}
          <div>
            <img 
              src="/images/gitaverse.png" 
              alt="Gita Verse Scroll" 
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>
        
        {/* Upload Button - More Yellow Gradient */}
        <button className="assignment-button-exact w-full text-white font-bold py-3 px-4 rounded-full transition-colors duration-200 flex items-center justify-between shadow-md">
          <span>Upload Your work</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.21z"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default AssignmentCard

