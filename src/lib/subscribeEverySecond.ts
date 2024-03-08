import { getMsToNextSecond } from "./getMsToNextSecond"

export const subscribeEverySecond = (cb: (ms: number) => void) => {
  let timeoutHandle: number | undefined = undefined
  const loop = () => {
    cb(Date.now())
    timeoutHandle = setTimeout(loop, getMsToNextSecond())
  }
  timeoutHandle = setTimeout(loop, getMsToNextSecond())

  return () => {
    clearTimeout(timeoutHandle)
  }
}