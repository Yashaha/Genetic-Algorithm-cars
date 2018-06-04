function mutation(Chr) {
    Chr = encode2(Chr);//转为二进制
    for(var i = 0; i < Chr[0].length; i++){
        Chr[0][i].x = gene_mutation(Chr[0][i].x);
        Chr[0][i].y = gene_mutation(Chr[0][i].y);
    }

    Chr[1][1] = gene_mutation(Chr[1][1]);
    Chr[2][1] = gene_mutation(Chr[2][1]);

    return Chr;
}

function gene_mutation(gene) {
    gene = gene.split("");
    for(var i = 1; i < 6; i++){
        if (gene[i] == "0"){
            gene[i] = "1";
        }else{
            gene[i] = "0";
        }
    }

    gene = gene.join("");
    return gene;
}