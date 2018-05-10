//更新车子被选中概率表
function update_car_chance_list(){
    var total = 0;//总评分

    //累计总分
    for(var i = 0; i < carNum; i++){
        total += parseFloat(fitness_score_list[i]);
    }

    //计算选中概率
    for(var i = 0; i < carNum; i++){
        car_chance_list[i] = fitness_score_list[i] / total * 100;
    }
}

//轮盘赌算法（选selectNum个下标，不重复，返回选中下标的数组）
function rouletteWheel(){
    var car_select_list = new Array();
    var chance = Math.random() * 100;//随机数选择
    var temp = 0;//概率累加器

    for(var j = 0; j < carNum; j++) {
        temp += car_chance_list[j];
        if (temp > chance)
            return j;
    }
}