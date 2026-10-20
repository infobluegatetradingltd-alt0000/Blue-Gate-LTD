import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: number;
  showText?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  reviewCount,
  size = 14,
  showText = true
}) => {
  return (
    <div className="inline-flex items-center gap-1.5" aria-label={`Rating ${rating} out of 5 stars`}>
      <div className="flex items-center text-[#F5D64E]">
        {[1, 2, 3, 4, 5].map(star => {
          const filled = rating >= star;
          const half = !filled && rating >= star - 0.5;
          return (
            <Star
              key={star}
              size={size}
              className={`${
                filled
                  ? 'fill-[#F5D64E] text-[#F5D64E]'
                  : half
                  ? 'fill-[#F5D64E]/50 text-[#F5D64E]'
                  : 'fill-transparent text-[#CBD5E1]'
              } transition-colors`}
            />
          );
        })}
      </div>
      {showText && (
        <span className="text-xs font-semibold text-[#202329] tabular-nums">
          {rating.toFixed(1)}
          {reviewCount !== undefined && (
            <span className="font-normal text-[#656A70] ml-1">({reviewCount})</span>
          )}
        </span>
      )}
    </div>
  );
};
