import { useState } from "react";

const Display = (props) => {
  return(
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  )
}

const DisplayResult = (props) => {
  const {text, rating} = props;
  return(
    <div>
      <p>{text} : {rating}</p>
    </div>
  )
}


const App = () => {

  const [goodRating, setGood] = useState(0);
  const [badRating, setBad] = useState(0);
  const [neutralRating, setNeutral] = useState(0);
  const [allRatings, setAll] = useState(0);

  const updateGood = () => {
    setGood(goodRating + 1);
    updateAll();
  }
  
  const updateBad = () => {
    setBad(badRating + 1);
    updateAll();
  }

  const updateNeutral = () =>{
     setNeutral(neutralRating + 1);
     updateAll();
  }

  const updateAll = () => {
    setAll(allRatings + 1);
    console.log("Updating All", allRatings)
  }
  
  
  return (
    <div>
      <Display text={"Give Feedback"}/>
      <Button onClick={updateGood} text="Good" />
      <Button onClick={updateNeutral} text="Neutral" />
      <Button onClick={updateBad} text="Bad" />

      <Display text={"Summary"} />
      <DisplayResult text="Good" rating={goodRating} />
      <DisplayResult text="Neutal" rating={neutralRating} />
      <DisplayResult text="Bad" rating={badRating} />
      <DisplayResult text="All" rating={allRatings} />
      
    </div>
  );
}

export default App;
