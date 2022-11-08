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
  const {goodRating, badRating, neutralRating, allRatings, averageRating, positivePercent} = props;

  if (goodRating === 0 && badRating === 0 && neutralRating === 0){
    return (
      <p>No Feedback yet. Click Review button to submit feedback</p>
    )
  }
  return(
    <div>
      <StatisticLine text="Good" rating={goodRating} />
      <StatisticLine text="Neutal" rating={neutralRating} />
      <StatisticLine text="Bad" rating={badRating} />
      <StatisticLine text="All" rating={allRatings} />
      <StatisticLine text="Average" rating={averageRating} />
      <StatisticLine text="Percent" rating={positivePercent} />
    </div>
  )
}

const StatisticLine = (props) => {
  return(
    <p>{props.text} : {props.rating}</p>
  )
}



const App = () => {

  const [goodRating, setGood] = useState(0);
  const [badRating, setBad] = useState(0);
  const [neutralRating, setNeutral] = useState(0);
  const [allRatings, setAll] = useState(0);
  const [averageRating, setAverage] = useState(0);
  const [positivePercent, setPercent] = useState(0);

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
    updateAverage();
    updatePercent();
  }

  const updateAverage = () => {
    var totalRating = goodRating + badRating + neutralRating;
    var averageDeviation = goodRating - badRating;
    console.log(goodRating)
    console.log(totalRating, averageDeviation);
    setAverage(averageDeviation / totalRating);
    console.log(goodRating);
  }
  
  const updatePercent = () => {
    var totalRating = goodRating + badRating + neutralRating;
    setPercent((goodRating/totalRating)*100);
  }


  
  return (
    <div>
      <Display text={"Give Feedback"}/>
      <Button onClick={updateGood} text="Good" />
      <Button onClick={updateNeutral} text="Neutral" />
      <Button onClick={updateBad} text="Bad" />

      <Display text={"Summary"} />
      <DisplayResult goodRating={goodRating} badRating={badRating} neutralRating={neutralRating} averageRating={averageRating} positivePercent={positivePercent} allRatings={allRatings}/>
    </div>
  );
}

export default App;
