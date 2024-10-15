// We are using dynamic imports to load the AutosizeTextarea component only when needed.
// This improves the performance by reducing the initial bundle size.
import React, { useState, useEffect } from 'react'

// Placeholder component to be shown while AutosizeTextarea is loading
const LoadingComponent = () => <div>Loading...</div>;

const AutoSizeTextField = ({ value, onChange, ...props }) => {
  const [AutosizeTextarea, setAutosizeTextarea] = useState(null);

  // Using useEffect to dynamically import the AutosizeTextarea when the component is mounted
  useEffect(() => {
    const loadComponent = async () => {
      // Dynamically importing the 'react-autosize-textarea' library
      const { default: AutosizeTextareaComponent } = await import('react-autosize-textarea');
      
      // After the component is loaded, update the state with the imported module
      setAutosizeTextarea(() => AutosizeTextareaComponent);
    };

    loadComponent(); // Trigger the dynamic import
  }, []); // Empty dependency array to ensure the import happens only once when mounted

  // If the component is still loading, display a loading message
  if (!AutosizeTextarea) {
    return <LoadingComponent />;
  }

  // Render the dynamically imported AutosizeTextarea once it's loaded
  return <AutosizeTextarea value={value} onChange={onChange} {...props} />;
};

export default AutoSizeTextField;
