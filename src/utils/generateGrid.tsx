
export const generateGrid = (
  height: number,
  width: number,
  cellContents: () => any = () => null,
): any[][] => {
  return (new Array(height))
    .fill((new Array(width)).fill(null))
    .map((xArr) =>  xArr.map(cellContents));
}
