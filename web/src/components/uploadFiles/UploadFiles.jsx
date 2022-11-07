import React from 'react'

export default function UploadFiles() {



  return (
    <>
        <form action="http://localhost:3000/news" enctype="multipart/form-data" method="post">
            <input type="file" name="video" accept="video/mp4"></input>
            <input type="submit" value="Subir archivo" />
        </form>
    </>
  )
}
