import React from 'react'

type PropsType = {
  children: React.ReactNode
}

const DefaultLayout = ({ children }: PropsType) => {
  return (
    <div className="bg-slate-900 text-white flex h-screen w-screen items-center justify-center overflow-hidden">
      {children}
    </div>
  )
}

export default DefaultLayout
