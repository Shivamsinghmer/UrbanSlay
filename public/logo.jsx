import Image from 'next/image'
import React from 'react'

const logo = () => {
  return (
    <Image src="/logo.png" alt="Logo" width={100} height={100} />
  )
}

export default logo