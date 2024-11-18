import React, { useState } from 'react';

function StarRating({handleInputChange}) {
  const [rating, setRating] = useState(3);

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
    handleInputChange(event) ;
  };

  return (
    <fieldset className="starability-slot">
      <input
        type="radio"
        id="first-rate1"
        name="rating"
        value="1"
        checked={rating === 1}
        onChange={handleRatingChange}
      />
      <label htmlFor="first-rate1" title="Terrible">1 star</label>
      <input
        type="radio"
        id="first-rate2"
        name="rating"
        value="2"
        checked={rating === 2}
        onChange={handleRatingChange}
      />
      <label htmlFor="first-rate2" title="Not good">2 stars</label>
      <input
        type="radio"
        id="first-rate3"
        name="rating"
        value="3"
        checked={rating === 3}
        onChange={handleRatingChange}
      />
      <label htmlFor="first-rate3" title="Average">3 stars</label>
      <input
        type="radio"
        id="first-rate4"
        name="rating"
        value="4"
        checked={rating === 4}
        onChange={handleRatingChange}
      />
      <label htmlFor="first-rate4" title="Very good">4 stars</label>
      <input
        type="radio"
        id="first-rate5"
        name="rating"
        value="5"
        checked={rating === 5}
        onChange={handleRatingChange}
      />
      <label htmlFor="first-rate5" title="Amazing">5 stars</label>
    </fieldset>
  );
}

export {StarRating};
