//编码(将全局变量ChromosomeGroup从10进制转2进制)
function encode(){
    //body坐标乘以10转为二进制
    for(var i = 0; i < ChromosomeGroup.length; i++){
        for(var j = 0; j < ChromosomeGroup[i][0].length; j++){
            //进制转换
            ChromosomeGroup[i][0][j].x = (ChromosomeGroup[i][0][j].x*10).toString(2);
            ChromosomeGroup[i][0][j].y = (ChromosomeGroup[i][0][j].y*10).toString(2);
            //统一坐标格式
            ChromosomeGroup[i][0][j].x = format(ChromosomeGroup[i][0][j].x);
            ChromosomeGroup[i][0][j].y = format(ChromosomeGroup[i][0][j].y);
        }
    }

    //circle参数乘以10转为二进制
    for(var i = 0; i < ChromosomeGroup.length; i++){
        //进制转换
        ChromosomeGroup[i][1][0] = (ChromosomeGroup[i][1][0]*10).toString(2);
        ChromosomeGroup[i][2][0] = (ChromosomeGroup[i][2][0]*10).toString(2);
        ChromosomeGroup[i][1][1] = (ChromosomeGroup[i][1][1]*10).toString(2);
        ChromosomeGroup[i][2][1] = (ChromosomeGroup[i][2][1]*10).toString(2);
        //统一直径格式（下标不作基因重组）
        ChromosomeGroup[i][1][1] = format(ChromosomeGroup[i][1][1]);
        ChromosomeGroup[i][2][1] = format(ChromosomeGroup[i][2][1]);
    }
}

//解码（将全局变量ChromosomeGroup从2进制转10进制）
function decode(){
    //body坐标转为10进制再除以十
    for(var i = 0; i < ChromosomeGroup.length; i++){
        for(var j = 0; j < ChromosomeGroup[i][0].length; j++){
            ChromosomeGroup[i][0][j].x = parseInt(ChromosomeGroup[i][0][j].x, 2) / 10;
            ChromosomeGroup[i][0][j].y = parseInt(ChromosomeGroup[i][0][j].y, 2) / 10;
        }
    }

    //circle参数转为10进制再除以十
    for(var i = 0; i < ChromosomeGroup.length; i++){
        ChromosomeGroup[i][1][0] = parseInt(ChromosomeGroup[i][1][0], 2) / 10;
        ChromosomeGroup[i][2][0] = parseInt(ChromosomeGroup[i][2][0], 2) / 10;
        ChromosomeGroup[i][1][1] = parseInt(ChromosomeGroup[i][1][1], 2) / 10;
        ChromosomeGroup[i][2][1] = parseInt(ChromosomeGroup[i][2][1], 2) / 10;
    }
}

//统一二进制格式为5位
function format(num) {
    if (num.substr(0,1) == "-"){
        var addbit = 6 - num.length;
        num = num.substr(1);
        for (var i = 0; i < addbit; i++)
            num = "0" + num;
        num = "-" + num;
    }else{
        var addbit = 5 - num.length;
        for (var i = 0; i < addbit; i++)
            num = "0" + num;
    }

    return num;
}