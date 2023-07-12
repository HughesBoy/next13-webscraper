import '@/app/globals.css'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='flex flex-col'>
      <Link href={'/'}>home</Link>
      <Link href={'/searchperson'}>search person</Link>
      <Link href={'/searchUFC'}>search ufc</Link>
    </div>
  )
}

export default Header