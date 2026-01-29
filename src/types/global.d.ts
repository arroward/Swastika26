export { };

declare module '*.glb' {
    const content: string;
    export default content;
}

declare module '*.png' {
    const content: string;
    export default content;
}

declare module 'meshline' {
    import { Material, BufferGeometry } from 'three';

    export class MeshLineGeometry extends BufferGeometry {
        constructor();
        setPoints(points: unknown[]): void;
    }

    export class MeshLineMaterial extends Material {
        constructor(parameters?: any);
        color: any;
        map: any;
        useMap: any;
        alphaMap: any;
        useAlphaMap: any;
        resolution: any;
        sizeAttenuation: any;
        lineWidth: any;
        near: any;
        far: any;
        dashArray: any;
        dashOffset: any;
        dashRatio: any;
        visibility: any;
        alphaTest: any;
        repeat: any;
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            meshLineGeometry: any;
            meshLineMaterial: any;
        }
    }
}

declare module '@react-three/fiber' {
    interface ThreeElements {
        meshLineGeometry: any;
        meshLineMaterial: any;
    }
}
