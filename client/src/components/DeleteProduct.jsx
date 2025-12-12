import React from 'react'

const DeleteProduct = ({ isOpen, onClose, onDelete, productName }) => {
    if (!isOpen) return null;

    return (
      <div className='fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm'>
        <div className='bg-white h-48 w-4/12 flex rounded-2xl p-4 flex-col items-end justify-between relative shadow-2xl'>
         
          <h1 onClick={onClose} className='absolute top-4 right-4 text-2xl font-bold cursor-pointer hover:text-red-500'>X</h1>
          
          <div className='gap-2 flex flex-col p-2 w-full'>
            <h3 className='text-[#363942] text-2xl font-bold'>Delete Product</h3>
            <p className='text-gray-800'>
              Are you sure you really want to delete <span className='font-extrabold text-[#363942]'> "{productName}" </span>?
            </p>
          </div>
          
          <button 
            onClick={onDelete} 
            className='bg-[#000FB4] h-10 w-20 text-white rounded-xl hover:bg-blue-800 transition-colors'
          >
            Delete
          </button>
        </div>
    </div>
  )
}

export default DeleteProduct