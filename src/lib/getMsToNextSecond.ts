export const getMsToNextSecond = () => {
    return 1000 - Date.now() % 1000
}
