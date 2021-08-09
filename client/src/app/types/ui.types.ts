import GameObject = Phaser.GameObjects.GameObject;

export type ChangeEvent = (textObject: GameObject, text: string) => void;
