import React from "react";
import { useState } from "react";
import * as days from "../../days.json";
import { createTranslations } from "../../utilities/translations-api";

const Home = ({ profile, setProfile }) => {
  const dayVerses = days[profile?.latestDay];

  const [hebrewForm, setHebrewForm] = useState({
    hebrewTranslation: "",
  });
  const [greekForm, setGreekForm] = useState({
    greekTranslation: "",
  });

  function handleHebrewChange(evt) {
    const newFormData = {
      ...hebrewForm,
      [evt.target.name]: evt.target.value,
    };
    setHebrewForm(newFormData);
  }

  function handleGreekChange(evt) {
    const newFormData = {
      ...greekForm,
      [evt.target.name]: evt.target.value,
    };
    setGreekForm(newFormData);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const dayTranslations = {
        ...hebrewForm,
        ...greekForm,
        day: profile.latestDay,
        profileId: profile._id,
      };
      console.log("posting dayTranslations now... ", { dayTranslations });
      const results = await createTranslations(dayTranslations);
      console.log({ results });
      // const newHebrewTranslation = results.hebrewTranslation;
      // console.log({ newHebrewTranslation });
      // const newGreekTranslation = results.greekTranslation;
      // console.log({ newGreekTranslation });
      // setHebrewForm(newHebrewTranslation);
      // setGreekForm(newGreekTranslation);
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  return (
    <div>
      <div>
        <h1>Welcome to Advent Translation, {profile.firstName}!</h1>
        <h3>You are on Day {profile.latestDay}.</h3>
      </div>
      <div>
        <p>Day {profile.latestDay} Verses:</p>
        <p>{dayVerses.hebrewVerse}</p>
        <p>{dayVerses.hebrewText}</p>
        <div className="form-container">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <label htmlFor="hebrewTranslation">Your translation:</label>
            <input
              type="textarea"
              id="hebrewTranslation"
              name="hebrewTranslation"
              value={hebrewForm.hebrewTranslation}
              onChange={handleHebrewChange}
            />
          </form>
        </div>
        <p>{dayVerses.greekVerse}</p>
        <p>{dayVerses.greekText}</p>
        <div className="form-container">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <label htmlFor="greekTranslation">Your translation:</label>
            <input
              type="textarea"
              id="greekTranslation"
              name="greekTranslation"
              value={greekForm.greekTranslation}
              onChange={handleGreekChange}
            />
            <button type="submit">save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
