// text.js

import { Fragment } from "react";
import { TextContainer } from "./textContainer";

export const Text = ({ id, data }) => {
  return (
    <Fragment>
      <TextContainer
        id={id}
        data={data}
        expandWidth={data.id.includes("textwh")}
      />
    </Fragment>
  );
};
