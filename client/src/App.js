import { useState, useEffect } from "react";
function App() {
  const [file, setFile] = useState();
  const [code, setCode] = useState();
  const [_data, setData] = useState();
  useEffect(() => {}, [code]);

 

  const handleDownload = async () => {
    const res = await fetch(`http://localhost:5000/${_data}`, {
      method: "GET",
    });
    const data = await res.json();
    console.log(data.file)
    const link = document.createElement('a');
                    link.href = data.file;
                    // link.setAttribute('download', 'file');
                    document.body.appendChild(link);
                    link.click();
  };

  const handleUpload = async () => {
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("http://localhost:5000", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      setCode(data.code);
      console.log(await res.json());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>File Upload</h1>
      <input
        onChange={(e) => setFile(e.target.files[0])}
        type="file"
        name="file"
        id=""
      />
      <button onClick={() => handleUpload()}>Upload File</button>
      {code ? (
        <>
          <div >Code : {code}</div>{" "}
        </>
      ) : (
        <></>
      )}

      <h1>Enter Code</h1>
      <input type="text" onChange={(e) => setData(e.target.value)} />
      <button onClick={() => handleDownload()}>Download</button>
    </>
  );
}

export default App;
