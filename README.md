

## GraphQL Endpoint

**URL:**  
`POST http://localhost:3000/graphql`

### 1. Create User Mutation

**Description:**  
Creates a new user in the system.

**GraphQL Mutation:**

```graphql
mutation {
  createUser(
    createUserInput: {
      name: "John Doe"
      email: "john@example.com"
      password: "password123"
    }
  ) {
    id
    name
    email
  }
}
```

**Headers:**

```bash
Content-Type: application/json
```

**Request Body (JSON):**

```json
{
  "query": "mutation { createUser(createUserInput: { name: \"John Doe\", email: \"john@example.com\", password: \"password123\" }) { id name email } }"
}
```

---

### 2. Create Blog Mutation

**Description:**  
Creates a new blog post.

**GraphQL Mutation:**

```graphql
mutation {
  createBlog(
    createBlogInput: {
      title: "My First Blog"
      content: "This is the content of the blog"
      authorId: "user_id_here"
    }
  ) {
    id
    title
    content
  }
}
```

**Headers:**

```bash
Content-Type: application/json
```

**Request Body (JSON):**

```json
{
  "query": "mutation { createBlog(createBlogInput: { title: \"My First Blog\", content: \"This is the content of the blog\", authorId: \"user_id_here\" }) { id title content } }"
}
```

---

### 3. Fetch All Blogs Query

**Description:**  
Fetches all blogs, including the author's details.

**GraphQL Query:**

```graphql
query {
  getAllBlogs {
    id
    title
    content
    authorId {
      id
      name
    }
  }
}
```

**Headers:**

```bash
Content-Type: application/json
```

**Request Body (JSON):**

```json
{
  "query": "query { getAllBlogs { id title content authorId { id name } } }"
}
```

---

### 4. Fetch Blogs with Filter Query

**Description:**  
Fetch blogs containing specific keywords in the title or content.

**GraphQL Query:**

```graphql
query {
  getFilteredBlogs(filter: "keyword") {
    id
    title
    content
    authorId {
      id
      name
    }
  }
}
```

**Headers:**

```bash
Content-Type: application/json
```

**Request Body (JSON):**

```json
{
  "query": "query { getFilteredBlogs(filter: \"keyword\") { id title content authorId { id name } } }"
}
```

---

### 5. Update Blog Mutation

**Description:**  
Updates an existing blog's title and/or content.

**GraphQL Mutation:**

```graphql
mutation {
  updateBlog(
    id: "blog_id_here"
    updateBlogInput: { title: "Updated Title", content: "Updated content" }
  ) {
    id
    title
    content
  }
}
```

**Headers:**

```bash
Content-Type: application/json
```

**Request Body (JSON):**

```json
{
  "query": "mutation { updateBlog(id: \"blog_id_here\", updateBlogInput: { title: \"Updated Title\", content: \"Updated content\" }) { id title content } }"
}
```

---

### 6. Soft Delete Blog Mutation

**Description:**  
Soft deletes a blog by setting the `deletedAt` field to the current time.

**GraphQL Mutation:**

```graphql
mutation {
  softDeleteBlog(id: "blog_id_here") {
    id
    title
    content
    deletedAt
  }
}
```

**Headers:**

```bash
Content-Type: application/json
```

**Request Body (JSON):**

```json
{
  "query": "mutation { softDeleteBlog(id: \"blog_id_here\") { id title content deletedAt } }"
}
```

---

### Testing Notes

1. Replace `user_id_here` and `blog_id_here` with actual IDs from your database.
2. You can test these requests using Postman. Paste the GraphQL queries and mutations in the body under the **raw** format with the `application/json` content type.
