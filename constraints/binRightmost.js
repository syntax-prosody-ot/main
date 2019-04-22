function binMaxRight (s, ptree, cat) {
  var vcount = 0;
  if (ptree.children && ptree.children.length) {
    if (ptree.cat === 'cat') {
      var len = ptree.children.length - 1;
      var rightMost = ptree.children[len];
      if (rightMost.children.length > 2) {
        vcount++;
      }
    }
  }
  return vcount;
}