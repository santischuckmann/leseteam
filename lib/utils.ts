export const sendErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  }

  return undefined
}