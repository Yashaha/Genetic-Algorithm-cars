//交叉
function crossover(father, mother){
    var Child;//后代染色体
    var crossNum_body = Math.floor(Math.random() * 16) + 1;//车身基因重组次数
    var crossNum_circle = Math.floor(Math.random() * 2) + 1;//车轮半径重组次数

    //随机选择父本或者母本
    if (Math.random() < 0.5){
        Child = father;
    }else {
        Child = mother;
    }

    //车身基因重组
    for(var i = 0; i < crossNum_body; i++){
        var t = Math.floor(Math.random() * 8);//随机选择车身坐标下标
        //随机选择x或者y坐标
        if (Math.random() < 0.5){
            Child[0][t].x = gene_crossover(father[0][t].x, mother[0][t].x);
        }else {
            Child[0][t].y = gene_crossover(father[0][t].y, mother[0][t].y);
        }
    }

    //车轮半径进行基因重组
    for(var i = 0; i < crossNum_circle; i++){
        //随机选择前后轮子
        if (Math.random() < 0.5){
            Child[1][1] = gene_crossover(father[1][1], mother[1][1]);
        }else{
            Child[2][1] = gene_crossover(father[2][1], mother[2][1]);
        }
    }

    return Child;
}

//基因交叉
function gene_crossover(gene1, gene2) {
    var geneNew;//交叉后的新基因
    var start = Math.floor(Math.random() * 5) + 1;//交叉起点
    var end = Math.floor(Math.random() * 5) + 1;//交叉终点

    //判断start与end大小
    if (end < start){
        var temp = start;
        start = end;
        end = temp;
    }

    //转换为数组
    gene1 = gene1.split("");
    gene2 = gene2.split("");

    //基因交换
    for(var i = start; i <= end; i++){
        var temp = gene1[i];
        gene1[i] = gene2[i];
        gene2[i] = temp;
    }

    //随机选择新基因
    if (Math.random() < 0.5){
        geneNew = gene1.join("");
    }else{
        geneNew = gene2.join("");
    }

    return geneNew;
}