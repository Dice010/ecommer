import { FullBlog } from "@/types/Blog";

export function formatBlogId(id: string): string {
  const cleanId = id.trim().toLowerCase();

  const match = cleanId.match(/\d+/);

  if (match) {
    const num = parseInt(match[0], 10);
    return `blog-${num.toString().padStart(2, "0")}`;
  }

  throw new Error("Lỗi định dạng ID.");
}

export function autoIdIncrease(DB: FullBlog[]): string {
  if (!DB || DB.length === 0) {
    return "01";
  }

  const ids = DB.map((blog) => {
    const part = blog.id.split("-");
    const num = Number(part[1]);
    return isNaN(num) ? 0 : num;
  });

  const maxId = Math.max(...ids);
  const nextId = maxId + 1;
  const newId = nextId.toString().padStart(2, "0");

  return formatBlogId(newId);
}

export function pushBlog(DB: FullBlog[], blog: FullBlog): void {
  DB.push(blog);
}

export function findBlog(DB: FullBlog[], id: string): FullBlog {
  const validId = formatBlogId(id);
  const targetBlog = DB.find((blog) => blog.id === validId);

  if (!targetBlog) throw new Error("Blog bạn đang tìm không tồn tại.");

  return targetBlog;
}

export function createNewBlog(
  DB: FullBlog[],
  newblog: Omit<FullBlog, "id">,
): FullBlog {
  return {
    id: autoIdIncrease(DB),
    ...newblog,
  };
}

export function updateBlog(
  DB: FullBlog[],
  newblog: Omit<FullBlog, "id">,
  oldId: string,
): void {
  const validateOldId = formatBlogId(oldId);
  const index = DB.findIndex((blog) => blog.id === validateOldId);

  if (index === -1) {
    throw new Error("Blog bạn đang tìm không tồn tại.");
  }

  DB[index] = {
    ...newblog,
    id: validateOldId,
  };
}

export function removeBlog(DB: FullBlog[], id: string): void {
  const validateId = formatBlogId(id);

  const index = DB.findIndex((blog) => blog.id === validateId);

  if (index < 0) {
    throw new Error("Blog bạn muốn xóa không tồn tại.");
  }

  DB.splice(index, 1);
}
