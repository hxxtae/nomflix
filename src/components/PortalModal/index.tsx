import { ReactChild } from 'react';
import ReactDOM from 'react-dom'

interface IPortalModal {
  children: ReactChild;
}

function PortalModal({ children }: IPortalModal) {
  const modalRoot = document.querySelector('#modal-root') as Element;

  return ReactDOM.createPortal(children, modalRoot);
}

export default PortalModal;
