import { useState } from "react";

export default function ProfileCard({
  profile,
  onUploadPicture,
  onDeletePicture,
}) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);
      await onUploadPicture(file);
    } catch (err) {
      console.error(err);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const imageUrl =
    profile?.profile_picture ||
    profile?.profileImage ||
    profile?.image ||
    null;

  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 16,
        padding: 30,
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
      }}
    >
      {/* ================= Profile Image ================= */}

      <div
        style={{
          position: "relative",
          width: 130,
          height: 130,
          marginBottom: 20,
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Profile"
            style={{
              width: "130px",
              height: "130px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid #2563eb",
            }}
          />
        ) : (
          <div
            style={{
              width: "130px",
              height: "130px",
              borderRadius: "50%",
              background: "#374151",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 50,
              fontWeight: "bold",
              border: "4px solid #2563eb",
            }}
          >
            {profile?.name
              ? profile.name.charAt(0).toUpperCase()
              : "U"}
          </div>
        )}

        {/* Upload Button */}

        <label
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: 36,
            height: 36,
            background: "#2563eb",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            fontSize: 18,
            border: "2px solid white",
          }}
        >
          📷

          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            disabled={uploading}
            onChange={handleFileChange}
          />
        </label>

        {/* Delete */}

        {imageUrl && (
          <button
            onClick={onDeletePicture}
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: 36,
              height: 36,
              background: "#dc2626",
              color: "#fff",
              border: "2px solid white",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Upload Status */}

      {uploading && (
        <p
          style={{
            color: "#facc15",
            marginBottom: 15,
          }}
        >
          Uploading...
        </p>
      )}

      {/* ================= User Details ================= */}

      <h2
        style={{
          margin: 0,
          fontSize: 28,
        }}
      >
        {profile?.name || "User"}
      </h2>

      <p
        style={{
          color: "#9ca3af",
          marginTop: 6,
          marginBottom: 25,
        }}
      >
        {profile?.role || "Employee"}
        {" • "}
        {profile?.department || "Department"}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: 20,
          width: "100%",
        }}
      >
        <Info title="Email" value={profile?.email} />

        <Info title="Phone" value={profile?.phone} />

        <Info
          title="Member Since"
          value={
            profile?.created_at
              ? new Date(profile.created_at).toLocaleDateString()
              : "N/A"
          }
        />

        <Info title="City" value={profile?.city} />

        <Info title="State" value={profile?.state} />

        <Info title="Address" value={profile?.address} />
      </div>
    </div>
  );
}

function Info({ title, value }) {
  return (
    <div
      style={{
        background: "#111827",
        padding: 15,
        borderRadius: 10,
      }}
    >
      <div
        style={{
          color: "#9ca3af",
          fontSize: 13,
          marginBottom: 5,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontWeight: 500,
          wordBreak: "break-word",
        }}
      >
        {value || "N/A"}
      </div>
    </div>
  );
}