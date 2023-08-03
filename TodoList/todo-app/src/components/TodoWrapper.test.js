import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";

import { TodoWrapper } from "./TodoWrapper";
import { Form } from "./Form";

afterEach(() => {
  cleanup();
});

test("matches snapshot", () => {
  const todo = {
    id: 1,
    task: "wash car",
    completed: false,
    isEditing: false,
    priority: "urgent",
    status: "not started",
  };
  const tree = renderer.create(<TodoWrapper todo={todo} />).toJSON;
  expect(tree).toMatchSnapshot();
});

test();
