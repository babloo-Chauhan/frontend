"use client";
import React, { useEffect, useState } from "react";

export default function GoogleReviews() {
    const [reviews, setReviews] = useState([]);
    const [placeName, setPlaceName] = useState("");
    const [totalRatings, setTotalRatings] = useState(0);
    const [avgRating, setAvgRating] = useState(0);
    const [loading, setLoading] = useState(true);

    const placeId = "ChIJT8th50wFDTkR2PWSfnlIQPA";

    useEffect(() => {
        const loadReviews = () => {
            const service = new window.google.maps.places.PlacesService(
                document.createElement("div")
            );

            service.getDetails(
                {
                    placeId,
                    fields: ["name", "rating", "reviews", "user_ratings_total", "url"],
                },
                (place, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                        // ✅ Filter only 4 & 5 star reviews and shuffle
                        const filtered = (place.reviews || [])
                            .filter((r) => r.rating >= 4)
                            .sort(() => Math.random() - 0.5);

                        setReviews(filtered);
                        setPlaceName(place.name);
                        setTotalRatings(place.user_ratings_total || 0);
                        setAvgRating(place.rating || 0);
                    } else {
                        console.error("Failed to load reviews:", status);
                    }
                    setLoading(false);
                }
            );
        };

        // Wait until Google Maps script is ready
        if (window.google && window.google.maps) {
            loadReviews();
        } else {
            const interval = setInterval(() => {
                if (window.google && window.google.maps) {
                    clearInterval(interval);
                    loadReviews();
                }
            }, 500);
        }
    }, []);

    return (
        <div className="bg-white text-black py-10 px-4 sm:px-8 lg:px-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
                What People Say
            </h2>

            {loading ? (
                <p className="text-center text-gray-500">Loading reviews...</p>
            ) : reviews.length > 0 ? (
                <div className="grid md:grid-cols-5 gap-6">
                    {/* LEFT COLUMN — Business Info */}
                    <div className="col-span-2 md:col-span-1 bg-gray-50 p-6 rounded-2xl shadow-md flex flex-col items-center justify-center text-center">
                        <img
                            src={`https://maps.googleapis.com/maps/api/staticmap?center=Kazoma%20Industries%20Pvt%20Ltd,Delhi&zoom=15&size=200x200&maptype=roadmap&markers=color:red%7Clabel:K%7C28.666,77.067&key=AIzaSyD7x-OR8sGvY809feuXyImQg6kDnkLlv2E`}
                            alt="Map"
                            className="w-28 h-28 mb-3 rounded-lg shadow-md"
                        />
                        <h3 className="text-lg font-semibold">{placeName}</h3>
                        <div className="flex justify-center my-2">
                            {[...Array(Math.round(avgRating))].map((_, i) => (
                                <span key={i} className="text-yellow-500 text-lg">★</span>
                            ))}
                        </div>
                        <p className="text-gray-600 mb-3">
                            {totalRatings} Google reviews
                        </p>
                        <button
                            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                            onClick={() =>
                                window.open(
                                    `https://search.google.com/local/writereview?placeid=${placeId}`,
                                    "_blank"
                                )
                            }
                        >
                            Write a review
                        </button>
                    </div>

                    {/* RIGHT COLUMN — Reviews */}
                    <div className="col-span-3 md:col-span-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {reviews.map((r, i) => (
                            <div
                                key={i}
                                className="bg-gray-900 text-white p-5 rounded-2xl shadow-md relative"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        {r.profile_photo_url ? (
                                            <img
                                                src={r.profile_photo_url}
                                                alt={r.author_name}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-lg font-semibold">
                                                {r.author_name.charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <h4 className="font-semibold">{r.author_name}</h4>
                                            <p className="text-sm text-gray-400">
                                                {new Date(r.time * 1000).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                        alt="Google"
                                        className="w-5 h-5"
                                    />
                                </div>

                                <div className="flex text-yellow-500 mb-2">
                                    {[...Array(r.rating)].map((_, j) => (
                                        <span key={j}>★</span>
                                    ))}
                                </div>

                                <p className="text-gray-200">{r.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">
                    No reviews available for this location.
                </p>
            )}
        </div>
    );
}
