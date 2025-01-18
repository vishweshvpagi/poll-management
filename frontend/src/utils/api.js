// Simulated API Module
const API = {
  get: async (endpoint) => {
    // Simulate GET requests
    if (endpoint === "/example-endpoint") {
      return Promise.resolve({
        data: {
          message: "This is a dummy GET response for /example-endpoint",
          data: [1, 2, 3, 4], // Example dummy data
        },
        status: 200,
      });
    }
    return Promise.reject(new Error("Endpoint not found"));
  },

  post: async (endpoint, body) => {
    // Simulate POST requests
    if (endpoint === "/another-endpoint") {
      return Promise.resolve({
        data: {
          message: "This is a dummy POST response for /another-endpoint",
          success: true,
          receivedData: body, // Echo back the data sent
        },
        status: 201,
      });
    }
    return Promise.reject(new Error("Endpoint not found"));
  },
};

// Test the Dummy API
API.get("/example-endpoint")
  .then((response) => console.log("Dummy GET Response:", response.data))
  .catch((error) => console.error("Error:", error.message));

API.post("/another-endpoint", { dummy: "data" })
  .then((response) => console.log("Dummy POST Response:", response.data))
  .catch((error) => console.error("Error:", error.message));

export default API;
