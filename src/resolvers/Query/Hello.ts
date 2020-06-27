interface HelloArgs {
  name: string;
}

export const hello = async (_: void, { name }: HelloArgs) =>
  `Hello, ${name || "world"}!`;
