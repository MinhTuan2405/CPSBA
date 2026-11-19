// Chọn bộ sơ đồ: mặc định là As-Is, thêm --tobe để dùng bộ To-Be.
export function variant(args) {
  const i = args.indexOf('--tobe');
  if (i < 0) return { tobe: false, dir: 'diagrams', prefix: 'CellphoneS_AsIs_', label: 'As-Is' };
  args.splice(i, 1);
  return { tobe: true, dir: 'diagrams-tobe', prefix: 'CellphoneS_ToBe_', label: 'To-Be' };
}
