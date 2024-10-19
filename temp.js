import React, { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';

const CheckLocation = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Function to fetch and send the user's location
    const fetchAndSendLocation = async () => {
      try {
        // Get the user's current location
        Geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });

            // Send the location to the backend
            const response = await fetch('https://yourserver.com/trek/123/check-location', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userLatitude: latitude,
                userLongitude: longitude,
              }),
            });

            const data = await response.json();

            // Check if the user is near any checkpoints
            if (data.nearbyCheckpoints && data.nearbyCheckpoints.length > 0) {
              console.log('User is near a checkpoint');
              // Handle notification or other actions
            } else {
              console.log('No checkpoints nearby');
            }
          },
          (error) => {
            console.error('Geolocation error:', error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } catch (error) {
        console.error('Error fetching location or sending data:', error);
      }
    };

    // Start polling every 30 seconds
    const intervalId = setInterval(fetchAndSendLocation, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View>
      <Text>User location: {userLocation ? `${userLocation.latitude}, ${userLocation.longitude}` : 'Fetching location...'}</Text>
    </View>
  );
};

export default CheckLocation;
