import React from 'react'
import { Modal } from "@hooks/useModal"
import { useAppDispatch, useAppSelector } from "@hooks/useRedux"
import { setAlertModal } from '@store/features/system/systemSlice'

export type AlertModalProps = {
  showModal?: boolean,
  type?: string,
  hideHeader?: boolean,
  title?: string | React.ReactNode,
  message?: string | React.ReactNode,
  onClose?: Function,
  parentClassName?: string,
  titleClassName?: string,
  messageClassName?: string,
}

export const initialAlertModalState = {
  showModal: false,
  type: 'success',
  hideHeader: true,
  title: "Success",
  message: "...",
  onClose: ()=>{},
  parentClassName: "bg-cyan-700 bg-opacity-80 text-white flex flex-col rounded-md items-center justify-center p-5",
  titleClassName: "text-[25px]",
  messageClassName: "text-center",
}

const AlertModal = () => {
  const alert = useAppSelector((state) => state.system.alertModal) as AlertModalProps
  const { handleClose } = AlertModalActions()

  const returnPropsForModal = {
    showModal: alert.showModal,
    hideHeader: alert.hideHeader,
    onModalClose: alert.onClose
  }

  return (
    <Modal props={returnPropsForModal}>
      <div className={alert.parentClassName}>
        <div className={alert.titleClassName}>
          {alert.title}
        </div>
        <div className={alert.messageClassName}>
          {alert.message}
        </div>
        <div className="flex items-center justify-center mt-5">
          <button
            className='bg-cyan-900 text-white py-1 px-5 rounded-md'
            onClick={handleClose}>Close</button>
        </div>
      </div>
    </Modal>
  )
}

export const AlertModalActions = () => {
  const dispatch = useAppDispatch()

  const setAlert = (data: AlertModalProps) => {
    dispatch(setAlertModal(data))
  }

  const handleClose = () => {
    setAlert({ showModal: false })
  }
  
  const showAlertModal = () => {
    setAlert({ showModal: true })
  }

  return {
    handleClose,
    showAlertModal,
    setAlert
  }
}

export default AlertModal
