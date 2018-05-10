//创建地面
function createGround(world) {
    var bodyDef = new b2BodyDef();
    var fixDef = new b2FixtureDef();

    bodyDef.type = b2Body.b2_staticBody;
    bodyDef.position.x = 0;
    bodyDef.position.y = 0;
    bodyDef.userData = "ground";

    fixDef.shape = new b2PolygonShape();
    fixDef.density = 20.0;
    fixDef.friction = 1;
    fixDef.restitution = 0.15;

    //道路生成
    var p1 = new b2Vec2(0, 17);//线段起点
    var p2 = new b2Vec2(2, 17);//线段终点
    var next_ground_x,next_ground_y;//p2的下一个坐标
    for(var i = 0; i <= 150; i++){
        fixDef.shape.SetAsEdge(p1, p2);//生成线段
        world.CreateBody(bodyDef).CreateFixture(fixDef);
        p1 = p2;//使下一条线段起点为上一条的终点
        next_ground_x = random_ground_x(i);//随机生成下一个x坐标偏移量
        next_ground_y = random_ground_y(next_ground_x, i);//生成下一个y坐标偏移量
        p2 = new b2Vec2(p1.x + next_ground_x, p1.y + next_ground_y);
    }
}

//随机生成下一个x坐标偏移量
function random_ground_x(i) {
    var temp_x;
    if (i <= 30){
        do {
            temp_x = Math.random() * 2;
        }while(temp_x < 1.97);//角度不超过10度
        return temp_x;
    }
    if(i > 30 && i <= 55){
        do {
            temp_x = Math.random() * 2;
        }while(temp_x < 1.732);//角度不超过30度
        return temp_x;
    }
    if(i > 55 && i <= 115){
        do {
            temp_x = Math.random() * 2;
        }while(temp_x < 1.286);//角度不超过50度
        return temp_x;
    }
    if(i > 115 && i < 150){
        do {
            temp_x = Math.random() * 2;
        }while(temp_x < 1);//角度不超过60度
        return temp_x;
    }
}

//通过三角函数生成下一个y坐标偏移量
function random_ground_y(next_x, i) {
    //50%概率增加或者减少y值
    if (Math.random() - 0.5 < 0){
        return Math.sqrt(4 - next_x * next_x);
    }else{
        return -Math.sqrt(4 - next_x * next_x);
    }
}