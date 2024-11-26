interface PayloadValues {
  file: File;
  [key: string]: unknown; // This allows other arbitrary fields
}

export const modifyPayload = (values: PayloadValues) => {
  const obj = { ...values };
  const file = obj["file"];
  delete obj["file"];
  const data = JSON.stringify(obj);
  const formData = new FormData();
  formData.append("data", data);
  formData.append("file", file);

  return formData;
};
