const riskIndicators = {
  "社会安全风险": {
    "信息与舆情风险": [
      "网络谣言",
      "媒体恐慌"
    ],
    "公共秩序风险": [
      "防疫违法",
      "群体性事件"
    ],
    "社会稳定风险": [
      "资源分配不公",
      "地域歧视和污名化"
    ],
    "法律与伦理争议": [
      "隐私泄露",
      "强制隔离合法性"
    ],
    "生命健康风险": {
      "公共卫生系统压力": [
        "医疗垃圾污染",
        "医疗水平"
      ],
      "衍生健康风险": [
        "医疗资源挤兑",
        "食品安全"
      ],
      "心理与社会健康": [
        "群体性焦虑或抑郁",
        "隔离导致的心理障碍"
      ]
    },
    "事故灾难风险": {
      "基础设施故障": [
        "生命线保障(水气电)"
      ],
      "人为事故": [
        "火灾或建筑坍塌",
        "防疫物资运输事故"
      ]
    },
    "公众": {
      "生命风险": [
        "病毒感染",
        "药物疫苗"
      ],
      "心理与情绪风险": [
        "孤独感、抑郁或焦虑",
        "疫情创伤应激"
      ],
      "生存与经济风险": [
        "失业风险",
        "基本生活物资短缺"
      ],
      "社会关系风险": [
        "家庭矛盾激化",
        "社会歧视风险"
      ]
    },
    "技术人员": {
      "职业暴露风险": [
        "医护人员感染",
        "病毒泄漏事故",
        "过劳或职业倦怠"
      ],
      "技术伦理风险": [
        "技术误判"
      ]
    },
    "社会组织(社区)": {
      "政策落实风险": [
        "执行偏差",
        "落地延迟"
      ],
      "防疫管控风险": [
        "外来人员输入风险",
        "外来人员管控风险"
      ],
      "信任与合法性风险": [
        "信任风险",
        "服从风险",
        "监管风险"
      ],
      "服务能力风险": [
        "服务供给不足"
      ]
    },
    "企业": {
      "经营风险": [
        "市场需求",
        "供应链中断"
      ],
      "生产风险": [
        "生产停滞"
      ],
      "资产财务风险": [
        "经营成本",
        "资金流中断"
      ],
      "法律与合规风险": [
        "违反防疫规定",
        "劳资纠纷"
      ]
    },
    "治理过程风险": {
      "准备阶段": {
        "预案制定风险": [
          "内容笼统",
          "操作性不足",
          "与实际需求脱节"
        ],
        "法律漏洞风险": [
          "权责边界未覆盖",
          "执法依据不足"
        ],
        "追责机制不健全": [
          "追责流于形式"
        ]
      },
      "监测预警阶段": {
        "信息报送风险": [
          "延迟或隐瞒"
        ],
        "信息公开风险": [
          "信息发布不清晰"
        ]
      },
      "应对阶段": {
        "决策失误风险": [
          "一刀切",
          "事态误判"
        ],
        "跨部门协作风险": [
          "职责重叠权责分散",
          "沟通不畅效率低下"
        ],
        "人员能力风险": [
          "经验不足",
          "响应迟缓"
        ],
        "国际环境风险": [
          "国际舆论压力",
          "境外输入与处置风险"
        ],
        "技术支撑风险": [
          "病原体检测技术不足",
          "溯源追踪技术不足",
          "健康码失灵"
        ]
      },
      "恢复阶段": {
        "防控常态化风险": [
          "防控倦怠"
        ],
        "疫情反弹风险": [
          "病毒变异和传播"
        ],
        "民生风险": [
          "企业",
          "就业"
        ]
      }
    }
  }
};

// 将风险指标体系转换为扁平化的选项列表
const flattenRiskIndicators = (indicators, prefix = '') => {
  let options = [];
  
  const processItem = (item, currentPrefix) => {
    if (Array.isArray(item)) {
      item.forEach(subItem => {
        options.push(`${currentPrefix} > ${subItem}`);
      });
    } else if (typeof item === 'object') {
      Object.entries(item).forEach(([key, value]) => {
        const newPrefix = currentPrefix ? `${currentPrefix} > ${key}` : key;
        processItem(value, newPrefix);
      });
    }
  };
  
  processItem(indicators, prefix);
  return options;
};

// 生成示例数据(实际应用中应替换为真实导入的数据)
const generateSampleData = () => {
  return [
    { id: '001', content: '#云南公布新增1例无症状详情#【#云南新增1例缅甸输入无症状#】', riskCategory: '', source: '' },
    { id: '002', content: '今日新增确诊病例超过昨日，大家要做好防护措施', riskCategory: '', source: '' },
    { id: '003', content: '疫情期间部分地区对外地人有歧视现象，希望得到重视', riskCategory: '', source: '' },
    { id: '004', content: '某地医疗资源紧张，普通患者就医困难', riskCategory: '', source: '' },
    { id: '005', content: '防疫期间家庭矛盾增多，需要心理干预', riskCategory: '', source: '' }
  ];
};

// 颜色配置
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

// 主应用组件
const App = () => {
  const [currentTab, setCurrentTab] = useState('import');
  const [data, setData] = useState([]);
  const [riskOptions, setRiskOptions] = useState([]);
  const [stats, setStats] = useState([]);
  const [selectedWeiboIndex, setSelectedWeiboIndex] = useState(null);
  const [selectedRisk, setSelectedRisk] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 初始化
  useEffect(() => {
    const options = flattenRiskIndicators(riskIndicators);
    setRiskOptions(options);
    
    // 在实际应用中移除这行，这里仅用于演示
    setData(generateSampleData());
  }, []);

  // 当数据更新时计算统计信息
  useEffect(() => {
    if (data.length > 0) {
      const categoryCounts = {};
      let unclassifiedCount = 0;
      
      data.forEach(item => {
        if (item.riskCategory) {
          if (categoryCounts[item.riskCategory]) {
            categoryCounts[item.riskCategory] += 1;
          } else {
            categoryCounts[item.riskCategory] = 1;
          }
        } else {
          unclassifiedCount += 1;
        }
      });
      
      const statsData = Object.entries(categoryCounts).map(([name, value]) => ({
        name,
        value
      }));
      
      if (unclassifiedCount > 0) {
        statsData.push({ name: '未分类', value: unclassifiedCount });
      }
      
      setStats(statsData);
    }
  }, [data]);

  // 导入CSV文件
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoading(true);
      
      Papa.parse(file, {
        header: true,
        encoding: 'gb18030',
        complete: (results) => {
          const parsedData = results.data.map((row, index) => ({
            id: row['微博ID'] || `id-${index}`,
            content: row['微博正文'] || '',
            riskCategory: '',
            source: 'import'
          })).filter(item => item.content);
          
          setData(parsedData);
          setIsLoading(false);
          setCurrentTab('analysis');
        },
        error: (err) => {
          console.error('解析错误:', err);
          setIsLoading(false);
          alert('文件解析失败，请检查文件格式');
        }
      });
    }
  };

  // 手动标记风险类别
  const handleRiskSelection = () => {
    if (selectedWeiboIndex !== null && selectedRisk) {
      const updatedData = [...data];
      updatedData[selectedWeiboIndex] = {
        ...updatedData[selectedWeiboIndex],
        riskCategory: selectedRisk,
        source: '人工标记'
      };
      setData(updatedData);
      setSelectedWeiboIndex(null);
      setSelectedRisk('');
    }
  };

  // 导出CSV
  const exportToCSV = () => {
    const csvContent = Papa.unparse(data, { encoding: 'gb18030' });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=gb18030;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '风险分析结果.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 过滤搜索结果
  const filteredData = data.filter(item => 
    item.content.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (item.riskCategory && item.riskCategory.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-700 text-white p-4">
        <h1 className="text-2xl font-bold">社会安全风险分析系统</h1>
      </header>
      
      <div className="container mx-auto p-4">
        {/* 导航标签 */}
        <div className="flex mb-6">
          <button 
            className={`px-4 py-2 mr-2 rounded-t-lg ${currentTab === 'import' ? 'bg-white font-bold' : 'bg-gray-200'}`}
            onClick={() => setCurrentTab('import')}
          >
            1. 数据导入
          </button>
          <button 
            className={`px-4 py-2 mr-2 rounded-t-lg ${currentTab === 'analysis' ? 'bg-white font-bold' : 'bg-gray-200'}`}
            onClick={() => setCurrentTab('analysis')}
          >
            2. 风险分析
          </button>
          <button 
            className={`px-4 py-2 mr-2 rounded-t-lg ${currentTab === 'results' ? 'bg-white font-bold' : 'bg-gray-200'}`}
            onClick={() => setCurrentTab('results')}
          >
            3. 结果展示
          </button>
        </div>
        
        {/* 模块内容 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* 数据导入模块 */}
          {currentTab === 'import' && (
            <div>
              <h2 className="text-xl font-bold mb-4">数据导入模块</h2>
              <p className="mb-4">请选择要分析的微博数据文件（CSV格式）:</p>
              
              <div className="mb-6">
                <input 
                  type="file" 
                  accept=".csv" 
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </div>
              
              {isLoading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    加载中...
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="font-bold mt-6 mb-2">数据预览:</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">微博ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">微博正文</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {data.slice(0, 5).map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{item.content}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {data.length > 0 && (
                    <div className="mt-4">
                      <p>已加载 {data.length} 条数据</p>
                      <button 
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        onClick={() => setCurrentTab('analysis')}
                      >
                        继续到风险分析
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* 风险分析模块 */}
          {currentTab === 'analysis' && (
            <div>
              <h2 className="text-xl font-bold mb-4">风险分析模块</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 微博内容列表 */}
                <div>
                  <h3 className="font-bold mb-2">微博内容:</h3>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="搜索微博内容..."
                      className="w-full p-2 border rounded-md"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="overflow-y-auto max-h-96 border rounded-md">
                    {filteredData.map((item, index) => (
                      <div 
                        key={index} 
                        className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${selectedWeiboIndex === index ? 'bg-blue-50' : ''}`}
                        onClick={() => setSelectedWeiboIndex(index)}
                      >
                        <p className="text-sm text-gray-900">{item.content}</p>
                        {item.riskCategory && (
                          <p className="text-xs text-blue-600 mt-1">
                            已标记: {item.riskCategory} ({item.source})
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* 风险指标选择 */}
                <div>
                  <h3 className="font-bold mb-2">风险指标选择:</h3>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="搜索风险指标..."
                      className="w-full p-2 border rounded-md"
                      onChange={(e) => {
                        const searchTerm = e.target.value.toLowerCase();
                        if (searchTerm) {
                          const filteredOptions = flattenRiskIndicators(riskIndicators).filter(
                            option => option.toLowerCase().includes(searchTerm)
                          );
                          setRiskOptions(filteredOptions);
                        } else {
                          setRiskOptions(flattenRiskIndicators(riskIndicators));
                        }
                      }}
                    />
                  </div>
                  <div className="overflow-y-auto max-h-96 border rounded-md">
                    {riskOptions.map((option, index) => (
                      <div 
                        key={index} 
                        className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${selectedRisk === option ? 'bg-blue-50' : ''}`}
                        onClick={() => setSelectedRisk(option)}
                      >
                        <p className="text-sm">{option}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button 
                  className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded ${(!selectedWeiboIndex && selectedWeiboIndex !== 0) || !selectedRisk ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleRiskSelection}
                  disabled={(!selectedWeiboIndex && selectedWeiboIndex !== 0) || !selectedRisk}
                >
                  标记风险
                </button>
                <button 
                  className="ml-4 bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded"
                  onClick={() => setCurrentTab('results')}
                >
                  查看分析结果
                </button>
              </div>
            </div>
          )}
          
          {/* 结果展示模块 */}
          {currentTab === 'results' && (
            <div>
              <h2 className="text-xl font-bold mb-4">结果展示模块</h2>
              
              <div className="mb-6">
                <button 
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                  onClick={exportToCSV}
                >
                  导出分析结果 (CSV)
                </button>
              </div>
              
              {/* 统计视图 */}
              <div className="mb-8">
                <h3 className="font-bold mb-4">风险分布统计:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-center mb-4">风险类别占比</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={stats}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {stats.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-center mb-4">风险类别数量</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={stats}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 表格视图 */}
              <div>
                <h3 className="font-bold mb-2">风险分析详情:</h3>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="搜索微博内容或风险类别..."
                    className="w-full p-2 border rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">微博ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">微博正文</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">风险类别</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">标记来源</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredData.map((item, index) => (
                        <tr key={index} className={!item.riskCategory ? 'bg-yellow-50' : ''}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{item.content}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{item.riskCategory || '未分类'}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{item.source || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* 未分类内容 */}
                <div className="mt-8">
                  <h3 className="font-bold mb-2">未分类内容:</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">微博ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">微博正文</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {data.filter(item => !item.riskCategory).map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{item.content}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {data.filter(item => !item.riskCategory).length === 0 && (
                    <p className="py-4 text-green-600">没有未分类内容</p>
                  )}
                </div>
                
                <div className="mt-6">
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
                    onClick={() => setCurrentTab('analysis')}
                  >
                    返回继续标记
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 渲染应用
ReactDOM.render(<App />, document.getElementById('root'));
