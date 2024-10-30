import Footer from '@/components/Ui/Shared/Footer/Footer'
import Navbar from '@/components/Ui/Shared/Navbar/Navbar'
import React from 'react'

const CommonLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <Navbar/>
        <div className='min-h-screen'>{children}</div>
        <Footer/>
    </div>
  )
}

export default CommonLayout