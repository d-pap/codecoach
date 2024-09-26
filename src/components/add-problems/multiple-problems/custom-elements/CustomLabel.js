import React, { useState, useEffect } from 'react';

// Placeholder component displayed while Typography is loading
const LoadingComponent = () => <div>Loading...</div>;

const CustomLabel = ({ children, ...props }) => {
  const [Typography, setTypography] = useState(null);

  // useEffect to dynamically import the Typography component
  useEffect(() => {
    const loadComponent = async () => {
      // Dynamically importing the MUI Typography component
      const { default: TypographyComponent } = await import('@mui/material/Typography');

      // Once the component is loaded, set it in the state
      setTypography(() => TypographyComponent);
    };

    loadComponent(); // Trigger the dynamic import
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Display loading state until the Typography component is loaded
  if (!Typography) {
    return <LoadingComponent />;
  }

  // Render the dynamically imported Typography component
  return (
    <Typography variant="h6" component="label" {...props}>
      {children}
    </Typography>
  );
};

export default CustomLabel;
