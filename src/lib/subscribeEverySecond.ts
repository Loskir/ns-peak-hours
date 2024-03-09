import { getMsToNextSecond } from "./getMsToNextSecond"

export const subscribeEverySecond = (cb: (ms: number) => void) => {
  let timeoutHandle: ReturnType<typeof setTimeout> | undefined = undefined
  const loop = () => {
    cb(Date.now())
    timeoutHandle = setTimeout(loop, getMsToNextSecond()+10)
  }
  timeoutHandle = setTimeout(loop, getMsToNextSecond()+10)

  return () => {
    clearTimeout(timeoutHandle)
  }
}