import RelationCard from "./RelationCard";

const RelationSegment = ({ relations }) => {
  return (
    <ul className="contents">
      {relations.map((relation) => (
        <RelationCard
          score={relation.score}
          combo={relation.combo}
          special={relation.special}
          counterComment={relation.counterComment}
          comboComment={relation.comboComment}
          name={relation.hero.name}
          key={relation._id}
          className="col-span-1"
        />
      ))}
    </ul>
  );
};

export default RelationSegment;
