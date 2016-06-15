function ChartInit(){
            // 为echarts对象加载数据
        allPieChart.setOption(allPieoption);
        allInPieChart.setOption(allInPieOption);
        allBarChart.setOption(allBarOption);
        allBarChart.setOption(allBarOption);
        monthPieChart.setOption(monthPieOption);
        monthInPieChart.setOption(monthInPieOption);
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
                    dataView : {show: true, readOnly: false},
        //            magicType : {
        //                show: true,
        //                type: ['pie', 'funnel']
        //            },
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
                    itemStyle : {
                        normal : {
                            label : {
                                formatter: function (params) {
                                    var res=params.name+' ('+params.value+')';
                                    return res;
                                },
                            },
                            labelLine : {
                                show : true,
                            },
                        },
                        emphasis: {
                            label: {
                                show: false,
                            },
                            labelLine : {
                                show : false,
                            },
                        }
                    },
                    data:[
                       // {value:1, name:'一日三餐'},
//                        {value:1, name:'地铁公交'},
//                        {value:1, name:'美容美发'},
//                        {value:1, name:'数码产品'},
//                        {value:1, name:'人际往来'},
//                        {value:1, name:'租房租车'},
                    ]
                }
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
            itemStyle : {
                        normal : {
                            label : {
                                formatter: function (params) {
                                    var res=params.name+' ('+params.value+')';
                                    return res;
                                },
                            },
                            labelLine : {
                                show : true,
                            },
                        },
                        emphasis: {
                            label: {
                                show: false,
                            },
                            labelLine : {
                                show : false,
                            },
                        }
                    },
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

monthPieOption = {
    timeline : {
        data : [
            '1990-01-01', '1990-01-01'
        ],
        label : {
            formatter : function(s) {
                return s.slice(0, 7);
            }
        }
    },
    options : [
        {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                data:[]
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
            series : [
                {
                    name:'消费大类',
                    type:'pie',
                    selectedMode: 'single',
                    radius : [0, 70],
                    itemStyle : {
                        normal : {
                            label : {
                                position : 'inner',
                                formatter: function (params) {
                                    var res = params.name;
                                    if (params.value==0)
                                    {res=''}
                                    else
                                    {res=params.name;}
                                    return res;
                                },
                            },
                            labelLine : {
                                show : false
                            }
                        }
                    },
                    data:[]
                },
                {
                    name:'消费小类',
                    type:'pie',
                    radius : [90, 130],
                    itemStyle : {
                        normal : {
                            label : {
                                formatter: function (params) {
                                    var res = params.name;
                                    if (params.value==0)
                                    {res=''}
                                    else
                                    {res=params.name+' ('+params.value+')';}
                                    return res;
                                },
                            },
                            labelLine : {
                                show : false,
                            },
                        },
                        emphasis: {
                            label: {
                                show: false,
                            },
                        }
                    },
                    data:[]
                }
            ]
        }
//        {
//            series : [
//                {
//                    name:'浏览器（数据纯属虚构）',
//                    type:'pie',
//                    data:[]
//                }
//            ]
//        }
    ]
};

monthInPieOption = {
    timeline : {
        data : [
            '1990-01-01', '1990-01-01'
        ],
        label : {
            formatter : function(s) {
                return s.slice(0, 7);
            }
        }
    },
    options : [
        {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
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
            series : [
                {
                    name:'收入',
                    type:'pie',
                    selectedMode: 'single',
                    radius : [30, 110],
                    center : ['50%', 200],
                    roseType : 'radius',
                    itemStyle : {
                        normal : {
                            label : {
                                position : 'outer',
                                formatter: function (params) {
                                    var res = params.name;
                                    if (params.value==0)
                                    {res=''}
                                    else
                                    {res=params.name+' ('+params.value+')';}
                                    return res;
                                },
                            },
                            labelLine : {
                                show : false
                            }
                        }
                    },
                    data:[]
                }
            ]
        }
//        {
//            series : [
//                {
//                    name:'浏览器（数据纯属虚构）',
//                    type:'pie',
//                    data:[]
//                }
//            ]
//        }
    ]
};


