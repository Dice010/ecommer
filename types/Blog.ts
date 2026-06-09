export type Blogs = {
  id: string;
  title: string;
  imgURL_Header?: string;
};

export type BlogCards = Blogs & {
  href: string;
};

export type BlogDetails = Blogs & {
  content_Header: string;
  imgURL_Body?: string;
  content_Body: string;
};

export type FullBlog = BlogCards & BlogDetails;