#### Usage

    import useModal, { Modal } from "@hooks/useModal"
    ...
    
    const { openModal, closeModal, modalProps, setModalProps } = useModal()

      useEffect(() => {
        setModalProps({
          title: "Get Updates",
          className: 'bg-cyan-700 bg-opacity-90 text-white',
          headerClassName: 'text-white border-cyan-800',
          onModalOpen: () => { console.log("The modal has been shown.") },
          onModalClose: () => { console.log("The modal has been hidden.") }
        })
       
        openModal()
      }, [])
        
    ...
    
    <Modal props={modalProps} handleClose={closeModal}>
      <div className='p-5 text-center'>This website has integrated
        <span className='text-cyan-200 mx-1'>FCM</span>and<span className='text-cyan-200 mx-1'>Workbox</span>
        for better experience. Please allow notification to receive quality updates.</div>
      <div className="flex items-center justify-center gap-4 mb-4">
        <button className='text-slate-300 hover:text-white' onClick={closeModal}>Not Now</button>
        <button className='bg-cyan-600 hover:bg-cyan-800 py-1 px-4 rounded-md' onClick={handleAllowNotification}>Allow</button>
      </div>
    </Modal>
