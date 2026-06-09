import { mockFullBlogs } from "@/lib/mock-data/mockBlog";
import { FullBlog } from "@/types/Blog";
import {
  removeBlog,
  updateBlog,
  createNewBlog,
  pushBlog,
} from "./useBlogUtils";
import { useReducer } from "react";

type Action =
  | { type: "CREATE_BLOG"; newBlog: FullBlog }
  | { type: "UPDATE_BLOG"; newBlog: Omit<FullBlog, "id">; oldId: string }
  | { type: "REMOVE_BLOG"; id: string };
export function useBlogReducer() {
  function blogReducer(state: FullBlog[], action: Action) {
    switch (action.type) {
      case "CREATE_BLOG": {
        const nextState = [...state];
        const newBlog = createNewBlog(nextState, action.newBlog);
        pushBlog(nextState, newBlog);
        return nextState;
      }
      case "UPDATE_BLOG": {
        const nextState = [...state];
        updateBlog(nextState, action.newBlog, action.oldId);
        return nextState;
      }
      case "REMOVE_BLOG": {
        const nextState = [...state];
        removeBlog(nextState, action.id);
        return nextState;
      }
      default:
        throw new Error("Hành động không hợp lệ.");
    }
  }
  
  const [DB, dispatch] = useReducer(blogReducer, mockFullBlogs);

  return { DB, dispatch} as const;
}
