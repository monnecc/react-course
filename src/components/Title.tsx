import React from "react";

type Props = {
  content: string;
};

export default function Title(props: Props) {
  return <h1>{props.content}</h1>;
}
