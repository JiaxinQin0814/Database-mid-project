function sortTable(table, idx) {
    var otable = document.getElementById(table),
        otody = otable.tBodies[0],
        otr = otody.rows,
        tarr = [];
    for (var i = 1; i < otr.length; i++) {
        tarr[i - 1] = otr[i];
    }
    ;
    // console.log(tarr);
    if (otody.sortCol == idx) {
        tarr.reverse();
    } else {
        tarr.sort(function (tr1, tr2) {
            var value1 = tr1.cells[idx].innerHTML;
            var value2 = tr2.cells[idx].innerHTML;
            if (!isNaN(value1) && !isNaN(value2)) {
                return value1 - value2;
            } else {
                return value1.localeCompare(value2);
            }
        })
    }
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < tarr.length; i++) {
        fragment.appendChild(tarr[i]);
    }
    ;
    otody.appendChild(fragment);
    otody.sortCol = idx;
}
//拖动
function Drag(table) {
    var ochek = document.getElementById("chenkbox"),
        otable = document.getElementById(table),
        otody = otable.tBodies[0],
        othead = otable.tHead,
        oth = othead.getElementsByTagName("th"),
        otd = otody.getElementsByTagName("td"),
        box = document.getElementById("box"),
        arrn = [];
    for (var i = 0; i < otd.length; i++) {
        otd[i].onmousedown = function (e) {
            var e = e || window.event,
                target = e.target || e.srcElement,
                thW = target.offsetWidth,
                maxl = ochek.offsetWidth - thW,
                rows = otable.rows,
                ckL = ochek.offsetLeft,
                disX = target.offsetLeft,
                _this = this,
                cdisX = e.clientX - ckL - disX;
            for (var i = 0; i < rows.length; i++) {
                var op = document.createElement("p");
                op.innerHTML = rows[i].cells[this.cellIndex].innerHTML;
                box.appendChild(op);
            }
            ;
            //alert(box.innerHTML);
            for (var i = 0; i < oth.length; i++) {
                arrn.push(oth[i].offsetLeft);
            }
            ;
            console.log(arrn);
            box.style.display = "block";
            box.style.width = thW + "px";
            box.style.left = disX + "px";
            //未完成 还有事件没写。
            document.onmousemove = function (e) {
                var e = e || window.event,
                    target = e.target || e.srcElement,
                    thW = target.offsetWidth;
                box.style.top = 0;
                box.style.left = e.clientX - ckL - cdisX + "px";
                if (box.offsetLeft > maxl) {
                    box.style.left = maxl + "px";
                } else if (box.offsetLeft < 0) {
                    box.style.left = 0;
                }
                document.onselectstart = function () {
                    return false
                };
                window.getSelection ? window.getSelection().removeAllRanges() : doc.selection.empty();
            }
            document.onmouseup = function (e) {
                var e = e || window.event,
                    opr = box.getElementsByTagName("p"),
                    oboxl = box.offsetLeft + cdisX;
                for (var i = 0; i < arrn.length; i++) {
                    if (arrn[i] < oboxl) {
                        var index = i;
                    }
                }
                for (var i = 0; i < rows.length; i++) {
                    rows[i].cells[_this.cellIndex].innerHTML = "";
                    rows[i].cells[_this.cellIndex].innerHTML = rows[i].cells[index].innerHTML;
                    rows[i].cells[index].innerHTML = "";
                    rows[i].cells[index].innerHTML = opr[i].innerHTML;
                }
                //改变复选框顺序
                upCheckBoxSort(_this.cellIndex, index);

                box.innerHTML = "";
                arrn.splice(0, arrn.length);
                box.style.display = "none";
                document.onmousemove = null;
                document.onmouseup = null;
                document.onselectstart = function () {
                    return false
                };
            }

        }
    }


}

// 更新列名称顺序
function upCheckBoxSort(preIndex, nextIndex) {
    var $boxs = $('#conditionColumn input:checked');
    var preText = $($boxs.get(preIndex)).next().html();
    $($boxs.get(preIndex)).next().html($($boxs.get(nextIndex)).next().html());
    $($boxs.get(nextIndex)).next().html(preText);
}
Drag("tbGrid2");
//Drag("tableSort");