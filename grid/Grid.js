// Celler returneres som { row, col, value }.
// Positioner til metoder sendes som { row, col }.

export default class Grid {
  constructor(rows, cols) {
    this._rows = Math.max(0, Math.floor(rows) || 0);
    this._cols = Math.max(0, Math.floor(cols) || 0);
    this._size = this._rows * this._cols;
    this._data = new Array(this._size).fill(undefined);
  }

  // --- helpers ---
  rows() { return this._rows; }
  cols() { return this._cols; }
  size() { return this._size; }

  _isEmpty() { return this._size === 0; }

  // wrap a single index (handles negative)
  _wrap(n, mod) {
    if (mod === 0) return 0;
    const r = n % mod;
    return r < 0 ? r + mod : r;
  }

  _wrapRowCol({ row, col }) {
    if (this._isEmpty()) return { row: undefined, col: undefined };
    return {
      row: this._wrap(row, this._rows),
      col: this._wrap(col, this._cols)
    };
  }

  _indexFromWrapped(row, col) {
    return row * this._cols + col;
  }

  _cellFromIndex(index) {
    if (this._isEmpty()) return undefined;
    const wrappedIndex = this._wrap(index, this._size);
    const row = Math.floor(wrappedIndex / this._cols);
    const col = wrappedIndex % this._cols;
    return { row, col, value: this._data[wrappedIndex] };
  }

  _cellFromWrappedRowCol(row, col) {
    if (this._isEmpty()) return undefined;
    const idx = this._indexFromWrapped(row, col);
    return { row, col, value: this._data[idx] };
  }

  // --- public API ---

  // set({row, col}, value) - sætter value (wrap-around)
  set(pos, value) {
    if (this._isEmpty()) return undefined;
    const { row, col } = this._wrapRowCol(pos);
    const idx = this._indexFromWrapped(row, col);
    this._data[idx] = value;
    return { row, col, value };
  }

  // get({row, col}) - returnerer value for cell (wrap-around)
  get(pos) {
    if (this._isEmpty()) return undefined;
    const { row, col } = this._wrapRowCol(pos);
    const idx = this._indexFromWrapped(row, col);
    return this._data[idx];
  }

  // indexFor({row, col}) - returnerer flattened index (wrap-around)
  indexFor(pos) {
    if (this._isEmpty()) return undefined;
    const { row, col } = this._wrapRowCol(pos);
    return this._indexFromWrapped(row, col);
  }

  // rowColFor(index) - returnerer {row, col} (index wrap-around)
  rowColFor(index) {
    if (this._isEmpty()) return undefined;
    const wrappedIndex = this._wrap(index, this._size);
    return {
      row: Math.floor(wrappedIndex / this._cols),
      col: wrappedIndex % this._cols
    };
  }

  // neighbours({row, col}) - returnerer array af {row, col} for 8 naboer (wrap-around)
  neighbours(pos) {
    if (this._isEmpty()) return [];
    const { row: r0, col: c0 } = this._wrapRowCol(pos);
    const out = [];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const r = this._wrap(r0 + dr, this._rows);
        const c = this._wrap(c0 + dc, this._cols);
        out.push({ row: r, col: c });
      }
    }
    return out;
  }

  // neighbourValues({row, col}) - værdier for de samme naboer i samme rækkefølge
  neighbourValues(pos) {
    return this.neighbours(pos).map(({ row, col }) => this._data[this._indexFromWrapped(row, col)]);
  }

  // nextInRow({row, col}) - cellen til højre (wrap-around)
  nextInRow(pos) {
    if (this._isEmpty()) return undefined;
    const { row, col } = this._wrapRowCol(pos);
    const nextCol = this._wrap(col + 1, this._cols);
    return this._cellFromWrappedRowCol(row, nextCol);
  }

  // nextInCol({row, col}) - cellen under (wrap-around)
  nextInCol(pos) {
    if (this._isEmpty()) return undefined;
    const { row, col } = this._wrapRowCol(pos);
    const nextRow = this._wrap(row + 1, this._rows);
    return this._cellFromWrappedRowCol(nextRow, col);
  }

  // cardinal directions (wrap-around)
  north(pos) {
    if (this._isEmpty()) return undefined;
    const { row, col } = this._wrapRowCol(pos);
    const nr = this._wrap(row - 1, this._rows);
    return this._cellFromWrappedRowCol(nr, col);
  }

  south(pos) {
    if (this._isEmpty()) return undefined;
    const { row, col } = this._wrapRowCol(pos);
    const sr = this._wrap(row + 1, this._rows);
    return this._cellFromWrappedRowCol(sr, col);
  }

  west(pos) {
    if (this._isEmpty()) return undefined;
    const { row, col } = this._wrapRowCol(pos);
    const wc = this._wrap(col - 1, this._cols);
    return this._cellFromWrappedRowCol(row, wc);
  }

  east(pos) {
    if (this._isEmpty()) return undefined;
    const { row, col } = this._wrapRowCol(pos);
    const ec = this._wrap(col + 1, this._cols);
    return this._cellFromWrappedRowCol(row, ec);
  }

  // fill(value) - fyld alle celler med value
  fill(value) {
    if (this._isEmpty()) return;
    this._data.fill(value);
  }
}
