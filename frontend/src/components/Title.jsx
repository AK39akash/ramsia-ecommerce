import React from 'react'

const Title = ( {text1, text2, text3} ) => {
    return (
        <div className='inline-flex gap-2 items-center'>
            <p>
                <span className='text-gray-800'>{text1}</span>
                <span className='text-gray-500'> {text2}</span>
                <span className='text-gray-800'> {text3}</span>
            </p>
            <p className='w-8 sm:w-12 h-[2px] sm:h-[2px] bg-gray-700'></p>
        </div>
    )
}

export default Title
