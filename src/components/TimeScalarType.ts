export type TimeScalarType = {
  name: string,
  callback:() => void,
};

export function createTimeScalarTypeValue(
  name: string,
  callback: () => void,
): TimeScalarType {
  console.log({ name, callback })
  return {
    name,
    callback: function(): void {
      console.log('callback', arguments);
    },
  };
}
