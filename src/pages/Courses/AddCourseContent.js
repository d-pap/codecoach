import React from 'react';
import { useLocation } from 'react-router-dom';

const AddCourseContent = () => {
  const { state } = useLocation();
  const { courseName } = state;

  return (
    <div>
      <h1>Add a course for {courseName}</h1>
      {/* Render the interface for course customization similar to the screenshot provided */}
      {/* Course selection logic here */}
    </div>
  );
};

export default AddCourseContent;
