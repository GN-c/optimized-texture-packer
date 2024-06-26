class Trimmer {
  static getAlpha(data, width, x, y) {
    return data[y * (width * 4) + x * 4 + 3];
  }

  static getLeftSpace(data, width, height, threshold = 0) {
    let x = 0;

    for (x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        if (this.getAlpha(data, width, x, y) > threshold) {
          return x;
        }
      }
    }

    return 0;
  }

  static getRightSpace(data, width, height, threshold = 0) {
    let x = 0;

    for (x = width - 1; x >= 0; x--) {
      for (let y = 0; y < height; y++) {
        if (this.getAlpha(data, width, x, y) > threshold) {
          return width - x - 1;
        }
      }
    }

    return 0;
  }

  static getTopSpace(data, width, height, threshold = 0) {
    let y = 0;

    for (y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (this.getAlpha(data, width, x, y) > threshold) {
          return y;
        }
      }
    }

    return 0;
  }

  static getBottomSpace(data, width, height, threshold = 0) {
    let y = 0;

    for (y = height - 1; y >= 0; y--) {
      for (let x = 0; x < width; x++) {
        if (this.getAlpha(data, width, x, y) > threshold) {
          return height - y - 1;
        }
      }
    }

    return 0;
  }

  static trim(rects, threshold = 0) {
    for (let item of rects) {
      let img = item.image;
      let data = img.data;
      const { width, height } = img;
      let spaces = { left: 0, right: 0, top: 0, bottom: 0 };

      spaces.left = this.getLeftSpace(data, width, height, threshold);

      if (spaces.left !== width) {
        spaces.right = this.getRightSpace(data, width, height, threshold);
        spaces.top = this.getTopSpace(data, width, height, threshold);
        spaces.bottom = this.getBottomSpace(data, width, height, threshold);

        if (
          spaces.left > 0 ||
          spaces.right > 0 ||
          spaces.top > 0 ||
          spaces.bottom > 0
        ) {
          item.trimmed = true;
          item.spriteSourceSize.x = spaces.left;
          item.spriteSourceSize.y = spaces.top;
          item.spriteSourceSize.w = width - spaces.left - spaces.right;
          item.spriteSourceSize.h = height - spaces.top - spaces.bottom;
        }
      } else {
        item.trimmed = true;
        item.spriteSourceSize.x = 0;
        item.spriteSourceSize.y = 0;
        item.spriteSourceSize.w = 1;
        item.spriteSourceSize.h = 1;
      }

      if (item.trimmed) {
        item.frame.w = item.spriteSourceSize.w;
        item.frame.h = item.spriteSourceSize.h;
      }
    }
  }
}

module.exports = Trimmer;
