import { render } from "@testing-library/react";
import * as reduxHooks from "react-redux";
import { FullPost } from "../../pages";


jest.mock("react-redux");
// jest.mock('axios', () => {
//   return {
//     create: jest.fn(() => ({
//       get: jest.fn(),
//       interceptors: {
//         request: { use: jest.fn(), eject: jest.fn() },
//         response: { use: jest.fn(), eject: jest.fn() }
//       }
//     }))
//   }
// })
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