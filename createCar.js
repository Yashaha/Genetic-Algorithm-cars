function createCar(world) {
    var bodyDef = new b2BodyDef();
    var fixDef = new b2FixtureDef();
    bodyDef.type = b2Body.b2_dynamicBody;

//////////////////////////////////////////////////////////
////////创建车身
//////////////////////////////////////////////////////////
    var vectorCount = 8;//随机点数量(至少为4)
    var vector = random_vector(vectorCount);//生成随机点集并绕原点顺时针排列好
    var carbody_x = 25;//车身x坐标
    var carbody_y = 11.5;//车身y坐标

    bodyDef.position.x = carbody_x;
    bodyDef.position.y = carbody_y;
    //bodyDef.type = b2Body.b2_staticBody;//设置为静态刚体

    var carbody = world.CreateBody(bodyDef);
    fixDef.shape = new b2PolygonShape();
    fixDef.density = 5;
    fixDef.friction = 0.5;
    fixDef.restitution =0.15;

    //依次构成三角形（box2d不支持凹多边形，所以要分割成凸多边形）
    for(var i = 0; i < vector.length; i++){
        var triangle = new Array();
        triangle[0] = new b2Vec2(0, 0);
        triangle[1] = new b2Vec2(vector[i].x, vector[i].y);
        if (i < vector.length-1){
            triangle[2] = new b2Vec2(vector[i+1].x, vector[i+1].y);
        }else{
            triangle[2] = new b2Vec2(vector[0].x, vector[0].y);
        }
        fixDef.shape.SetAsVector(triangle, 3);

        //添加形状到世界
        carbody.CreateFixture(fixDef);
    }

//////////////////////////////////////////////////////////
////////创建车轮
//////////////////////////////////////////////////////////
    //在车身顶点中随机选择不同的两点作为车轮坐标
    do{
        var c1 = Math.floor(Math.random() * vectorCount);
        var c2 = Math.floor(Math.random() * vectorCount);
    }while(c1 == c2);
    //c1c2直线距离
    var c1c2 = Math.sqrt(Math.pow(vector[c1].x - vector[c2].x, 2) + Math.pow(vector[c1].y - vector[c2].y, 2));

    //随机生成两个轮子半径
    var r1 = Math.random() * 3;
    var r2 = Math.random() * 3;
    //并且轮子不能重叠
    while(c1c2 < r1 + r2){
        if (r1 - 0.1 > 0)
            r1 -= 0.1;
        if (r2 - 0.1 > 0)
            r2 -= 0.1;
    }

    fixDef.density = 1;
    fixDef.friction = 0.8;
    fixDef.restitution =0.15;

    bodyDef.position.x = carbody_x + vector[c1].x;
    bodyDef.position.y = carbody_y + vector[c1].y;
    fixDef.shape = new b2CircleShape(r1);
    var circle1 = world.CreateBody(bodyDef);
    circle1.CreateFixture(fixDef);

    bodyDef.position.x = carbody_x + vector[c2].x;
    bodyDef.position.y = carbody_y + vector[c2].y;
    fixDef.shape = new b2CircleShape(r2);
    var circle2 = world.CreateBody(bodyDef);
    circle2.CreateFixture(fixDef);

//////////////////////////////////////////////////////////
////////创建关节
//////////////////////////////////////////////////////////
    //定义关节1
    var Revjoint1=new b2RevoluteJointDef();
    //设置要连接的两个物体以及旋转点位置
    Revjoint1.Initialize(circle1, carbody, new b2Vec2(carbody_x + vector[c1].x, carbody_y + vector[c1].y));
    Revjoint1.enableMotor = true;
    Revjoint1.motorSpeed = -Math.PI*4;
    Revjoint1.maxMotorTorque = 150;
    world.CreateJoint(Revjoint1);

    //定义关节2
    var Revjoint2=new b2RevoluteJointDef();
    //设置要连接的两个物体以及旋转点位置
    Revjoint2.Initialize(circle2, carbody, new b2Vec2(carbody_x + vector[c2].x, carbody_y + vector[c2].y));
    Revjoint2.enableMotor = true;
    Revjoint2.motorSpeed = -Math.PI*4;
    Revjoint2.maxMotorTorque = 150;
    world.CreateJoint(Revjoint2);
}
//////////////////////////////////////////////////////////
////////所需函数
//////////////////////////////////////////////////////////

//随机生成绕着原点顺时针排列的随机点集（不知什么原因，部分点集会报错，将Box2d.js第3689行注释掉就不报了，但是不知道以后会不会影响其他功能）
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

//////////////////////////////////////////////////////////
////////useless
//////////////////////////////////////////////////////////

//随机生成vectorCount个顶点，极左极右点连接，分成上链下链，然后按照x坐标分别排序上部和下部(会生成凹多边形)
function random_vector1(vectorCount) {
    var init_vector = new Array();//初始化随机点
    var sort_vector = new Array();//极左极右点连线分割成上部分和下部分，按照从左到右，从上到下顺序排列

    //随机生成vectorCount个点并装入init_point中
    for(var i = 0; i < vectorCount; i++){
        init_vector[i] = new b2Vec2(random_point(), random_point());
    }

    //按照x从小到大排列
    var temp = bubble(init_vector);

    //将点集划分为上下部分,D小于零在下方，大于零在上方
    sort_vector[0] = temp[0];//最左边的点
    var x1 = temp[0].x; y1 = temp[0].y;
    var x2 = temp[vectorCount-1].x; y2 = temp[vectorCount-1].y;
    var A = y2 - y1;
    var B = x1 - x2;
    var C = x2 * y1 - x1 * y2;
    //上方（不遍历最左和最右两点）
    for(var i = 1; i < vectorCount-1; i++){
        var D = A * temp[i].x + B * temp[i].y + C;
        if (D > 0) {
            sort_vector.push(temp[i]);
        }
    }
    sort_vector.push(temp[vectorCount-1]);//最右边的点
    //下方（不遍历最左和最右两点）
    for(var i = vectorCount-2; i > 0; i--){
        var D = A * temp[i].x + B * temp[i].y + C;
        if (D < 0){
            sort_vector.push(temp[i]);
        }
    }

    return sort_vector;
}
//冒泡排序（从小到大）
function bubble(arr) {
    for(i=0;i<arr.length-1;i++){
        for(j=0;j<arr.length-1-i;j++){
            if(arr[j].x>arr[j+1].x){
                var temp=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=temp;
            }
        }
    }

    return arr;
}