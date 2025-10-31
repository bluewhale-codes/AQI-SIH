import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronUp, MoreVertical, GitBranch, User } from 'lucide-react';
import { Link } from 'react-router-dom';
const CityDataCard = ({ 
  imageUrl, 
  title, 
  author, 
  lastUpdated, 
  usabilityScore, 
  fileSize, 
  downloadCount, 
  fileType,
  upvotes = 532,
  authorAvatar,
  datasetId, // Add dataset ID for routing
  
}) => {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Prevent navigation when clicking on interactive elements
    if (
      e.target.closest('button') || 
      e.target.closest('a')
    ) {
      return;
    }

    // Call custom onClick if provided, otherwise navigate
    if (onClick) {
      onClick(datasetId);
    } else {
      navigate("/detail");
    }
  };

  const handleUpvote = (e) => {
    e.stopPropagation(); // Prevent card click
    setIsUpvoted(!isUpvoted);
  };

  const handleMenuClick = (e) => {
    e.stopPropagation(); // Prevent card click
    // Add menu logic here
  };

  const handleForkClick = (e) => {
    e.stopPropagation(); // Prevent card click
    // Add fork logic here
  };

  const handleProfileClick = (e) => {
    e.stopPropagation(); // Prevent card click
    navigate(`/profile/${author}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="w-72 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
    >
      {/* Dataset Preview Image */}
      <div className="relative h-32 w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Title and Menu */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2 flex-1 hover:text-blue-600 transition">
            <Link to="/detail">{title}</Link>
          </h3>
          <button 
            onClick={handleMenuClick}
            className="ml-2 p-1 hover:bg-gray-100 rounded-full transition"
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Metadata */}
        <div className="text-xs text-gray-600 mb-2">
          <p className="truncate">{author} · Updated {lastUpdated}</p>
        </div>

        {/* Stats */}
        <div className="flex items-center text-xs text-gray-600 mb-2">
          <span className="font-medium">Usability</span>
          <span className="ml-1 font-semibold text-gray-900">{usabilityScore}</span>
          <span className="mx-1">·</span>
          <span>{fileSize} kB</span>
          <span className="mx-1">·</span>
          <span>{downloadCount} downloads</span>
        </div>

        {/* File Info */}
        <p className="text-xs text-gray-600 mb-4">{fileType}</p>

        {/* Action Bar */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          {/* Upvote Button */}
          <button 
            onClick={handleUpvote}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition ${
              isUpvoted 
                ? 'bg-blue-50 border-blue-300 text-blue-700' 
                : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
          >
            <ChevronUp className="w-4 h-4" />
            <span className="text-sm font-semibold">{upvotes}</span>
          </button>

          {/* Icons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={handleForkClick}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <GitBranch className="w-4 h-4 text-gray-600" />
            </button>
            <button 
              onClick={handleProfileClick}
              className="w-8 h-8 flex items-center justify-center rounded-full overflow-hidden border-2 border-gray-200 hover:border-gray-300 transition"
            >
              {authorAvatar ? (
                <img src={authorAvatar} alt={author} className="w-full h-full object-cover" />
              ) : (
                <User className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityDataCard;
