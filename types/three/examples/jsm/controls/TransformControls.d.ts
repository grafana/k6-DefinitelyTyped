import { Camera, Mesh, MOUSE, Object3D, Object3DEventMap, Quaternion, Raycaster, Vector3 } from "three";

type TransformControlsMode = "translate" | "rotate" | "scale";

export interface TransformControlsEventMap extends Object3DEventMap {
    change: {};
    mouseDown: { mode: TransformControlsMode };
    mouseUp: { mode: TransformControlsMode };
    objectChange: {};
    "camera-changed": { value: unknown };
    "object-changed": { value: unknown };
    "enabled-changed": { value: unknown };
    "axis-changed": { value: unknown };
    "mode-changed": { value: unknown };
    "translationSnap-changed": { value: unknown };
    "rotationSnap-changed": { value: unknown };
    "scaleSnap-changed": { value: unknown };
    "space-changed": { value: unknown };
    "size-changed": { value: unknown };
    "dragging-changed": { value: unknown };
    "showX-changed": { value: unknown };
    "showY-changed": { value: unknown };
    "showZ-changed": { value: unknown };
    "worldPosition-changed": { value: unknown };
    "worldPositionStart-changed": { value: unknown };
    "worldQuaternion-changed": { value: unknown };
    "worldQuaternionStart-changed": { value: unknown };
    "cameraPosition-changed": { value: unknown };
    "cameraQuaternion-changed": { value: unknown };
    "pointStart-changed": { value: unknown };
    "pointEnd-changed": { value: unknown };
    "rotationAxis-changed": { value: unknown };
    "rotationAngle-changed": { value: unknown };
    "eye-changed": { value: unknown };
}

export class TransformControls extends Object3D<TransformControlsEventMap> {
    constructor(object: Camera, domElement?: HTMLElement);

    domElement: HTMLElement;

    // API

    camera: Camera;
    object: Object3D | undefined;
    enabled: boolean;
    axis: "X" | "Y" | "Z" | "E" | "XY" | "YZ" | "XZ" | "XYZ" | "XYZE" | null;
    mode: TransformControlsMode;
    translationSnap: number | null;
    rotationSnap: number | null;
    space: "world" | "local";
    size: number;
    dragging: boolean;
    showX: boolean;
    showY: boolean;
    showZ: boolean;

    readonly isTransformControls: true;
    mouseButtons: {
        LEFT?: MOUSE | null | undefined;
        MIDDLE?: MOUSE | null | undefined;
        RIGHT?: MOUSE | null | undefined;
    };

    pointerHover(pointer: PointerEvent | null): void;
    pointerDown(pointer: PointerEvent | null): void;
    pointerMove(pointer: PointerEvent | null): void;
    pointerUp(pointer: PointerEvent | null): void;

    attach(object: Object3D): this;
    detach(): this;
    getMode(): TransformControlsMode;
    getRaycaster(): Raycaster;
    setMode(mode: TransformControlsMode): void;
    setTranslationSnap(translationSnap: number | null): void;
    setRotationSnap(rotationSnap: number | null): void;
    setScaleSnap(scaleSnap: number | null): void;
    setSize(size: number): void;
    setSpace(space: "world" | "local"): void;
    reset(): void;
    dispose(): void;
}

export class TransformControlsGizmo extends Object3D {
    type: "TransformControlsGizmo";
    isTransformControlsGizmo: true;

    gizmo: {
        translate: Object3D;
        rotate: Object3D;
        scale: Object3D;
    };
    helper: {
        translate: Object3D;
        rotate: Object3D;
        scale: Object3D;
    };
    picker: {
        translate: Object3D;
        rotate: Object3D;
        scale: Object3D;
    };

    constructor();
}

export class TransformControlsPlane extends Mesh {
    type: "TransformControlsPlane";
    isTransformControlsPlane: true;

    constructor();

    mode: TransformControlsMode;

    axis: "X" | "Y" | "Z" | "XY" | "YZ" | "XZ" | "XYZ" | "E";

    space: "local" | "world";

    eye: Vector3;
    worldPosition: Vector3;
    worldQuaternion: Quaternion;
}
