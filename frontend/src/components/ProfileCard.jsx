import { useState } from "react";

export default function ProfileCard({ profile, onUploadPicture, onDeletePicture }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        await onUploadPicture(file);
      } catch (error) {
        console.error("Error uploading picture:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div
      style={{
        background: "#1f2937",
        padding: "30px",
        borderRadius: "12px",
        marginBottom: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white"
      }}
    >
      {/* Profile Picture */}
      <div style={{ position: "relative", marginBottom: "20px" }}>
        {profile?.profile_picture ? (
          <img
            src={profile.profile_picture}
            alt="Profile"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid #2563eb"
            }}
          />
        ) : (
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "#374151",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
              border: "4px solid #2563eb"
            }}
          >
            {profile?.name ? profile.name.charAt(0).toUpperCase() : "?"}
          </div>
        )}

        {/* Upload/Delete Picture Buttons */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            display: "flex",
            gap: "5px"
          }}
        >
          <label
            style={{
              background: "#2563eb",
              color: "white",
              padding: "6px 10px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "16px",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            📷
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              disabled={isUploading}
            />
          </label>
          {profile?.profile_picture && (
            <button
              onClick={onDeletePicture}
              style={{
                background: "#dc2626",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: "16px",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              🗑️
            </button>
          )}
        </div>
      </div>

      {isUploading && (
        <div style={{ color: "#fbbf24", marginBottom: "10px" }}>
          ⏳ Uploading...
        </div>
      )}

      {/* User Information */}
      <h2 style={{ fontSize: "24px", marginBottom: "5px" }}>
        {profile?.name || "User Name"}
      </h2>
      <p style={{ color: "#9ca3af", marginBottom: "15px" }}>
        {profile?.role || "Role"} • {profile?.department || "Department"}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "15px",
          width: "100%",
          maxWidth: "400px",
          marginTop: "10px"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "14px", color: "#9ca3af" }}>Email</div>
          <div style={{ fontSize: "14px" }}>{profile?.email || "N/A"}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "14px", color: "#9ca3af" }}>Phone</div>
          <div style={{ fontSize: "14px" }}>{profile?.phone || "N/A"}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "14px", color: "#9ca3af" }}>Member Since</div>
          <div style={{ fontSize: "14px" }}>
            {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
}