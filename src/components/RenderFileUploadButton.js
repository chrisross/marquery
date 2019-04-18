import React from "react";
import { Button } from "@material-ui/core";

const HTMLFileUploadInput = props => {
  let fileReader;
  let fileName;
  const { uploadSuccess, ...rest } = props;

  const handleFileRead = () =>
    uploadSuccess({
      name: fileName,
      data: fileReader.result
    });

  const handleFileChosen = file => {
    fileName = file.name;
    fileReader = new FileReader();
    fileReader.onerror = () => console.log("File Error");
    fileReader.onloadstart = () => console.log("File Load start");
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <input
      type="file"
      {...rest}
      accept="*.html"
      onChange={e => handleFileChosen(e.target.files[0])}
    />
  );
};

const wrapHOC = Component => props => <Component {...props} />;

const RenderFileUploadButton = ({
  label,
  input,
  uploadSuccess,
  fileInputComponent
}) => {
  const WrappedComponent = wrapHOC(fileInputComponent);
  return (
    <Button variant="contained" component="label">
      {label}
      <WrappedComponent
        {...input}
        uploadSuccess={uploadSuccess}
        style={{ display: "none" }}
      />
    </Button>
  );
};

const RenderHTMLFileUploadButton = props => (
  <RenderFileUploadButton {...props} fileInputComponent={HTMLFileUploadInput} />
);

export {
  RenderFileUploadButton,
  HTMLFileUploadInput,
  RenderHTMLFileUploadButton
};
