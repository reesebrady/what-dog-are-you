import { useContext } from "react";
import { DogContext } from "./DogContext";

const DogPics = () => {
  const { dogImages, loading, fetchDogArray } = useContext(DogContext);

  return (
    <>
      <h1>What dog are you today?</h1>
      <div className="container text-center padding-bottom">
        <div className="row mt-4">
          {dogImages.map((img, index) => (
            <div className="col-2 mb-4" key={index}>
              <img
                src={img}
                alt={`Dog ${index + 1}`}
                className="img-fluid rounded"
              />
            </div>
          ))}
        </div>
        <button
          className="btn btn-primary mb-4"
          onClick={fetchDogArray}
          disabled={loading}
        >
          {loading ? "Loading dogs..." : "New Dogs"}
        </button>
      </div>
    </>
  );
};

export default DogPics;
