interface IStateValues {
  [key: string]: any;
}

export interface IState<T = IStateValues> {
  getState(): T;
  setState(values: T): void;
}

class State<T = IStateValues> implements IState<T> {
  constructor(private state: T) {}

  public getState(): T {
    return this.state;
  }

  public setState(values: T): void {
    this.state = {
      ...this.state,
      ...values,
    };
  }
}

export default State;
