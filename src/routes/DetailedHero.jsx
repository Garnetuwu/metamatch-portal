import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import useHeroRequests from "../hooks/useHeroRequests";
import BasicInfoDisplay from "../components/HeroDisplay/BasicInfoDisplay";
import RelationsDisplay from "../components/HeroDisplay/RelationsDisplay";
import BasicInfoUpdate from "../components/HeroDisplay/BasicInfoUpdate";
import RelationsUpdate from "../components/HeroDisplay/RelationsUpdate";
import RelationFilter from "../components/HeroDisplay/RelationFilter";
import Card from "../components/UI/Card";
import Divider from "../components/UI/Divider";
import Button from "../components/UI/Button";
import Modal from "../components/UI/Modal";

const DetailedHero = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const param = useParams();
  const { fetchHeroData, deleteHeroMutation } = useHeroRequests(
    param.id,
    token
  );
  const { isLoading, isSuccess, data, isError, error, refetch } = fetchHeroData;

  const [isProfileEditingMode, setIsProfileEditingMode] = useState(false);
  const [isRelationsEditingMode, setIsRelationsEditingMode] = useState(false);
  const [role, setRole] = useState("support");
  const [showModal, setShowModal] = useState(false);

  const deleteButtonHandler = () => {
    setShowModal(true);
  };

  const deleteHeroHandler = () => {
    deleteHeroMutation.mutate({ id: param.id, token });
  };

  useEffect(() => {
    if (param) {
      refetch();
    }
  }, [param]);

  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "UPDATE", payload: data.data });
    }
  }, [isSuccess, data]);

  return (
    <>
      {showModal && (
        <Modal
          title="Warning"
          onCancel={() => setShowModal(false)}
          onAction={deleteHeroHandler}
        >
          Are you sure you want to delete this hero?
        </Modal>
      )}
      {isLoading && <div>loading...</div>}
      {isError && <div>{error.message}</div>}
      {isSuccess && (
        <Card className="flex flex-col px-10 w-[90vw] xl:w-[80vw] justify-center items-center border-2 border-sand">
          <div className="py-5 flex flex-col items-center gap-5 ">
            <Button className="py-1" onClick={deleteButtonHandler}>
              Delete Hero
            </Button>
            {!isProfileEditingMode && (
              <BasicInfoDisplay
                onEditProfile={() => {
                  setIsProfileEditingMode(true);
                }}
              />
            )}
            {isProfileEditingMode && (
              <BasicInfoUpdate
                refetch={refetch}
                heroData={data.data}
                onEditProfile={() => {
                  setIsProfileEditingMode(false);
                }}
              />
            )}
          </div>
          <div className="mt-5 flex flex-col w-full">
            <p className="text-md text-center font-semibold">Relations</p>
            <Divider className="mb-3 mt-1" />
            <RelationFilter
              currentRole={role}
              onFilter={(role) => {
                setRole(role);
              }}
            />
            {!isRelationsEditingMode && (
              <RelationsDisplay
                currentRole={role}
                onEditRelations={() => {
                  setIsRelationsEditingMode(true);
                }}
              />
            )}
            {isRelationsEditingMode && (
              <RelationsUpdate
                heroId={data.data._id}
                allRelations={data.data.relationships}
                currentRole={role}
                onEditRelations={() => {
                  setIsRelationsEditingMode(false);
                }}
              />
            )}
          </div>
        </Card>
      )}
    </>
  );
};

export default DetailedHero;
