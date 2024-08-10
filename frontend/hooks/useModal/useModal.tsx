import React, { useReducer, useCallback } from 'react'
import { createPortal } from 'react-dom';

type StateProp = {
  title?: string,
  size?: string,
  showHeader?: boolean,
  showModal?: boolean,
  className?: string,
  headerClassName?: string,
  onModalClose?: Function,
  onModalOpen?: Function
}

type ActionProp = {
  type: string,
  payload?: any
}

const reducer = (state: StateProp, action: ActionProp) => {
  const { type, payload } = action
  switch (type) {
    case "SET_MODAL_PROPS":
      return { ...state, ...payload }
    case "OPEN_MODAL":
      return { ...state, showModal: true }
    case "CLOSE_MODAL":
      return { ...state, showModal: false }

    default:
      return state
  }
}

const useModal = () => {
  const initialState = {
    title: "Modal",
    showHeader: true,
    showModal: false,
    size: "md",
    className: "",
    headerClassName: ""
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const modalProps = state;

  const setModalProps = (payload: StateProp) => {
    dispatch({ type: "SET_MODAL_PROPS", payload })
  }

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" })
  }

  const openModal = () => {
    dispatch({ type: "OPEN_MODAL" })
  }

  return {
    openModal,
    closeModal,
    modalProps,
    setModalProps,
  }
}

export default useModal

type ModalComponentProps = {
  children?: React.ReactNode,
  props: {
    showModal?: boolean,
    size?: string,
    hideHeader?: boolean,
    title?: string,
    className?: string,
    headerClassName?: string,
    onModalClose?: Function,
    onModalOpen?: Function
  },
  handleClose?: React.MouseEventHandler<HTMLButtonElement>

}

export const Modal = ({ children, props, handleClose }: ModalComponentProps) => {
  const modalSize: any = {
    sm: 'sm:max-w-sm sm:w-full m-3 sm:mx-auto',
    md: 'md:max-w-md md:w-full m-3 md:mx-auto',
    lg: 'lg:max-w-lg lg:w-full m-3 lg:mx-auto',
    xl: 'xl:max-w-4xl xl:w-full m-3 xl:mx-auto',
  }
  const wrapperClassName = `size-full fixed ${props.showModal ? 'z-[80]' : 'z-0 transition-all'}
    duration-300 ease-out overflow-x-hidden overflow-y-auto pointer-events-none`

  const contentClassName = `${props.showModal ? 'mt-7 opacity-100' : 'mt-0 opacity-0'} duration-300 p-5 ease-out 
      transition-all ${modalSize[props.size ?? 'sm']} min-h-[calc(100%-3.5rem)] flex items-center`

  const backdropClassName = `transition duration fixed ${props.showModal ? '' : 'hidden'} 
  w-screen h-screen z-[79] inset-0 bg-gray-900 bg-opacity-60 dark:bg-opacity-80 dark:bg-neutral-900`

  const closeButtonClassName = `
  flex justify-center items-center size-7 text-sm font-semibold rounded-full 
  border border-transparent text-gray-800 bg-gray-100 hover:bg-gray-300 disabled:opacity-50 
  disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700`

  function handleTransitionEvents (event: React.TransitionEvent<HTMLElement>){
    if (event.propertyName === 'opacity' && props.showModal === false){
      if (props.onModalClose){
        props.onModalClose()
      }
    }
    if (event.propertyName === 'opacity' && props.showModal === true){
      if (props.onModalOpen){
        props.onModalOpen()
      }
    }
  }

  return createPortal(<section className="relative">
    <aside className={wrapperClassName}>
      <aside onTransitionEnd={handleTransitionEvents} className={contentClassName}>
        <div className={`w-full flex flex-col shadow-sm rounded-xl pointer-events-auto  ${props.className}`}>
          <div className={`justify-between items-center py-3 px-4 border-b ${props.headerClassName} ${props.hideHeader ? 'hidden' : 'flex'}`}>
            <h3 className="">
              {props.title}
            </h3>
            <button
              type="button" onClick={handleClose}
              className={closeButtonClassName}>
              <span className="sr-only">Close</span>
              <svg className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
          <div className="overflow-y-auto">
            {children}
          </div>
        </div>
      </aside>
    </aside>
    <div className={backdropClassName}></div>
  </section>, document.getElementById('root-modal') as Element)
}
