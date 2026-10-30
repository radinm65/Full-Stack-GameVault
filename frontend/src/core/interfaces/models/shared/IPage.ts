// One slice of a cursor-paginated list. `nextCursor` is opaque, the client only sends it back
// as is. It is null on the last page.
interface IPage<T> {
  items: T[];
  nextCursor: string | null;
}

export default IPage;
