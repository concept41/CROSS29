import React from 'react';
import { FlexBox } from "components/presentational/FlexBox/FlexBox";
import { Crossword } from 'components/presentational/Crossword/Crossword';


import './LandingPage.scss';

export const LandingPagePath = "/";

export const LandingPage = () => {
  return (
    <div className='LandingPage'>
      <FlexBox direction='column'>
        <span>Placeholder for building components</span>
        <Crossword/>
      </FlexBox>
    </div>
  );
}
