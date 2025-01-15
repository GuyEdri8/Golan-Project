import { BlobServiceClient } from "@azure/storage-blob";
import { NextResponse, NextRequest } from "next/server";
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

const CONTAINER_NAME = "golanproject";

if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw new Error("Azure Storage Connection string not found");
}

// Create the BlobServiceClient object with connection string
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

// Create a unique name for the blob

// Get a block blob client
// // Allowed file types
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

type ApiResponse = {
  message?: string;
  requestId?: string;
  error?: string;
};

// // Function for PUT requests
export async function PUT(req: NextRequest, res: NextResponse<ApiResponse>) {
  if (req.method !== "PUT") {
    return NextResponse.json({ error: "Method not allowed. Use PUT.." }, { status: 405 });
  }

  try {
    const my_req = await req.json();
    const { fileName, fileContent, fileType, fileSize } = my_req;
    // Validate input
    if (!fileName || !fileContent || !fileType || typeof fileSize !== "number") {
        return NextResponse.json({ error: "Invalid request payload. Check fileName, fileContent, fileType, and fileSize." }, { status: 400 });
    }
    
    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(fileType)) {
        return NextResponse.json({ error: "Invalid file type. Only PDF, Excel, and Word files are allowed." }, { status: 400 });
    }
    
    // Validate file size
    if (fileSize > MAX_FILE_SIZE) {
        return NextResponse.json({ error: "File size exceeds the 5 MB limit." }, { status: 400 });
    }
    
    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
    
    // Ensure the container exists
    const containerExists = await containerClient.exists();
    if (!containerExists) {
        await containerClient.create();
    }
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    
    // Upload file content to Azure Blob Storage
    const uploadBlobResponse = await blockBlobClient.upload(fileContent, Buffer.byteLength(fileContent));
    
    return NextResponse.json({   message: "File uploaded successfully.",requestId: uploadBlobResponse.requestId}, { status: 201 });
} catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
