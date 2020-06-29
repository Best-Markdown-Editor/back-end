export const slugify = (title: string) => {
  return title
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .replace(/ /g, "-");
};
