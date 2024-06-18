import React from 'react'
import SignupForm from '../components/signup'
import Header from '../components/header'

const page = () => {
    return (
        <div className='color min-h-screen'>
            <Header />
            <div className="flex justify-center py-10">
                <SignupForm />
            </div>

        </div>
    )
}

export default page
