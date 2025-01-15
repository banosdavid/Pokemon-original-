export default function Loading() {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>Loading...</p>
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "5px solid #ccc",
            borderTop: "5px solid #007bff",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "10px auto",
          }}
        ></div>
        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }