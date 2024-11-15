/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

export default function useOnScreen(ref) {
    // State and setter for storing whether element is visible
    const [isIntersecting, setIntersecting] = React.useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        // Update our state when observer callback fires
        if(entry.isIntersecting){
          setIntersecting(entry.isIntersecting);
        }
      });
      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        observer.unobserve(ref.current);
      };
    }, []); // Empty array ensures that effect is only run on mount and unmount
  
    return isIntersecting;
  }
  