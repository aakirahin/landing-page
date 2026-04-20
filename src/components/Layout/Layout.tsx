import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import ShapeGrid from '../ShapeGrid/ShapeGrid'

type Props = {
    children: React.ReactNode
}

const Layout = ({
    children
}: Props) => {
  return (
    <div className="flex-col-center gap-[108px] justify-center">
        <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
            <ShapeGrid
                speed={0.1}
                squareSize={36}
                direction="diagonal"
                borderColor="#00000005"
                shape="square"
            />
        </div>
        <NavBar/>
            {children}
        <Footer/>
    </div>
  )
}

export default Layout