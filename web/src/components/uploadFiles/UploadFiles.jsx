import React from 'react'

export default function UploadFiles() {



  return (
    <>
        <form action="http://localhost:3000/upload-files" enctype="multipart/form-data" method="post">
            <input type="file" name="imagen" accept="video/mp4"></input>
            <input type="submit" value="Subir archivo" />
        </form>
    </>
  )
}
