function randomChromosome(vectorCount) {
    var Chromosome;
    var carbodyChromosome;
    var carcirleChromosome1;
    var carcirleChromosome2;

    //生成车身分布点基因
    carbodyChromosome = random_vector(vectorCount);

    //在车身顶点中随机选择不同的两点作为车轮坐标，c1,c2为数组下标
    do{
        var c1 = Math.floor(Math.random() * vectorCount);
        var c2 = Math.floor(Math.random() * vectorCount);
    }while(c1 == c2);

    //随机生成两个轮子半径,不小于0.5米(前面不加“+”号浏览器无法正常运行，不知为何)
    var r1 = +(Math.random() * 3).toFixed(1);
    var r2 = +(Math.random() * 3).toFixed(1);

    //生成轮子位置和半径基因
    carcirleChromosome1 = new Array(c1, r1);
    carcirleChromosome2 = new Array(c2, r2);

    Chromosome = new Array(carbodyChromosome, carcirleChromosome1, carcirleChromosome2);
    return Chromosome;
}

//随机生成绕着原点顺时针排列的随机点集
function random_vector(vectorCount) {
    var init_vector = new Array();//初始化随机点
    var sort_vector = new Array();//绕着原点顺时针排列随机点
    var quadrantCount;//统计生成点分布在几个象限，每个象限都存在随机点，才不会产生三角形重叠

    //检测是否分布在四个象限
    do{
        quadrantCount = 0;
        sort_vector.splice(0,sort_vector.length);//清空数组
        //随机生成vectorCount个点并装入init_point中
        for(var i = 0; i < vectorCount; i++){
            init_vector[i] = new b2Vec2(random_point(), random_point());
            //如果坐标在坐标轴上，i--，下一次循环再次生成该坐标
            if (init_vector[i].x * init_vector[i].y == 0)
                i--;
        }

        //第一象限排序
        for(var i = 0, temp = new Array(); i < vectorCount; i++){
            if(init_vector[i].x < 0 && init_vector[i].y < 0){
                temp.push(init_vector[i]);
            }

            if (i == vectorCount-1){
                var temp1 = bubble_quadrant(temp);
                if (isline(temp1)) quadrantCount = -1;//存在同一条直线上的两点，需要重新生成
                if (temp1.length != 0){
                    quadrantCount++;
                    for(var j = 0; j < temp1.length; j++)
                        sort_vector.push(temp1[j]);
                }
            }
        }

        //第二象限排序
        for(var i = 0, temp = new Array(); i < vectorCount; i++){
            if(init_vector[i].x > 0 && init_vector[i].y < 0){
                temp.push(init_vector[i]);
            }
            if (i == vectorCount-1){
                var temp1 = bubble_quadrant(temp);
                if (isline(temp1)) quadrantCount = -1;//存在同一条直线上的两点，需要重新生成
                if (temp1.length != 0){
                    quadrantCount++;
                    for(var j = 0; j < temp1.length; j++)
                        sort_vector.push(temp1[j]);
                }
            }
        }

        //第三象限排序
        for(var i = 0, temp = new Array(); i < vectorCount; i++){
            if(init_vector[i].x > 0 && init_vector[i].y > 0){
                temp.push(init_vector[i]);
            }
            if (i == vectorCount-1){
                var temp1 = bubble_quadrant(temp);
                if (isline(temp1)) quadrantCount = -1;//存在同一条直线上的两点，需要重新生成
                if (temp1.length != 0){
                    quadrantCount++;
                    for(var j = 0; j < temp1.length; j++)
                        sort_vector.push(temp1[j]);
                }
            }
        }

        //第四象限排序
        for(var i = 0, temp = new Array(); i < vectorCount; i++){
            if(init_vector[i].x < 0 && init_vector[i].y > 0){
                temp.push(init_vector[i]);
            }
            if (i == vectorCount-1){
                var temp1 = bubble_quadrant(temp);
                if (isline(temp1)) quadrantCount = -1;//存在同一条直线上的两点，需要重新生成
                if (temp1.length != 0){
                    quadrantCount++;
                    for(var j = 0; j < temp1.length; j++)
                        sort_vector.push(temp1[j]);
                }
            }
        }
    }while(quadrantCount < 4);
    return sort_vector;
}
//随机生成多边形顶点
function random_point() {
    if(Math.random() < 0.5){
        return -(Math.random() * 3).toFixed(1);
    }else{
        return +(Math.random() * 3).toFixed(1);
    }
}
//检测两点是否在同一直线上，存在返回true，不存在返回false
function isline(arr) {
    for(var i = 0; i < arr.length; i++){
        var temp = arr[i];
        for(var j = i + 1; j < arr.length; j++){
            if (temp.y*arr[j].x == arr[j].y*temp.x)
                return true;//存在同一直线上的点
        }
    }
    return false;//不存在同一直线上的点
}
//冒泡排序改版（象限排序）
function bubble_quadrant(arr) {
    //按照斜率从小到大排序
    for(i=0;i<arr.length-1;i++){
        for(j=0;j<arr.length-1-i;j++){
            if(arr[j].y/arr[j].x>arr[j+1].y/arr[j+1].x){
                var temp=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=temp;
            }
        }
    }

    return arr;
}

//基因重组后对全局变量ChromosomeGroup进行坐标排序(废弃)
function sort_ChromosomeGroup(vectorCount) {
    var init_vector = ChromosomeGroup;//乱序
    var sort_vector = new Array();//绕着原点顺时针排列随机点


    //如果坐标在坐标轴上，坐标+0.1
    for(var i = 0; i < init_vector.length; i++){
        for(var j = 0; j < init_vector[i][0].length; j++){
            if (init_vector[i][0][j].x == 0) init_vector[i][0][j].x += 0.1;
            if (init_vector[i][0][j].y == 0) init_vector[i][0][j].y += 0.1;
        }
    }

    for(var k = 0; k < init_vector.length; k++) {
        //第一象限排序
        for (var i = 0, temp = new Array(); i < vectorCount; i++) {
            if (init_vector[k][0][i].x < 0 && init_vector[k][0][i].y < 0) {
                temp.push(init_vector[i]);
            }

            if (i == vectorCount - 1) {
                if (isline(temp)) {
                    var arr1 = temp;
                    for (var c = 0; c < arr1.length; c++) {
                        var arr2 = arr[c];
                        for (var f = c + 1; f < arr1.length; f++) {
                            if (arr2.y * arr1[f].x == arr1[f].y * arr2.x)
                                temp[f].y -= 0.1;//存在同一直线上的点
                        }
                    }
                }//存在同一条直线上的两点，其中一点y+0.1

                var temp1 = bubble_quadrant(temp);//排序
                for (var j = 0; j < temp1.length; j++)
                    sort_vector.push(temp1[j]);
            }
        }


        //第二象限排序
        for (var i = 0, temp = new Array(); i < vectorCount; i++) {
            if (init_vector[k][0][i].x > 0 && init_vector[k][0][i].y < 0) {
                temp.push(init_vector[i]);
            }
            if (i == vectorCount - 1) {
                if (isline(temp)) {
                    var arr1 = temp;
                    for (var c = 0; c < arr1.length; c++) {
                        var arr2 = arr[c];
                        for (var f = c + 1; f < arr1.length; f++) {
                            if (arr2.y * arr1[f].x == arr1[f].y * arr2.x)
                                temp[f].y -= 0.1;//存在同一直线上的点
                        }
                    }
                }//存在同一条直线上的两点，其中一点y+0.1

                var temp1 = bubble_quadrant(temp);//排序
                for (var j = 0; j < temp1.length; j++)
                    sort_vector.push(temp1[j]);
            }
        }


        //第三象限排序
        for (var i = 0, temp = new Array(); i < vectorCount; i++) {
            if (init_vector[k][0][i].x > 0 && init_vector[k][0][i].y > 0) {
                temp.push(init_vector[i]);
            }
            if (i == vectorCount - 1) {
                if (isline(temp)) {
                    var arr1 = temp;
                    for (var c = 0; c < arr1.length; c++) {
                        var arr2 = arr[c];
                        for (var f = c + 1; f < arr1.length; f++) {
                            if (arr2.y * arr1[f].x == arr1[f].y * arr2.x)
                                temp[f].y -= 0.1;//存在同一直线上的点
                        }
                    }
                }//存在同一条直线上的两点，其中一点y+0.1

                var temp1 = bubble_quadrant(temp);//排序
                for (var j = 0; j < temp1.length; j++)
                    sort_vector.push(temp1[j]);
            }
        }


        //第四象限排序
        for (var i = 0, temp = new Array(); i < vectorCount; i++) {
            if (init_vector[k][0][i].x < 0 && init_vector[k][0][i].y > 0) {
                temp.push(init_vector[i]);
            }
            if (i == vectorCount - 1) {
                if (isline(temp)) {
                    var arr1 = temp;
                    for (var c = 0; c < arr1.length; c++) {
                        var arr2 = arr[c];
                        for (var f = c + 1; f < arr1.length; f++) {
                            if (arr2.y * arr1[f].x == arr1[f].y * arr2.x)
                                temp[f].y -= 0.1;//存在同一直线上的点
                        }
                    }
                }//存在同一条直线上的两点，其中一点y+0.1

                var temp1 = bubble_quadrant(temp);//排序
                for (var j = 0; j < temp1.length; j++)
                    sort_vector.push(temp1[j]);
            }
        }

        ChromosomeGroup[k][0] = sort_vector;
    }

}

//对单个染色体进行排序
function sort_Chromosome(Chr) {
    var init_vector = Chr;//初始化随机点
    var sort_vector = new Array();//绕着原点顺时针排列随机点

    for(var i = 0; i < init_vector[0].length; i++){
        //如果坐标在坐标轴上，坐标加0.1
        if (init_vector[0][i].x == 0) init_vector[0][i].x += 0.1;
        if (init_vector[0][i].y == 0) init_vector[0][i].y += 0.1;
    }

    //第一象限排序
    for(var i = 0, temp = new Array(); i < init_vector[0].length; i++){
        if(init_vector[0][i].x < 0 && init_vector[0][i].y < 0){
            temp.push(init_vector[0][i]);
        }

        if (i == init_vector[0].length-1){
            var temp1 = bubble_quadrant(temp);
            if (temp1.length != 0){
                for(var j = 0; j < temp1.length; j++)
                    sort_vector.push(temp1[j]);
            }
        }
    }

    //第二象限排序
    for(var i = 0, temp = new Array(); i < init_vector[0].length; i++){
        if(init_vector[0][i].x > 0 && init_vector[0][i].y < 0){
            temp.push(init_vector[0][i]);
        }

        if (i == init_vector[0].length-1){
            var temp1 = bubble_quadrant(temp);
            if (temp1.length != 0){
                for(var j = 0; j < temp1.length; j++)
                    sort_vector.push(temp1[j]);
            }
        }
    }

    //第三象限排序
    for(var i = 0, temp = new Array(); i < init_vector[0].length; i++){
        if(init_vector[0][i].x > 0 && init_vector[0][i].y > 0){
            temp.push(init_vector[0][i]);
        }

        if (i == init_vector[0].length-1){
            var temp1 = bubble_quadrant(temp);
            if (temp1.length != 0){
                for(var j = 0; j < temp1.length; j++)
                    sort_vector.push(temp1[j]);
            }
        }
    }

    //第四象限排序
    for(var i = 0, temp = new Array(); i < init_vector[0].length; i++){
        if(init_vector[0][i].x < 0 && init_vector[0][i].y > 0){
            temp.push(init_vector[0][i]);
        }

        if (i == init_vector[0].length-1){
            var temp1 = bubble_quadrant(temp);
            if (temp1.length != 0){
                for(var j = 0; j < temp1.length; j++)
                    sort_vector.push(temp1[j]);
            }
        }
    }

    Chr[0] = sort_vector;
    return Chr;
}