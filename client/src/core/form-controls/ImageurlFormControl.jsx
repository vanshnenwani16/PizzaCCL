import React, { useState } from "react";
import { Form } from "react-bootstrap";

function ImageurlFormControl({ formik }) {
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("image", file);

    // Create preview for selected image
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label className="float-left">Pizza Image</Form.Label>
      <Form.Control
        type="file"
        accept="image/*"
        name="image"
        onChange={handleImageChange}
        isInvalid={formik.touched.image && Boolean(formik.errors.image)}
        isValid={formik.touched.image && !Boolean(formik.errors.image)}
      />
      {formik.touched.image && Boolean(formik.errors.image) && (
        <Form.Control.Feedback type="invalid">
          <span className="float-left">{formik.errors.image}</span>
        </Form.Control.Feedback>
      )}

      {/* Show current image URL if editing */}
      {formik.values.imageUrl && !previewImage && (
        <div className="mt-2">
          <p>Current image:</p>
          <img
            src={formik.values.imageUrl}
            alt="Current pizza"
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        </div>
      )}

      {/* Image preview */}
      {previewImage && (
        <div className="mt-2">
          <p>Image preview:</p>
          <img
            src={previewImage}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        </div>
      )}
    </Form.Group>
  );
}

export default ImageurlFormControl;
