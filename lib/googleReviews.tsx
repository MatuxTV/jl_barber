export async function GET() {
  const placeId = "ChIJKS5oDaOJbEcRfuwA9yHrkok";
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY; 

  const url = `https://places.googleapis.com/v1/places/${placeId}?languageCode=sk`;
  const res = await fetch(url, {
    headers: {
      "Accept": "application/json",
      "X-Goog-Api-Key": API_KEY!,
      "X-Goog-FieldMask": "id,displayName,rating,userRatingCount"
    },
    // cache: "no-store" // ak chceš vždy fresh
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: res.status });
}
