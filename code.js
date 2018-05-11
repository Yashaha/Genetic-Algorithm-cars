//编码(将全局变量ChromosomeGroup从10进制转2进制)
function encode(){
    //body坐标乘以10转为二进制
    for(var i = 0; i < ChromosomeGroup.length; i++){
        //判断是否为十进制(判断第一个轮子半径是否长度为6)
        if (ChromosomeGroup[i][1][1].length != "6"){
            for(var j = 0; j < ChromosomeGroup[i][0].length; j++){
                //进制转换
                ChromosomeGroup[i][0][j].x = (ChromosomeGroup[i][0][j].x*10).toString(2);
                ChromosomeGroup[i][0][j].y = (ChromosomeGroup[i][0][j].y*10).toString(2);
                //统一坐标格式
                ChromosomeGroup[i][0][j].x = format(ChromosomeGroup[i][0][j].x);
                ChromosomeGroup[i][0][j].y = format(ChromosomeGroup[i][0][j].y);
            }

            //circle参数乘以10转为二进制
            ChromosomeGroup[i][1][0] = (ChromosomeGroup[i][1][0]*10).toString(2);
            ChromosomeGroup[i][2][0] = (ChromosomeGroup[i][2][0]*10).toString(2);
            ChromosomeGroup[i][1][1] = (ChromosomeGroup[i][1][1]*10).toString(2);
            ChromosomeGroup[i][2][1] = (ChromosomeGroup[i][2][1]*10).toString(2);
            //统一直径格式（下标不作基因重组）
            ChromosomeGroup[i][1][1] = format(ChromosomeGroup[i][1][1]);
            ChromosomeGroup[i][2][1] = format(ChromosomeGroup[i][2][1]);
        }
    }

}

//解码（将全局变量ChromosomeGroup从2进制转10进制）
function decode(){
    for(var i = 0; i < ChromosomeGroup.length; i++){
        //判断是否为二进制(判断第一个轮子半径是否长度为6)
        if (ChromosomeGroup[i][1][1].length == "6"){
            for(var j = 0; j < ChromosomeGroup[i][0].length; j++){
                //body坐标转为10进制再除以十
                ChromosomeGroup[i][0][j].x = parseInt(ChromosomeGroup[i][0][j].x, 2) / 10;
                ChromosomeGroup[i][0][j].y = parseInt(ChromosomeGroup[i][0][j].y, 2) / 10;
            }

            //circle参数转为10进制再除以十
            ChromosomeGroup[i][1][0] = parseInt(ChromosomeGroup[i][1][0], 2) / 10;
            ChromosomeGroup[i][2][0] = parseInt(ChromosomeGroup[i][2][0], 2) / 10;
            ChromosomeGroup[i][1][1] = parseInt(ChromosomeGroup[i][1][1], 2) / 10;
            ChromosomeGroup[i][2][1] = parseInt(ChromosomeGroup[i][2][1], 2) / 10;
        }
    }
}

//解码，对传入的参数Chr进行解码
function decode2(Chr){
    //body坐标转为10进制再除以十
    for(var j = 0; j < Chr[0].length; j++){
        Chr[0][j].x = parseInt(Chr[0][j].x, 2) / 10;
        Chr[0][j].y = parseInt(Chr[0][j].y, 2) / 10;
    }

    //circle参数转为10进制再除以十
    Chr[1][0] = parseInt(Chr[1][0], 2) / 10;
    Chr[2][0] = parseInt(Chr[2][0], 2) / 10;
    Chr[1][1] = parseInt(Chr[1][1], 2) / 10;
    Chr[2][1] = parseInt(Chr[2][1], 2) / 10;

    return Chr;
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
        num = "+" + num;
    }

    return num;
}