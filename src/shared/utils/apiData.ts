// Clean undefined fields

export const cleanData = (data: { [key: string]: any }) => {
  return Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined),
  );
};
