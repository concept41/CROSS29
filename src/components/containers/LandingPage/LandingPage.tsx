import React from 'react';
import { FlexBox } from "components/presentational/FlexBox/FlexBox";
import { Tile } from 'components/presentational/Tile/Tile';


import './LandingPage.scss';

export const LandingPagePath = "/";

export const LandingPage = () => {
  return (
    <div className='LandingPage'>
      <FlexBox direction='column' alignItems='center'>
        <FlexBox className="Title" justify='center'>
          {
            "CROSS29".split('')
              .map((letter, i) => <Tile key={i} letter={letter}/>)
          }
        </FlexBox>
        <a href="/create">create a crossword</a>
      </FlexBox>
    </div>
  );
}
