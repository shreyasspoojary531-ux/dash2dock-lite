'use strict';

import Shell from 'gi://Shell';
import GLib from 'gi://GLib';
import GObject from 'gi://GObject';
import Clutter from 'gi://Clutter';

const shaderSourceCache = new Map();

// Mirroring effects/color_shader_effect.js lines 10-27
export const getShaderSource = (extensionDir, filename) => {
  if (shaderSourceCache.has(filename)) {
    return shaderSourceCache.get(filename);
  }
  const shaderPath = GLib.build_filenamev([
    extensionDir,
    'effects',
    filename,
  ]);
  try {
    const src = Shell.get_file_contents_utf8_sync(shaderPath);
    shaderSourceCache.set(filename, src);
    return src;
  } catch (e) {
    console.error(`dash2dock-blur: error loading shader from ${shaderPath}: ${e}`);
    return null;
  }
};

// Mirroring effects/color_shader_effect.js lines 29-47 and 131-138
export const CornerShaderEffect = GObject.registerClass(
  {},
  class CornerShaderEffect extends Clutter.ShaderEffect {
    _init(params = {}, shaderFilename = 'corner_effect.glsl') {
      this._width = 0;
      this._height = 0;
      this._radius = 0;
      this._shaderFilename = shaderFilename;
      this._source = null;

      let radius = params.radius;
      delete params.radius;

      super._init(params);

      if (radius !== undefined) {
        this.radius = radius;
      }
    }

    preload(extensionDir) {
      if (!this._shaderFilename) return;
      this._source = getShaderSource(extensionDir, this._shaderFilename);
      if (this._source) {
        this.set_shader_source(this._source);
      }
    }

    get width() {
      return this._width;
    }

    set width(value) {
      if (this._width !== value) {
        this._width = value;
        this.set_uniform_value('width', parseFloat(this._width));
      }
    }

    get height() {
      return this._height;
    }

    set height(value) {
      if (this._height !== value) {
        this._height = value;
        this.set_uniform_value('height', parseFloat(this._height));
      }
    }

    get radius() {
      return this._radius;
    }

    set radius(value) {
      if (this._radius !== value) {
        this._radius = value;
        this.set_uniform_value('radius', parseFloat(this._radius));
      }
    }

    updateSize(width, height) {
      if (this._width !== width) {
        this._width = width;
        this.set_uniform_value('width', parseFloat(this._width));
      }
      if (this._height !== height) {
        this._height = height;
        this.set_uniform_value('height', parseFloat(this._height));
      }
    }

    vfunc_paint_target(paint_node = null, paint_context = null) {
      this.set_uniform_value('tex', 0);

      if (paint_node && paint_context)
        super.vfunc_paint_target(paint_node, paint_context);
      else if (paint_node) super.vfunc_paint_target(paint_node);
      else super.vfunc_paint_target();
    }
  }
);
