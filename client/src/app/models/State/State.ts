interface IStateValues {
  [key: string]: any;
}

interface IState {
  getState(): IStateValues;
  setState<T = Record<string, any>>(values): void;
}

class State implements IState {
  constructor(private state: IStateValues) {}

  public getState(): IStateValues {
    return this.state;
  }

  public setState<T = Record<string, any>>(values): void {
    setTimeout(() => {
      this.state = {
        ...this.state,
        ...values,
      };
    });
  }
}

export default State;
