function ChartInit(){
            // 为echarts对象加载数据
        allPieChart.setOption(allPieoption);
        allInPieChart.setOption(allInPieOption);
        allBarChart.setOption(allBarOption);
}

allPieoption = {
//            title : {
//                text: '支出结构',
//                //subtext: '',
//                x : 'center',
//                y : 'bottom'
//            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                //orient : 'vertical',
                //y : 'left',
                data:['']
            },
            toolbox: {
                orient : 'vertical',
                x : 'right',
                y : 'bottom',
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: true},
//                    magicType : {
//                        show: true,
//                        type: ['pie', 'funnel']
//                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : false,
            series : [
                {
                    name:'消费大类',
                    type:'pie',
                    selectedMode: 'single',
                    radius : [0, 70],


                    itemStyle : {
                        normal : {
                            label : {
                                position : 'inner'
                            },
                            labelLine : {
                                show : false
                            }
                        }
                    },
                    data:[
                        //{value:1, name:'日常生活', selected:true},
//                        {value:1, name:'交通通讯'},
//                        {value:1, name:'服饰美妆'},
//                        {value:1, name:'文化娱乐'},
//                        {value:1, name:'人情往来'},
//                        {value:1, name:'其他支出'}
                    ]
                },
                {
                    name:'消费小类',
                    type:'pie',
                    radius : [90, 130],
                    data:[
                       // {value:1, name:'一日三餐'},
//                        {value:1, name:'地铁公交'},
//                        {value:1, name:'美容美发'},
//                        {value:1, name:'数码产品'},
//                        {value:1, name:'人际往来'},
//                        {value:1, name:'租房租车'},
                    ]
                },
            ]
};

allInPieOption = {
//    title : {
//        text: '收入结构',
//        //subtext: '',
//        x : 'left',
//        y : 'center'
//    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        //orient : 'vertical',
       // x : 'left',
        data:['工资','奖金','补助津贴','公务报销','投资收益']
    },
    toolbox: {
        orient : 'vertical',
        x : 'right',
        y : 'bottom',
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
//            magicType : {
//                show: true,
//                type: ['pie', 'funnel']
//            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'收入结构',
            type:'pie',
            radius : [30, 110],
            center : ['50%', 200],
            roseType : 'radius',
            data:[
                //{value:10, name:'rose1'},
            ]
        }
    ]
};

allBarOption = {
//    backgroundColor:'#87cefa',
    tooltip : {
        trigger: 'axis',
        formatter: function (params,ticket,callback) {
            //console.log(params)
            var res = params[0].name;
            for (var i = 0, l = params.length; i < l; i++) {
                if(params[i].value!=0&&params[i].value!=''){
                    res += '<br/>' + params[i].seriesName + ' : ' + params[i].value;
                }
            }
            setTimeout(function (){
                // 仅为了模拟异步回调
                callback(ticket, res);
            }, 0)
            return 'loading';
        },
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
//        orient : 'vertical',
//        x : 'right',
        data:['']
    },
    toolbox: {
        orient : 'vertical',
        x : 'right',
        y : 'bottom',
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'value'
        }
    ],
    yAxis : [
        {
            type : 'category',
            data : ['']
        }
    ],
    series : [{}
//        {
//            name:'直接访问',
//            type:'bar',
//            stack: '总量',
//            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
//            data:[320, 302, 301, 334, 390, 330, 320]
//        }
    ]
};



var idx = 1;
option = {
    timeline : {
        data : [
            '2013-01-01', '2013-02-01', '2013-03-01', '2013-04-01', '2013-05-01',
            { name:'2013-06-01', symbol:'emptyStar6', symbolSize:8 },
            '2013-07-01', '2013-08-01', '2013-09-01', '2013-10-01', '2013-11-01',
            { name:'2013-12-01', symbol:'star6', symbolSize:8 }
        ],
        label : {
            formatter : function(s) {
                return s.slice(0, 7);
            }
        }
    },
    options : [
        {
//            title : {
//                text: '浏览器占比变化',
//                subtext: '纯属虚构'
//            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                data:['Chrome','Firefox','Safari','IE9+','IE8-']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    center: ['50%', '45%'],
                    radius: '50%',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        }
    ]
};

