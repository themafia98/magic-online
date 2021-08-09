import { IConfigApp, IUserInterfaceScene } from '../../interfaces/ui.interface';
import globalConfig from '../../config/App.config';
import { Scene } from 'phaser';
import UIPlugins from 'phaser3-rex-plugins/templates/ui/ui-plugin';

interface IView {
  render: () => void;
  context: Scene;
  config: IConfigApp;
  state: Record<string, any>;
  builder: UIPlugins;
}

abstract class ViewComponent implements IView {
  protected viewComponent: unknown = {};

  private viewState: Record<string, any> = {};
  private viewContext: Scene;
  private readonly appConfig: IConfigApp;

  protected constructor(scene: Scene, config: IConfigApp = globalConfig) {
    this.appConfig = config;
    this.viewContext = scene;
  }

  get builder() {
    return (this.context as unknown as IUserInterfaceScene).rexUI;
  }

  get view() {
    return this.viewComponent;
  }

  setView<T>(renderedView: T): void {
    this.viewComponent = renderedView;
  }

  get state() {
    return this.viewState;
  }

  set context(ctx) {
    this.viewContext = ctx;
  }

  get context() {
    return this.viewContext;
  }

  get config() {
    return this.appConfig;
  }

  setState<T>(newState: T): void {
    this.viewState = {
      ...this.viewState,
      ...newState,
    };
  }

  render(): void {
    throw new Error('render not initialize');
  }
}

export default ViewComponent;
