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
      <StatisticLine text="Percent" rating={positivePercent+"%"} />
    </div>
  )
}

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.rating}</td>
    </tr>
    
  )
}



const App = () => {

  const [goodRating, setGood] = useState(0);
  const [badRating, setBad] = useState(0);
  const [neutralRating, setNeutral] = useState(0);
  const [allRatings, setAll] = useState(0);
  const [averageRating, setAverage] = useState(0);
  const [positivePercent, setPercent] = useState(0);

  //Create an Function to call all the aggregation functons and pass all the temp values through that 
  const updateAggregations = (tempGood, tempBad, tempNeutral) => {
    const tempAll = tempGood + tempBad + tempNeutral;

    updateAll(tempAll);
    updateAverage(tempAll,tempGood,tempBad, tempNeutral);
    updatePercent(tempAll,tempGood);
  }



  const updateGood = () => {
    var tempGood = goodRating+1;
    updateAggregations(tempGood,badRating, neutralRating);
    setGood(tempGood);
    
    
  }
  
  const updateBad = () => {
    var tempBad = badRating + 1;
    updateAggregations(goodRating, tempBad, neutralRating);
    setBad(tempBad);
  }

  const updateNeutral = () =>{
    var tempNeutral = neutralRating + 1;
    updateAggregations(goodRating, badRating, tempNeutral);
    setNeutral(tempNeutral);
  }

  const updateAll = (tempAll) => {
    setAll(tempAll);
  }

  const updateAverage = (tempAll, tempGood, tempBad, tempNeutral) => {
    console.log(tempAll)
    var averageDeviation = tempGood - tempBad;
    setAverage(averageDeviation / tempAll);
  }
  
  const updatePercent = (tempAll, tempGood) => {
    setPercent((tempGood/tempAll)*100);
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
