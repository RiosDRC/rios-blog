import React from 'react'

export default function Desc({element}) {
  return (
    <div
        dangerouslySetInnerHTML={{
            __html: element
        }}
    ></div>
  )
}
