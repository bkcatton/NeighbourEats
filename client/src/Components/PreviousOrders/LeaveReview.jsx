import React from 'react';

const LeaveReview = props => {
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="your review here"
          value={props.reviewBody}
          onChange={e => props.setReviewBody(e.target.value)}
        />
        <button onClick={props.handleSubmit}>send review</button>
      </form>
    </div>
  );
};

export default LeaveReview;
