import { useRouter } from 'next/router';
import React from 'react'

const Unauthorized = () => {
    const router = useRouter();
    const { message } = router.query
  return (
    <>
      <div className='text-xl'>Acesso negado</div>
      {message && <div className='text-red-500'>{message}</div>}
    </>
    
  )
}

export default Unauthorized
