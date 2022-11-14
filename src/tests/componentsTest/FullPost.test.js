import { render } from "@testing-library/react";
import * as reduxHooks from "react-redux";
import { FullPost } from "../../pages";
import { useSelector } from "react-redux";
//import {render} from "react-dom"
jest.mock("react-redux");
const newPost = {
  title: "testTitle", text: 'testText', tags: "test", imageUrl: ""
};
const mockedUseSelector = jest.spyOn(reduxHooks, "useSelector")
describe("FullPost", () => {
  it("should create new post", () => {
    //useSelector.mockReturnValue(newPost)
    // не пройдет в тайпскрипте
    mockedUseSelector.mockReturnValue(newPost);
    const component = render(<FullPost/>)
    expect(component).toMatchSnapshot()
  });
});