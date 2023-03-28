import Label from "../UI/Label";
import Input from "../UI/Input";
import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button";
import { useState } from "react";
import Modal from "../UI/Modal";

const RelationCard = ({
  name,
  score,
  special,
  counterComment,
  combo,
  comboComment,
  className,
  touched,
}) => {
  const [isEditingComboComment, setIsEditingComboComment] = useState(false);
  const [isEditingCounterComment, setIsEditingCounterComment] = useState(false);

  const dispatch = useDispatch();
  const heroName = useSelector((state) => state.name);

  const counterCommentStandard = score >= 70 || score <= -70 || special;
  const comboCommentStandard = combo == 4 ? true : false;

  const dispatchChange = (payload) => {
    dispatch({
      type: "UPDATE_RELATION",
      payload: { name, relation: { ...payload } },
    });
  };

  const scoreChangeHandler = (e) => {
    dispatchChange({ score: e.target.value });
  };

  const stateChangeHandler = (e) => {
    dispatchChange({ special: e.target.checked });
  };

  const counterCommentChangeHandler = (e) => {
    dispatchChange({ counterComment: e.target.value });
  };

  const comboChangeHandler = (e) => {
    dispatchChange({ combo: e.target.value });
  };

  const comboCommentChangeHandler = (e) => {
    dispatchChange({ comboComment: e.target.value });
  };

  return (
    <>
      {isEditingComboComment && (
        <Modal
          hidden={true}
          title={`${heroName} + ${name}`}
          onCancel={() => setIsEditingComboComment(false)}
        >
          <textarea
            disabled={!comboCommentStandard}
            value={comboComment}
            onChange={comboCommentChangeHandler}
            className="comment"
          />
        </Modal>
      )}

      {isEditingCounterComment && (
        <Modal
          hidden={true}
          title={`${heroName} VS ${name}...`}
          onCancel={() => setIsEditingCounterComment(false)}
        >
          <textarea
            disabled={!counterCommentStandard}
            value={counterComment}
            onChange={counterCommentChangeHandler}
            className="comment"
          />
        </Modal>
      )}

      <li
        className={`${className} p-3 m-2 rounded-md ${
          touched ? "bg-slate-800" : "bg-indigo"
        }`}
      >
        <p className="text-md">{name}</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="flex flex-col items-center">
              <Label htmlFor={name + "Score"} className="text-sm">
                Counter score:
              </Label>
              <Input
                onChange={scoreChangeHandler}
                type="range"
                min="-100"
                max="100"
                value={special ? 0 : score}
                id={name}
                disabled={special}
              />
              <Input
                disabled={special}
                type="number"
                value={special ? 0 : score}
                min="-100"
                max="100"
                onChange={scoreChangeHandler}
                className=" text-white w-[40%] text-center rounded-lg disabled:bg-gray-500"
              />
            </div>
            <div className="flex justify-between">
              <Label htmlFor={name + "Special"} className="text-sm">
                Special hero?
              </Label>
              <Input
                checked={special}
                type="checkbox"
                onChange={stateChangeHandler}
                id={name + "Special"}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                disabled={!counterCommentStandard}
                type="button"
                className="border-[1px] py-2 border-white disabled:bg-gray-500 disabled:border-none"
                onClick={() => setIsEditingCounterComment(true)}
              >
                edit comment
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-3 justify-between">
            <div className="flex flex-col items-center">
              <Label for={`${name} combo`} className="text-sm">
                Combo score:
              </Label>
              <Input
                type="range"
                min="0"
                max="4"
                step="1"
                id="combo"
                onChange={comboChangeHandler}
                value={combo}
              />
              <div className="w-full grid grid-cols-5 place-items-center text-[0.7rem] -mt-3">
                <span>NA</span>
                <span>C</span>
                <span>B</span>
                <span>A</span>
                <span>S</span>
              </div>
            </div>
            <Button
              disabled={!comboCommentStandard}
              type="button"
              className="border-[1px] py-2 border-white disabled:bg-gray-500 disabled:border-none"
              onClick={() => setIsEditingComboComment(true)}
            >
              edit comment
            </Button>
          </div>
        </div>
      </li>
    </>
  );
};

export default RelationCard;
