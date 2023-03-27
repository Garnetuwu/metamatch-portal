import Label from "../UI/Label";
import Input from "../UI/Input";
import { useDispatch, useSelector } from "react-redux";

const RelationCard = ({
  name,
  score,
  special,
  counterComment,
  combo,
  comboComment,
  className,
}) => {
  const dispatch = useDispatch();

  const scoreChangeHandler = (e) => {
    const score = e.target.value;
    dispatch({
      type: "UPDATE_RELATION",
      payload: { name, relation: { score } },
    });
  };

  const stateChangeHandler = (e) => {
    dispatch({
      type: "UPDATE_RELATION",
      payload: { name, relation: { special: e.target.checked } },
    });
  };

  const counterCommentChangeHandler = (e) => {
    dispatch({
      type: "UPDATE_RELATION",
      payload: { name, relation: { counterComment: e.target.value } },
    });
  };

  const comboChangeHandler = (e) => {
    const comboScore = e.target.value;
    dispatch({
      type: "UPDATE_RELATION",
      payload: { name, relation: { combo: comboScore } },
    });
  };

  const comboCommentChangeHandler = (e) => {
    dispatch({
      type: "UPDATE_RELATION",
      payload: { name, relation: { comboComment: e.target.value } },
    });
  };

  return (
    <li className={`${className} bg-indigo p-3 m-2 rounded-md`}>
      <p className="text-md">{name}</p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="flex flex-col items-center">
            <Label htmlFor={name + "Score"} className="text-sm">
              Counter score:
            </Label>
            <Input
              className="bg-sand"
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
              className=" text-white w-[40%] text-center rounded-lg disabled:bg-metal disabled:text-gray-400"
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
            <Label htmlFor={name + "counterComment"} className="text-sm">
              Comment:
            </Label>
            <textarea
              disabled={score < 70 && score > -70 && !special}
              onChange={counterCommentChangeHandler}
              value={
                score < 70 && score > -70 && !special ? "" : counterComment
              }
              id={name + "counterComment"}
              className="outline-none bg-slate-500/70 text-white p-2 rounded-md disabled:bg-metal"
            />
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
          <div className="flex flex-col gap-2">
            <Label htmlFor={name + "combo comment"} className="text-sm">
              Comment:
            </Label>
            <textarea
              disabled={combo < 4}
              value={combo < 4 ? "" : comboComment}
              onChange={comboCommentChangeHandler}
              id={name + "combo comment"}
              className="outline-none bg-slate-500/70 text-white p-2 rounded-md disabled:bg-metal"
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default RelationCard;
