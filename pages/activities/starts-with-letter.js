import Link from 'next/Link'
import { toJson } from 'unsplash-js'
import ImageClient from '../image-client'
import { useState } from 'react'

export default function startsWithLetter() {
  const [images, setImages] = useState(null)

  ImageClient.search
    .photos('umbrella')
    .then(toJson)
    .then((response) => {
      setImages(response.results)
    })

  return (
    <>
      <h1>Exercises: Find all the images starting with letter</h1>

      {images && (
        <ul>
          {images.map((i) => (
            <img src={i.urls.thumb} />
          ))}
        </ul>
      )}

      <Link href="/">
        <a>Home</a>
      </Link>
    </>
  )
}
