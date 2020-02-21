const fetch = require('node-fetch');
const fs = require('fs');
const FormData = require('form-data');

async function getUploadForm() {
  const data = await (
    await fetch(
      "http://127.0.0.1:4001/s3/createsignedpost",
      {
        method: "POST",
        body: JSON.stringify({
          "bucket": "stakeholderclub",
          "expires": 3600,
          "conditions": [
            ["content-length-range", 	0, 5000000],
            ["starts-with", "$Content-Type", "image/"],
            ["eq", "$x-amz-meta-userid", 1]
          ],
          "fields": {
            "key": "testsefds2131243rsdfdsf"
          }
        }),
        headers: { 'Content-Type': 'application/json' }
      }
    )
  ).json();

  data.data.fields["x-amz-meta-userid"] = 1;

  console.log(data);

  return data.data;
}

const mimeTypes = {
  "html": "text/html",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "png": "image/png",
  "js": "text/javascript",
  "css": "text/css"
};

async function upload() {
  const filename = 'test/test.png';
  const data = await getUploadForm();
  const file = fs.readFileSync(filename);
  const formData = new FormData();

  var mimeType = mimeTypes[filename.split('.').pop()];

  console.log(mimeType);
  formData.append('Content-Type', mimeType);
  Object.entries(data.fields).forEach(([k, v]) => {
    formData.append(k, v);
  });
  formData.append('file', file); // must be the last one
  console.log(formData);
  return await fetch(data.url, {
    method: "POST",
    body: formData,
    headers: formData.getHeaders()
  });
}

(async () => {
  const result = await upload();
  console.log(result);
})();