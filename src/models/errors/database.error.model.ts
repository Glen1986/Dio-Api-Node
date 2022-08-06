class DatabaseError extends Error {
  constructor(
   public message: string,
   public error?: Error,
  ) {
    super(message)
    // this.error = error;
  }
}

export default DatabaseError
