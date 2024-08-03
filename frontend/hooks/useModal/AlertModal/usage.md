#### Usage
    
    import AlertModal, { AlertModalActions } from '@components/Modal/AlertModal'
    
    ...
    const { showAlertModal, setAlert} = AlertModalActions()
    
    useEffect(() => {
      setAlert({
        type: "success",
        message: "You have successfully completed your task for creating custom hooks.",
      })
      showAlertModal()
    }, [])
    
    ...
    
    <AlertModal/>
