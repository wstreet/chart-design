const editableAttrs = [
  {
    title: '图表容器',
    key: 'chart_container',
    attrs: [
      {
        key: 'width',
        name: '宽度',
        viewType: 'InputNumber'
      },
      {
        key: 'height',
        name: '高度',
        viewType: 'InputNumber'
      },
      {
        key: 'title',
        name: '标题',
        viewType: 'Input'
      },
      {
        key: 'subtitle',
        name: '副标题',
        viewType: 'Input'
      }
    ]
  },
  {
    title: '图例',
    key: 'chart_legend',
    attrs: [
      {
        key: 'position',
        name: '位置',
        viewType: 'RadioGroup',
        options: [
          { label: 'top', value: 'top' },
          { label: 'right', value: 'right' },
          { label: 'bottom', value: 'bottom' },
          { label: 'left', value: 'left' },
        ]
      },
      {
        key: 'offsetX',
        name: 'X偏移',
        viewType: 'InputNumber'
      },
      {
        key: 'offsetY',
        name: 'Y偏移',
        viewType: 'InputNumber'
      }
    ]
  },
  {
    title: '图形数据',
    key: 'chart_data',
    attrs: [
      {
        key: 'lineNumber',
        name: '折线数量',
        viewType: 'InputNumber'
      },
      {
        key: 'dimensionItems',
        name: '维度项数',
        viewType: 'InputNumber'
      }
    ]
  },
  {
    title: '图形属性',
    key: 'chart_properties',
    attrs: [
      {
        key: 'type',
        name: '类别',
        viewType: 'Select',
        options: []
      },
      {
        key: 'color',
        name: '颜色',
        viewType: 'Color',
      }
    ]
  }
]

export default editableAttrs