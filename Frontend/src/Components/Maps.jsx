import { useEffect, useState } from "react";

const GoogleMapsRoute = ({ map, location }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (window.google && window.google.maps) {
      setScriptLoaded(true);
      return;
    }
  
    // Load the Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    script.async = true;
    script.onload = () => {
      setScriptLoaded(true);
      initMap();
    };
    script.onerror = () => {
      console.error("Failed to load Google Maps script");
    };
    document.body.appendChild(script);
  
    // Cleanup function
    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (scriptLoaded) {
      initMap();
    }
  }, [map, location, scriptLoaded]);

  const initMap = () => {
    if (!map || !location || !Array.isArray(map) || map.length < 2 || !location.coordinates || location.coordinates.length < 2) {
      console.error("Invalid coordinates provided");
      return;
    }

    const mapInstance = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 28.6139, lng: 77.2090 }, // Default to Delhi
      zoom: 7,
    });

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(mapInstance);

    const start = { lat: map[0], lng: map[1] };
    const end = { lat: location.coordinates[0], lng: location.coordinates[1] };

    const request = {
      origin: start,
      destination: end,
      travelMode: "DRIVING",
    };

    directionsService.route(request, (result, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(result);
      } else {
        console.error("Could not find route: ", status);
      }
    });
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Shortest Route on Google Maps</h2>
      <div id="map" className="w-full h-[500px] border-2 border-gray-300 rounded-lg shadow-lg"></div>
    </div>
  );
};

export default GoogleMapsRoute;