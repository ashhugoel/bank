import React, { useEffect, useState } from "react";
import "./GovernmentPolicies.css";

function GovernmentPolicies() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch("/api/get-policies");
        if (response.status === 200) {
          const data = await response.json();
          const policyArray = Object.values(data.data); // Convert object to array
          const shuffledPolicies = shuffleArray(policyArray); // Shuffle policies
          setPolicies(shuffledPolicies.slice(0, 2)); // Get only two random policies
        } else {
          throw new Error("Failed to fetch policies");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  // Function to shuffle the array randomly
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5); // Randomly shuffle array
  };

  return (
    <section className="bg-white my-5 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Government Policies</h2>
      {loading && <p>Loading policies...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Only render if there are policies */}
      {policies.length > 0 ? (
        <ul className="space-y-4">
          {policies.map((policy, index) => (
            <li key={index} className="border-b pb-4">
              <h3 className="font-bold text-lg">{policy.policyName}</h3>
              <div className="description-container">
                <div className="description-animate">
                  <span>{policy.description}</span>
                  <span>{policy.description}</span> {/* Duplicate for seamless looping */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No policies available.</p>
      )}
    </section>
  );
}

export default GovernmentPolicies;
