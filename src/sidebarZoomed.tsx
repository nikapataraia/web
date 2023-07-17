import React, { useState, useEffect } from "react";
import Sidebar, { ISidebarProps } from "./sidebar";

function App(props: ISidebarProps) {
  // Function to check the window width
  const isWindowWide = () => {
    return window.innerWidth > 1100;
  };
  const [windowWide, setWindowWide] = useState(isWindowWide());
  const [sidebarOpen, setSidebarOpen] = useState(isWindowWide());

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // On component mount, add an event listener to the window to handle resizing
  useEffect(() => {
    function handleResize() {
      setSidebarOpen(isWindowWide());
    }

    window.addEventListener("resize", handleResize);
    useEffect(() => {
      function handleResize() {
        setWindowWide(isWindowWide());
        if (!isWindowWide()) {
          setSidebarOpen(false);
        } else {
          setSidebarOpen(true);
        }
      }

      window.addEventListener("resize", handleResize);

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="App">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ფილტრი
      </button>
      {sidebarOpen && (
        <>
          <Sidebar {...props} />
          {!windowWide && <button onClick={toggleSidebar}>უკან</button>}
        </>
      )}
    </div>
  );
}

export default App;
