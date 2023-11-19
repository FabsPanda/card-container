/* WARNING: sorry if my code kinda messy */
// Notes: The typfaces can't be imported properly
// in this IDE, idk why, but it works perfectly fine
// in VSCode. Thank You!

import "./styles.css";
import { useState } from "react";

export default function ListingAd({
  pic,
  title,
  address,
  description,
  project_type,
  year,
  ownership_type,
  logo,
  availabilities_label,
  psf_min,
  psf_max,
  subprice_label,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPhoneNumberRevealed, setIsPhoneNumberRevealed] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const revealPhoneNumber = () => {
    setIsPhoneNumberRevealed((prev) => !prev);
  };

  // To be honest, I was a bit puzzled about this part to display the description value with newline
  // '\n' within a single string variable => 'description'. So, I had to do a bit of Googling. :*)
  // BUT! the rests are smoothly done :)

  const descriptionArray = description.split("\n").map((line, index, array) => {
    const isPhoneNumber = line.match(/\b(\d{4}\s?\d{4})\b/g);

    return (
      <span key={index}>
        {isPhoneNumber ? (
          <span>
            {line.split(/(\b\d{4}\s?\d{4}\b)/g).map((part, partIndex) => {
              if (part.match(/\b(\d{4}\s?\d{4})\b/g)) {
                return (
                  <span
                    key={`${index}-${partIndex}`}
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={revealPhoneNumber}
                  >
                    {isPhoneNumberRevealed
                      ? part
                      : `${part.substring(0, 4)} XXXX`}
                  </span>
                );
              } else {
                return part;
              }
            })}
          </span>
        ) : (
          line
        )}
        {index !== array.length - 1 && <br />}
      </span>
    );
  });

  return (
    <div className="App">
      <div className="Card">
        <img className="mainPic" width="300" height="500" src={pic} />
        <div className="mainContent">
          <div className="content1">
            <div className="left">
              <div className="title">
                <img
                  className="logo"
                  width={40}
                  height={40}
                  src={logo}
                  alt=""
                />
                <div className="foret">
                  <h1>{title}</h1>
                  <p className="address">{address}</p>
                </div>
              </div>

              <p className="condo">
                {project_type} · {year} · {ownership_type}
              </p>
              <p className="unit">{availabilities_label}</p>
            </div>

            <div className="right">
              <div className="price">
                <h2>
                  ${psf_min} - ${psf_max} psf
                </h2>
                <p>{subprice_label}</p>
              </div>
            </div>
          </div>

          <div className="buttonContainer">
            <button onClick={toggleExpand}>See description</button>
          </div>

          {isExpanded ? (
            <div className="wrapper">
              <p className="description">{descriptionArray}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
