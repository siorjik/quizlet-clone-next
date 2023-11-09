export  type SetType = {
  _id?: string,
  title: string,
  list: { term: string, definition: string }[],
  createdAt?: string,
  updatedAt?: string,
  userId?: string
}
