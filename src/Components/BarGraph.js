import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';
import * as d3Scale from 'd3-scale';

const BarGraph = () => {
  // Generate random percentages for subjects
  const subjectsData = [
    { subject: 'Maths', percentage: Math.floor(Math.random() * 101) },
    { subject: 'Science', percentage: Math.floor(Math.random() * 101) },
    { subject: 'Geology', percentage: Math.floor(Math.random() * 101) },
    { subject: 'Economics', percentage: Math.floor(Math.random() * 101) },
  ];

  // Calculate scales for x and y axes
  const xScale = d3Scale.scaleBand().domain(subjectsData.map(data => data.subject)).range([0, 300]).padding(0.1);
  const yScale = d3Scale.scaleLinear().domain([0, 100]).range([200, 0]);

  return (
    <View style={{ padding: 20 }}>
      <Svg width={320} height={220}>
        {subjectsData.map((data, index) => (
          <Rect
            key={index}
            x={xScale(data.subject)}
            y={yScale(data.percentage)}
            width={xScale.bandwidth()}
            height={200 - yScale(data.percentage)}
            fill="#6495ED" // You can customize the bar color here
          />
        ))}
        {subjectsData.map((data, index) => (
          <SvgText
            key={index}
            x={xScale(data.subject) + xScale.bandwidth() / 2}
            y={210}
            textAnchor="middle"
            fontSize={12}
          >
            {data.subject}
          </SvgText>
        ))}
        {[0, 25, 50, 75, 100].map((value, index) => (
          <SvgText key={index} x={-20} y={yScale(value)} fontSize={12} textAnchor="end">
            {value}%
          </SvgText>
        ))}
        <SvgText x={160} y={240} fontSize={14} textAnchor="middle">
          Subjects
        </SvgText>
        <SvgText x={-30} y={110} fontSize={14} textAnchor="end" transform="rotate(-90)">
          Percentage
        </SvgText>
      </Svg>
    </View>
  );
};

export default BarGraph;
