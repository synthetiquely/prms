class Prms {
  constructor(executionFunction) {
    this.promiseChain = [];
    this.handleError = () => {};

    this.onResolve = this.onResolve.bind(this);
    this.onReject = this.onReject.bind(this);

    executionFunction(this.onResolve, this.onReject);
  }

  /**
   * Handle response
   * @param  {Function} onResolve
   * @return {this}
   */
  then(onResolve) {
    this.promiseChain.push(onResolve);

    return this;
  }

  /**
   * Handle error
   * @param  {Function} handleError
   * @return {this}
   */
  catch(handleError) {
    this.handleError = handleError;

    return this;
  }

  /**
   * Execute promise chain with response or call reject if any error occurs
   * @param  {any} value
   * @return {void}
   */
  onResolve(value) {
    let storedValue = value;

    try {
      this.promiseChain.forEach((nextFunction) => {
        storedValue = nextFunction(storedValue);
      });
    } catch (error) {
      this.promiseChain = [];

      this.onReject(error);
    }
  }

  /**
   * Execute error handler
   * @param  {any} error
   * @return {void}
   */
  onReject(error) {
    this.handleError(error);
  }
}

module.exports = Prms;
