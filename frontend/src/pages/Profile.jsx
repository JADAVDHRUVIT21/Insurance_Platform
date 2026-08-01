import { useEffect, useState } from "react";
import { getProfile } from "../services/profileService";
import ProfileCard from "../components/ProfileCard";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const data = await getProfile();

      setProfile(data.user);

      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          color: "white",
          textAlign: "center",
          padding: "50px"
        }}
      >
        Loading Profile...
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          color: "white",
          marginBottom: "25px"
        }}
      >
        👤 My Profile
      </h1>

      {error && (
        <div
          style={{
            background: "#7f1d1d",
            color: "#fecaca",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px"
          }}
        >
          {error}
        </div>
      )}

      {profile && <ProfileCard profile={profile} />}
    </div>
  );
}