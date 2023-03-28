import { useSelector } from "react-redux";
import Button from "../UI/Button";
import RelationDisplayCard from "./RelationDisplayCard";
import FlexDisplay from "../UI/FlexDisplay";

const RelationsDisplay = ({ onEditRelations, currentRole }) => {
  const relations = useSelector((state) => state.relationships);
  console.log(relations);
  const filteredRelations = relations.filter(
    (relation) => relation.hero.role === currentRole
  );
  const content = filteredRelations.map((relation) => (
    <RelationDisplayCard
      key={relation.hero._id}
      id={relation.hero._id}
      name={relation.hero.name}
      score={relation.score}
      combo={relation.combo}
      special={relation.special}
      counterComment={relation.counterComment}
      comboComment={relation.comboComment}
    />
  ));
  return (
    <FlexDisplay className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 place-items-center">
      {content}
      <Button
        className="col-span-full h-9 w-1/4 place-self-center"
        onClick={onEditRelations}
      >
        Edit relations
      </Button>
    </FlexDisplay>
  );
};

export default RelationsDisplay;
