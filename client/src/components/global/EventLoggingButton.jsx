import React from 'react';
import { useAnalytics } from '../../contexts/analyticsContext';

const EventLoggingButton = ({
  children,
  category,
  action,
  label,
  ...props
}) => {
  const { logEvent } = useAnalytics();

  const handleClick = event => {
    if (logEvent) {
      //check if logEvent exists to prevent errors
      logEvent(category, action, label);
      // console.log('Event logged:', category, action, label);
    } else {
      console.warn(
        'logEvent function not available.  Ensure AnalyticsProvider is correctly set up.'
      );
    }

    // Allow the default button behavior (e.g., submitting a form)
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
};

export default EventLoggingButton;
