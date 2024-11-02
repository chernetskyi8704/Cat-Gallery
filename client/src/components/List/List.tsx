import { HTMLAttributes } from "react";

interface IListProps<T> extends HTMLAttributes<HTMLUListElement> {
  items: T[];
  renderItems: (item: T, index?: number) => React.ReactNode;
}

const List = <T,>({ items, renderItems, ...rest }: IListProps<T>) => {
  return (
    <ul {...rest}>{items?.map((item, index) => renderItems(item, index))}</ul>
  );
};

export default List;
