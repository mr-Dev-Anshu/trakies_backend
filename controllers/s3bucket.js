import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIATCKAQLBEBXTI6OQ4",
    secretAccessKey: "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",
  },
});
export const putObject = async (req, res) => {
  try {
    const { fileName, contentType } = req.body;
    console.log("this is req.body from putObject", req.body);
    console.log(fileName, contentType);
    if (!fileName || !contentType) {
      throw new Error("Please provide the fileName and contentType ");
    }
    const command = new PutObjectCommand({
      Bucket: "sanathana.sarthi",
      Key: `uploads/${fileName}`,
      ContentType: contentType,
    });
    const getUrl = await getSignedUrl(s3Client, command);
    res.status(200).json(getUrl);
  } catch (error) {
    res.status(500).json(error?.message);
  }
};