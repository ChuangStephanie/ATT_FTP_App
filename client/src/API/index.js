const baseURL = "http://localhost:3001";

const uploadFile = async (file) => {
  if (!file) {
    alert("No file uploaded");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${baseURL}/upload-xml`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error uploading:`, error);
    throw error;
  }
};
