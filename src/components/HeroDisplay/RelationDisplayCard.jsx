import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import Tag from "../UI/Tag";

const transformCombo = (score) => {
  if (score === 0) return "N/A";
  if (score === 1) return "C";
  if (score === 2) return "B";
  if (score === 3) return "A";
  if (score === 4) return "S";
};

const RelationDisplayCard = ({
  id,
  name,
  score,
  special,
  counterComment,
  combo,
  comboComment,
}) => {
  const [showComment, setShowComment] = useState(false);
  const [showAgainst, setShowAgainst] = useState("against");
  return (
    <>
      {showComment && (
        <Modal
          hidden="true"
          title={showAgainst ? `against ${name}` : `combos with ${name}`}
          onCancel={() => {
            setShowComment(false);
          }}
        >
          {showAgainst ? counterComment : comboComment}
        </Modal>
      )}
      <div className="place-self-stretch flex flex-col p-2 rounded-lg  bg-indigo border-2 border-sand">
        <Link
          to={`/heroes/${id}`}
          className="font-semibold text-center hover:underline hover:font-bold underline-offset-4 pb-3"
        >
          {name}
        </Link>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2 items-center bg-metal border-sand rounded-md p-3">
            <p className=" text-sand underline">Counter</p>
            {special && <Tag className="bg-dirty-pink w-2/3">special</Tag>}
            {!special && <p className="font-semibold">score: {score}</p>}
            <p className="whitespace-pre-wrap italic text-gray-300">
              {counterComment === "" && "no comment"}
              {counterComment !== "" && (
                <Button
                  className="whitespace-nowrap leading-6"
                  onClick={() => {
                    setShowComment(true);
                    setShowAgainst(true);
                  }}
                >
                  view comment
                </Button>
              )}
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center bg-metal border-sand rounded-md py-2">
            <p className=" text-sand underline">Combo</p>
            <p className="font-semibold">combo: {transformCombo(combo)}</p>
            <p className="whitespace-pre-wrap italic text-gray-300">
              {comboComment === "" && "no comment"}
              {comboComment !== "" && (
                <Button
                  className="whitespace-nowrap leading-6"
                  onClick={() => {
                    setShowComment(true);
                    setShowAgainst(false);
                  }}
                >
                  view comment
                </Button>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RelationDisplayCard;
