import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import {
  getProfile,
  uploadProfilePicture,
  deleteProfilePicture,
} from "../services/profileService";

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

      setProfile(data.user || data.profile || data);

      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadPicture = async (file) => {
    try {
      const formData = new FormData();
      formData.append("profile_picture", file);

      await uploadProfilePicture(formData);

      await fetchProfile();

      alert("Profile picture uploaded successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to upload profile picture.");
    }
  };

  const handleDeletePicture = async () => {
    if (!window.confirm("Delete profile picture?")) return;

    try {
      await deleteProfilePicture();

      await fetchProfile();

      alert("Profile picture deleted.");
    } catch (err) {
      console.error(err);
      alert("Failed to delete profile picture.");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          color: "white",
          textAlign: "center",
          padding: "60px",
          fontSize: "20px",
        }}
      >
        Loading Profile...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          color: "white",
          marginBottom: "30px",
          fontSize: "32px",
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
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      {profile && (
        <ProfileCard
          profile={profile}
          onUploadPicture={handleUploadPicture}
          onDeletePicture={handleDeletePicture}
        />
      )}
    </div>
  );
}