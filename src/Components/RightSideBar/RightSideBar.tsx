import React from 'react';

const RightSidebar = () => {
  return (
    <section className='sticky right-0 top-0 z-20 flex h-screen w-80 flex-col justify-start overflow-auto bg-white px-6 py-4 shadow-lg max-xl:hidden'>
      <div className='mb-6 pt-16'>
        <h3 className='text-md font-medium mb-2'>Catálogo de Veterinarias</h3>
        <ul className='list-disc list-inside text-gray-500 space-y-1'>
          <li>
            <a href='#' className='text-blue-500 hover:underline'>Veterinaria 1</a>
          </li>
          <li>
            <a href='#' className='text-blue-500 hover:underline'>Veterinaria 2</a>
          </li>
          <li>
            <a href='#' className='text-blue-500 hover:underline'>Veterinaria 3</a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className='text-md font-medium mb-2'>Catálogo de Documentos</h3>
        <ul className='list-disc list-inside text-gray-500 space-y-1'>
          <li>
            <a href='#' className='text-blue-500 hover:underline'>Documento 1</a>
          </li>
          <li>
            <a href='#' className='text-blue-500 hover:underline'>Documento 2</a>
          </li>
          <li>
            <a href='#' className='text-blue-500 hover:underline'>Documento 3</a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default RightSidebar;
