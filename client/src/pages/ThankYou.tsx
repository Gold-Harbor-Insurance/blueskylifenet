import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ThankYou() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Legacy route - redirect to seniors page
    // Thank you content is now embedded as the final step of each quiz
    setLocation("/seniors");
  }, [setLocation]);

  return null;
}
