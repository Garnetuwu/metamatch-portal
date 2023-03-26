import Button from "./Button";

const Modal = ({ children, className, onCancel, onAction }) => {
  return (
    <>
      <div className="absolute top-0 bottom-0 left-0 right-0 m-auto flex justify-center items-center">
        <div className="z-10 rounded-md grid grid-cols-2 bg-sand p-5 gap-3 text-onyx border-dirty-pink border-2">
          <div className="col-span-full font-bold">{children}</div>
          <Button onClick={onAction}>DELETE</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
        <div className="bg-gray-700/50 w-full h-full absolute z-0" />
      </div>
    </>
  );
};

export default Modal;
