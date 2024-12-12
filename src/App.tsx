import "./App.css";
import React, { useContext, useState } from "react";
import DogPics from "./DogPics";
import { GetDog } from "./GetDog";
import { DogContext } from "./DogContext";

function App() {
  const [name, setName] = useState("");
  const [dog, setDog] = useState("");
  const [submittedName, setSubmittedName] = useState(false);
  const { dogImages } = useContext(DogContext);

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setName(event.target.value); // Update state with the input value
  };

  const handleSubmit = (event: any) => {
    event.preventDefault(); //prevent default submission
    const dogNum = GetDog(name);
    setDog(dogImages[dogNum]);
    setSubmittedName(true);
  };

  return (
    <>
      <DogPics></DogPics>
      <h2>Enter your name to see</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control form-control-lg"
            id="userName"
            placeholder="Your Name"
            onChange={handleInputChange}
            value={name}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg">
          Submit
        </button>
      </form>
      <div className="row justify-content-center mt-4">
        <div className="col-12 col-md-6 col-lg-4">
          {submittedName ? (
            <>
              <h2>Today, you are:</h2>
              <img src={dog} alt="Random Dog" className="img-fluid rounded" />
            </>
          ) : (
            <div>Submit your name to see</div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
