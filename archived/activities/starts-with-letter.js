// import Link from 'next/Link'
// import { toJson } from 'unsplash-js'
// import { useState, useEffect } from 'react'

// import ImageClient from '../image-client'
// import { randomLetter } from '../utils'

// export default function startsWithLetter() {
//   const [images, setImages] = useState(null)

//   const RANDOM_LETTER = randomLetter()

//   const [started, setStarted] = useState(false)
//   const [loading, setLoading] = useState(false)

//   const loadImages = () => {
//     setLoading(true)
//     setStarted(true)

//     ImageClient.search
//       .photos('umbrella')
//       .then(toJson)
//       .then((response) => {
//         setImages(response.results)
//         setLoading(false)
//       })
//   }

//   return (
//     <div className="paper container">
//       <h2>
//         Activities: Find all the images starting with letter "{RANDOM_LETTER}"
//       </h2>

//       {loading && <h4>Loading</h4>}

//       {images && started ? (
//         <ul>
//           {images.map((i) => (
//             <img src={i.urls.thumb} />
//           ))}
//         </ul>
//       ) : (
//         <h4>Press "Start Game" to begin</h4>
//       )}

//       <button onClick={() => loadImages()}>Start Game</button>

//       <hr />
//       <Link href="/">
//         <a>Home</a>
//       </Link>
//     </div>
//   )
// }
