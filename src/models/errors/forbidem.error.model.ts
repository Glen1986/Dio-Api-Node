export default class ForbidemError extends Error {
  constructor(
   public message: string,
   public error?: any,
  ) {
    super(message)
    // this.error = error;
  }
}

