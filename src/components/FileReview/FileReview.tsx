import React from "react";
import FileViewer from "react-file-viewer";

type FilePreviewParams = {
  fileURL?: string;
  fileType?: string;
};

export default function FilePreview(props: FilePreviewParams) {
  const fileExtension = getFileExtension(props.fileType);
  console.log({ fileExtension, url: props.fileURL });

  const options = {
    supportedFileExtensions: [
      "pdf",
      "jpg",
      "jpeg",
      "png",
      "gif",
      "docx",
      "doc",
    ],
    allowFullScreen: false,
    externalViewer: true,
  };

  return (
    <div>
      <FileViewer
        fileType={fileExtension}
        filePath={props.fileURL}
        options={options}
      />
    </div>
  );
}

function getFileExtension(fileType: string | undefined) {
  if (!fileType) return "";

  return fileType.split("/").pop()?.toLowerCase();
}
