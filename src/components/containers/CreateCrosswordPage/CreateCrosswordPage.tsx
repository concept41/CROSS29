import React from 'react';
import { FlexBox } from "components/presentational/FlexBox/FlexBox";
import { CrosswordView } from 'components/presentational/Crossword/CrosswordView';


export const CreateCrosswordPagePath = "/create";

export const CreateCrosswordPage = () => {
  return (
    <div className='CreateCrosswordPage'>
      <FlexBox direction='column'>
        <span>Placeholder for building components</span>
        <CrosswordView/>
      </FlexBox>
    </div>
  );
}
