export const searchItems = (
    items: Array<any>,
    query: string,
    searchParam: "name" | "email" | "title"
  ) => {
    const filteredItems = items?.filter((item) => {
      if (searchParam === "email") {
        return item.email
          ? item.email.toLowerCase().includes(query.trim().toLowerCase())
          : false;
      }
      if (searchParam === "title") {
        return item.title
          ? item.title.toLowerCase().includes(query.trim().toLowerCase())
          : false;
      }
      return item.name
        .toLowerCase()
        .includes(query.trim().toLowerCase());
    });
    return filteredItems;
  };