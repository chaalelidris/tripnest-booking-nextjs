// pages/favorites.tsx

import { SafeListing } from "@/types";
import { useEffect, useState } from "react";

// ...

interface RecommendationResponse {
  recommendations: SafeListing[];
}

export default function Favorites() {
  // ...

  const [recommendations, setRecommendations] = useState<SafeListing[]>([]);

  useEffect(() => {
    // ...

    async function fetchRecommendations() {
      try {
        const response = await fetch('/api/recommendations', {
          method: 'POST',
          body: JSON.stringify({ userId: 'USER_ID_HERE' }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const { recommendations } = await response.json();
        setRecommendations(recommendations);
      } catch (error) {
        console.error(error);
      }
    }

    fetchRecommendations();
  }, []);

  // ...

  return (
    <div>
      <h1>Favorites</h1>
      {/* Render favorite listings */}
      {/* ... */}
      <h2>Recommended Listings</h2>
      {recommendations.map((listing) => (
        <div key={listing.id}>
          <h3>{listing.title}</h3>
          <p>{listing.description}</p>
          {/* Render other listing details */}
        </div>
      ))}
    </div>
  );
}
