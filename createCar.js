function createCar(world, Chromosome) {
    var bodyDef = new b2BodyDef();
    var fixDef = new b2FixtureDef();
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.userData = "carbody";

//////////////////////////////////////////////////////////
////////创建车身
//////////////////////////////////////////////////////////
    var vector = Chromosome[0];//车身基因
    var carbody_x = 25;//车身x坐标
    var carbody_y = 11.5;//车身y坐标

    bodyDef.position.x = carbody_x;
    bodyDef.position.y = carbody_y;
    //bodyDef.type = b2Body.b2_staticBody;//设置为静态刚体

    var carbody = world.CreateBody(bodyDef);
    fixDef.shape = new b2PolygonShape();
    fixDef.density = 3;
    fixDef.friction = 0.5;
    fixDef.restitution =0.15;
    fixDef.filter.categoryBits = 0x0002;
    fixDef.filter.maskBits = 0x0001;

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

    var c1 = Chromosome[1][0];
    var c2 = Chromosome[2][0];
    var r1 = Chromosome[1][1];
    var r2 = Chromosome[2][1];

    fixDef.density = 1;
    fixDef.friction = 1;
    fixDef.restitution =0.15;

    bodyDef.userData = "carcircle";
    bodyDef.position.x = carbody_x + vector[c1].x;
    bodyDef.position.y = carbody_y + vector[c1].y;
    fixDef.shape = new b2CircleShape(r1);
    fixDef.filter.categoryBits = 0x0004;
    fixDef.filter.maskBits = 0x0001;
    var circle1 = world.CreateBody(bodyDef);
    circle1.CreateFixture(fixDef);

    bodyDef.position.x = carbody_x + vector[c2].x;
    bodyDef.position.y = carbody_y + vector[c2].y;
    fixDef.shape = new b2CircleShape(r2);
    fixDef.filter.categoryBits = 0x0006;
    fixDef.filter.maskBits = 0x0001;
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
    Revjoint1.motorSpeed = -Math.PI * 5;
    Revjoint1.maxMotorTorque = 150;
    world.CreateJoint(Revjoint1);

    //定义关节2
    var Revjoint2=new b2RevoluteJointDef();
    //设置要连接的两个物体以及旋转点位置
    Revjoint2.Initialize(circle2, carbody, new b2Vec2(carbody_x + vector[c2].x, carbody_y + vector[c2].y));
    Revjoint2.enableMotor = true;
    Revjoint2.motorSpeed = -Math.PI * 5;
    Revjoint2.maxMotorTorque = 150;
    world.CreateJoint(Revjoint2);
}


//////////////////////////////////////////////////////////
////////所需函数
//////////////////////////////////////////////////////////

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