const editableAttrs = [
  {
    title: '图表容器',
    groupKey: 'chart_container',
    attrs: [
      {
        attrKey: 'width',
        name: '宽度',
        viewType: 'InputNumber'
      },
      {
        attrKey: 'height',
        name: '高度',
        viewType: 'InputNumber'
      },
      {
        attrKey: 'title',
        name: '标题',
        viewType: 'Input'
      },
      {
        attrKey: 'subtitle',
        name: '副标题',
        viewType: 'Input'
      }
    ]
  },
  {
    title: '图例',
    groupKey: 'chart_legend',
    attrs: [
      {
        attrKey: 'position',
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
        attrKey: 'offsetX',
        name: 'X偏移',
        viewType: 'InputNumber'
      },
      {
        attrKey: 'offsetY',
        name: 'Y偏移',
        viewType: 'InputNumber'
      }
    ]
  },
  {
    title: '图形数据',
    groupKey: 'chart_data',
    attrs: [
      {
        attrKey: 'lineNumber',
        name: '折线数量',
        viewType: 'InputNumber'
      },
      {
        attrKey: 'dimensionItems',
        name: '维度项数',
        viewType: 'InputNumber'
      }
    ]
  },
  {
    title: '图形属性',
    groupKey: 'chart_properties',
    attrs: [
      {
        attrKey: 'type',
        name: '类别',
        viewType: 'Select',
        options: []
      },
      {
        attrKey: 'color',
        name: '颜色',
        viewType: 'Color',
      }
    ]
  }
]

export default editableAttrs