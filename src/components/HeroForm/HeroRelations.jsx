import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button";
import Divider from "../UI/Divider";
import FlexDisplay from "../UI/FlexDisplay";
import RelationSegment from "./RelationSegment";
const HeroRelations = ({
  isSuccess,
  isError,
  isLoading,
  error,
  onCancel,
  onUpdateRelation,
  relations: originalRelations,
  currentRole,
}) => {
  const dispatch = useDispatch();
  const relations = useSelector((state) => state.relationships);
  const heroRelations = useSelector((state) => state.relationships);
  const filteredRelations = heroRelations.filter(
    (relation) => relation.hero.role === currentRole
  );

  const cancelButtonHandler = () => {
    dispatch({ type: "UPDATE", payload: { relationships: originalRelations } });
    onCancel();
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    const touchedRelations = relations.filter((relation) => relation.touched);
    let relationsData = [];
    touchedRelations.map((relation) => {
      const { touched, ...relationData } = relation;
      if (relation.special) {
        relationData.score = 0;
      }
      if (relation.score < 70 && relation.score > -70 && !relation.special) {
        relationData.counterComment = "";
      }

      relationsData.push(relationData);
    });
    onUpdateRelation(relationsData);
  };

  return (
    <FlexDisplay>
      <form className="contents" action="/" onSubmit={submitFormHandler}>
        <RelationSegment roleName={currentRole} relations={filteredRelations} />
        <Divider className="col-span-full" />
        <Button type="submit" className="col-span-1 place-self-center h-10">
          {!isLoading && "submit"}
          {isLoading && "submitting..."}
        </Button>
        <Button
          disabled={isLoading}
          type="button"
          onClick={cancelButtonHandler}
          className="col-span-1 place-self-center h-10"
        >
          Cancel
        </Button>
        {isSuccess && (
          <p className="text-dirty-pink font-semibold">susccessful!</p>
        )}
        {isError && <p className="text-dirty-pink font-semibold">{error}</p>}
      </form>
    </FlexDisplay>
  );
};

export default HeroRelations;
