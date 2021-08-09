import UIPlugins from 'phaser3-rex-plugins/templates/ui/ui-plugin';

interface IUserInterfaceEntity<T> {
  name: string;
  link: T;
}

abstract class UserInterfaceEntity<T> implements IUserInterfaceEntity<T> {
  protected readonly context: T;
  protected readonly ui: UIPlugins;
  protected readonly entityName: string;

  protected constructor(ui: UIPlugins, texture: T, name: string) {
    this.ui = ui;
    this.entityName = name;
    this.context = texture;
  }

  get link() {
    return this.context;
  }

  get name() {
    return this.entityName;
  }
}

export default UserInterfaceEntity;
