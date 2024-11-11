// components/GovernmentPolicies.js
import React, { useEffect, useState } from "react";

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
          setPolicies(data.data);
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

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Government Policies</h2>
      {loading && <p>Loading policies...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {policies.length > 0 ? (
        <ul className="space-y-4">
          {policies.map((policy) => (
            <li key={policy.id} className="border-b pb-4">
              <h3 className="font-bold text-lg">{policy.title}</h3>
              <p>{policy.description}</p>
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
