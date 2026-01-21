import * as THREE from 'three';

export function patchThree() {
    // Polyfill for missing uv2_pars_vertex in newer three.js versions
    const shaderChunk = THREE.ShaderChunk as any;
    if (!shaderChunk.uv2_pars_vertex) {
        shaderChunk.uv2_pars_vertex = `
      #if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
        attribute vec2 uv2;
        varying vec2 vUv2;
      #endif
    `;
    }

    if (!shaderChunk.uv2_vertex) {
        shaderChunk.uv2_vertex = `
      #if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
        vUv2 = uv2;
      #endif
    `;
    }

    if (!shaderChunk.uv2_pars_fragment) {
        shaderChunk.uv2_pars_fragment = `
      #if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
        varying vec2 vUv2;
      #endif
    `;
    }

    if (!shaderChunk.uv2_fragment) {
        shaderChunk.uv2_fragment = `
      #if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
        vec2 combinedUV2 = vUv2;
      #endif
    `;
    }
}
