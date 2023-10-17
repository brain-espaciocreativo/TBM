import React from 'react';
import {config} from '../../config/config'

export default function UploadFiles() {



  return (
    <>
        <form action={config.apiURL+}"/news" enctype="multipart/form-data" method="post">
            <input type="file" name="video" accept="video/mp4"></input>
            <input type="submit" value="Subir archivo" />
        </form>
    </>
  )
}
