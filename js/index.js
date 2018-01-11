$(function(){
    let qipan = $('.qipan');
    let flag = true,
        hei = {},
        bai = {},
        blank = {};
    let AI = true;//人人false；人机：true
    $('.ai').on('click',function(){
        AI = true;
    })
    $('.people').on('click',function(){
        AI = false;
    })
    $('.new').on('click',function(){
        location.reload();
    })
    for (let i = 0; i < 15; i++) {
        $('<i>').appendTo(qipan);
        $('<b>').appendTo(qipan);
        for (let j = 0; j < 15; j++) {
            blank[i+'_'+j]=true;
            $('<span>')
                .appendTo(qipan)
                .attr('id',i+'_'+j)
                .addClass('qizi')
                .data('pos',{x: i, y: j})
        }
    }
    qipan.on('click', '.qizi', function () {
        if ($(this).hasClass('hei') || $(this).is('.bai')) {
            return;
        }
        let data = $(this).data('pos');
        delete blank[data.x+"_"+data.y];
        if (flag) {
            $(this).addClass('hei');
            hei[data.x + "_" + data.y] = true;
            if (suc(data, hei) >= 5) {
                alert('黑棋获胜！');
                qipan.off();
            }
            //人机
            if(AI){
                //坐标
                let pos = position();
                $('#' + pos.x+"_"+pos.y).addClass('bai');
                bai[pos.x + "_" + pos.y] = true;
                delete blank[pos.x+"_"+pos.y];
                if(suc(pos, bai) >= 5){
                    alert('白棋获胜！');
                    qipan.off();
                }
                return;
            }
        } else {
            $(this).addClass('bai');
            bai[data.x + "_" + data.y] = true;
            if (suc(data, bai) >= 5) {
                console.log('bai');
                alert('白棋获胜！');
                qipan.off();
            }
        }
        flag = !flag;
    });
    //人机位置
    function position(){
        let scoreh = 0,scoreb = 0,posh = null,posb = null;
        for(let i in blank){
            // i i_j {x:i,y:j}
            let obj = {x:i.split('_')[0],y:i.split('_')[1]};
            if(suc(obj,hei)>scoreh){
                scoreh = suc(obj,hei);
                posh = obj;
            }
            if(suc(obj,bai)>scoreb){
                scoreb = suc(obj,bai);
                posb = obj;
            }
        }
        return scoreh >= scoreb ? posh : posb;
    }
    //检测横、竖、左斜、右斜
    function suc(pos, obj) {
        // {x:7,y:7} hei
        let rows = 1, cols = 1, yx = 1, zx = 1,
            x = pos.x, y = pos.y;

        while (obj[x + "_" + (++y)]) {
            rows++;
        }
        y = pos.y;
        while (obj[x + "_" + (--y)]) {
            rows++;
        }
        x = pos.x , y = pos.y ;
        while (obj[(++x) + "_" + y]) {

            cols++;
        }
        x = pos.x;
        while (obj[(--x) + "_" + y]) {
            cols++;
        }
        x = pos.x , y = pos.y;
        while (obj[(++x) + "_" + (++y)]) {
            zx++;
        }
        x = pos.x , y = pos.y;
        while (obj[(--x) + "_" + (--y)]) {
            zx++;
        }
        x = pos.x , y = pos.y;
        while (obj[(--x) + "_" + (++y)]) {
            yx++;
        }
        x = pos.x , y = pos.y;
        while (obj[(++x) + "_" + (--y)]) {
            yx++;
        }
        return  Math.max(rows,cols,zx,yx);
    }
})