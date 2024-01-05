/* eslint-disable jsx-a11y/img-redundant-alt */
import { FileImageOutlined } from "@ant-design/icons";
import "./FilePreview.css";

type FilePreviewParams = {
  fileURL?: string;
  fileType?: string;
  fileName?: string;
};

export default function FilePreview(props: FilePreviewParams) {
  const isImageFile = props.fileType?.includes("image");

  const handleDownload = () => {
    if (!props.fileURL) return;

    fetch(props.fileURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement("a");
        a.href = url;
        a.download = props.fileName || "download";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading the file:", error);
      });
  };

  return (
    <div className="file-preview-wrapper" onClick={handleDownload}>
      {isImageFile ? (
        <img className="image-file" src={props.fileURL} alt={props.fileName} />
      ) : (
        <div className="file-name">
          <FileImageOutlined />
          <span>{props.fileName}</span>
        </div>
      )}
    </div>
  );
}
