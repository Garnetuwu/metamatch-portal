import Button from "./Button";
import ReactDOM from "react-dom";

const ModalOverlay = ({ children, title, hidden, onCancel, onAction }) => {
  return (
    <div className="fixed w-full h-full flex justify-center items-center p-10">
      <div
        className="bg-gray-700/50 fixed z-0 w-full h-full"
        onClick={onCancel}
      />
      <div className="z-10 max-w-lg rounded-md grid grid-cols-2 place-items-center bg-sand p-5 gap-3 text-onyx border-dirty-pink border-2">
        <div className="col-span-full font-bold">{title}</div>
        <div className="col-span-full">{children}</div>
        <Button className={hidden ? "hidden" : ""} onClick={onAction}>
          DELETE
        </Button>
        <Button className={hidden ? "col-span-full" : ""} onClick={onCancel}>
          Back
        </Button>
      </div>
    </div>
  );
};
const Modal = ({ children, title, hidden, onCancel, onAction }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay
          title={title}
          hidden={hidden}
          onAction={onAction}
          onCancel={onCancel}
        >
          {children}
        </ModalOverlay>,
        document.querySelector("#overlay-root")
      )}
    </>
  );
};

export default Modal;
