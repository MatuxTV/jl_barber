export async function getGoogleReviews() {
  const placeId = "ChIJKS5oDaOJbEcRfuwA9yHrkok"; // Replace with your actual Place ID
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': API_KEY,
          'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return data;

  } catch (error) {
    console.error('Error getting place rating:', error);
    return null;
  }
}