import { useState, useCallback } from "react";

export function UseAlert() {
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback((message, severity = "success", duration = 3000) => {
    setAlert({ message, severity });

    // Automatically close the alert after the specified duration
    setTimeout(() => {
      setAlert(null);
    }, duration);
  }, []);

  const hideAlert = useCallback(() => {
    setAlert(null);
  }, []);

  return {
    alert,
    showAlert,
    hideAlert,
  };
}
