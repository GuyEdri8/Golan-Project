import { NextRequest, NextResponse } from "next/server";
import { BlobServiceClient, StorageSharedKeyCredential, BlobSASPermissions, generateBlobSASQueryParameters, BlobSASSignatureValues } from "@azure/storage-blob";
import { insertProjectFile, NewProjectFile } from "@/lib/queries/insertProjectFile";

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME || "golanproject";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw new Error("Azure Storage Connection string not found");
}

// // Create the BlobServiceClient object with connection string
// const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

// Create a unique name for the blob

// Get a block blob client
// // Allowed file types
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// הוספת הגדרת ה-credentials בתחילת הקובץ
const account = process.env.AZURE_STORAGE_ACCOUNT || "";
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY || "";
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

// export async function generateSASUrl(fileName: string): Promise<string> {
//   const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
//   const blobClient = containerClient.getBlobClient(fileName);
//   const permissions = BlobSASPermissions.parse("r"); // Read-only permission
//   const sasToken = generateBlobSASQueryParameters(
//     {
//       containerName: CONTAINER_NAME,
//       blobName: fileName,
//       permissions: permissions, // Read permissions
//       expiresOn: new Date(new Date().valueOf() + 3600 * 1000), // 1 hour from now
//     },
//     sharedKeyCredential
//   ).toString();

//   return `${blobClient.url}?${sasToken}`;
// }

// // Function for PUT requests
export async function PUT(req: NextRequest, res: NextResponse) {
  if (req.method !== "PUT") {
    return NextResponse.json({ error: "Method not allowed. Use PUT.." }, { status: 405 });
  }

  try {
    const my_req = await req.json();
    const { fileName, fileContent, fileType, fileSize, project_id } = my_req;
    
    const ALLOWED_FILE_TYPES = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!fileName || !fileContent || !fileType || typeof fileSize !== "number") {
      return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
    }
    
    if (!ALLOWED_FILE_TYPES.includes(fileType)) {
      return NextResponse.json({ error: `Invalid file type: ${fileType}` }, { status: 400 });
    }
    
    if (fileSize > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File size exceeds the 5 MB limit." }, { status: 400 });
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING!
    );
    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
    const blockBlobClient = containerClient.getBlockBlobClient(`project_${project_id}/${fileName}`);
    
    const base64Data = fileContent.replace(/^data:.+;base64,/, '');
    const binaryData = Buffer.from(base64Data, 'base64');
    
    await blockBlobClient.upload(binaryData, binaryData.length, {
      blobHTTPHeaders: {
        blobContentType: fileType,
        blobContentDisposition: `inline; filename="${encodeURIComponent(fileName)}"`,
      }
    });

    // const sasOptions: BlobSASSignatureValues = {
    //   containerName: CONTAINER_NAME,
    //   blobName: `project_${project_id}/${fileName}`,
    //   permissions: BlobSASPermissions.parse("r"),
    //   startsOn: new Date(),
    //   expiresOn: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // תוקף לשנה
    //   contentDisposition: `inline; filename="${encodeURIComponent(fileName)}"`,
    //   contentType: fileType,
    // };

    // const sasToken = generateBlobSASQueryParameters(
    //   sasOptions,
    //   sharedKeyCredential
    // ).toString();


    const fileInsert: NewProjectFile = {
      project_id: project_id,
      file_name: fileName,
      file_path: blockBlobClient.url,
      file_size: fileSize,
      file_type: fileType,
      uploaded_by: 1,
    }
    
    await insertProjectFile(fileInsert)
    return NextResponse.json({ 
      message: "File uploaded successfully.",
      original_path: blockBlobClient.url
    }, { status: 201 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
