<template>
  <div
      class="sapProteomicsdbIC50Plot"
      id="ic50plot"
      ref="container"
      :style="containerStyle"
  >
  </div>
</template>

<script>
import utils from "../../vue-d3-component-wrappers/common-lib/Utils";

const d3 = require('d3');
export default {
  name: "IC50Plot",
  props: {
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    },
    curveParameters: {
      type: Object,
      default: undefined
    },
    dataPoints: {
      type: Array,
      default: undefined
    },
    properties: {
      type: Object,
      default: undefined
    },
    visible: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: undefined
    }
  },
  computed: {
    containerStyle: function () {
      return {
        width: this.width + "px",
        height: this.height + "px",
      }
    }
  },
  watch: {
    dataPoints: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.render()
      }
    }
  },
  mounted() {
    this.render()
  },
  methods: {
    render: function () {
      // create Curve Function
      var oParameters = this.curveParameters;
      var aDataPoints = this.dataPoints;
      var aPoints = [];
      var oErrorBarInfo = {};
      var bShowCurve = true;
      if (oParameters && this.visible) {
        var fCurve = this.createCurveFunction(oParameters);
        if (oParameters.slope.value < 0) {
          bShowCurve = false;
        }
        // errorbarinfo
        oErrorBarInfo = oParameters.inflection;
        oErrorBarInfo.y = fCurve(oErrorBarInfo.value);
        // Series Array for possible multiple Curves
        var aSeries = [];
        // add Curve Datasets
        aSeries.push(this.calculateCurvePoints(fCurve));
        // calculate Data Points
        if (aDataPoints && aDataPoints.length > 0) {
          aPoints = this.calculateRatio(aDataPoints);
        }
        // Draw Plot with fitted Curve and actual Data Points
        this.drawPlot(aSeries, aPoints, oErrorBarInfo, bShowCurve);
      }
    },
    createCurveFunction: function createCurveFunction(oParameters) {
      var slope = parseFloat(oParameters.slope.value);
      var bottom = parseFloat(oParameters.bottom.value);
      var top = parseFloat(oParameters.top.value);
      var inflection = parseFloat(oParameters.inflection.value);
      var a = function curveFunction(x) {
        return bottom + (top - bottom) / (1 + Math.exp(slope * (Math.log(x) - Math.log(inflection))));
      };
      return a;
    },
    calculateCurvePoints: function calculateCurvePoints(fCurve) {
      var nm = [];
      for (var i = -1; i <= 5; i = i + 0.01) {
        nm.push(Math.pow(10, i));
      }
      var aData = nm.map(function map(d) {
        return [d, fCurve(d)];
      });
      return aData;
    },
    calculateRatio: function calculateRatio(aData) {
      var aResult = [];
      aData = aData.sort(function compare(a, b) { // sort Points to have x = 0 in first position
        return a[0] - b[0];
      });

      var bNormalized = this.properties.calculationMethod === 4;	// 4 means normalized intensities
      var nCompare = Math.pow(10, aData[0][1]);
      // change 0 to 0.1, because log 0 becomes -Infinity and we want to see the control point in the plot
      aResult[0] = {
        x: 0.1,
        y: 1
      };

      for (var i = 1; i < aData.length; i++) {
        aResult[i] = {
          x: aData[i][0],
          y: bNormalized ? aData[i][1] : Math.pow(10, aData[i][1]) / nCompare
        };
      }

      return aResult;
    },
    drawPlot: function drawPlot(aData, aPoints, oErrorBarInfo, bShowCurve) {
      var sPlotId = '#ic50plot';
      var $Plot = this.$refs.container;
      var margin = {
        top: 40,
        right: 30,
        bottom: 40,
        left: 50
      };
      var width = $Plot.clientWidth - margin.left - margin.right;
      var height = $Plot.clientHeight - margin.top - margin.bottom;

      d3.select(sPlotId).select("svg").remove();

      // scale x Axis for highest within all series
      var x = d3.scaleLog()
          .domain([0.1, d3.max(aData, function outerMax(d) {
            return d3.max(d, function innerMax(e) {
              return e[0];
            });
          })])
          .range([0, width])
          .nice();

      var yMaxPoints = 0;
      var yMaxCurve = 0;
      yMaxPoints = d3.max(aPoints, function max(d) {
        return d.y;
      });
      yMaxCurve = d3.max(aData, function outerMax(d) {
        return d3.max(d, function innerMax(e) {
          return e[1];
        });
      });
      var y = d3.scaleLinear()
          .domain([0, yMaxPoints > yMaxCurve ? yMaxPoints : yMaxCurve])
          .range([height, 0])
          .nice();

      var color = d3.scaleOrdinal(d3.schemeCategory10);

      var xAxis = d3.axisBottom()
          .scale(x)
          .ticks(10, function ticks(digit) {
            return digit;
          });

      var yAxis = d3.axisLeft()
          .scale(y);

      var line = d3.line()
          .x(function getX(d) {
            return x(d[0]);
          })
          .y(function getY(d) {
            return y(d[1]);
          })
          .curve(d3.curveBasis);

      var svg = d3.select(sPlotId).append('svg:svg')
          .attr('class', 'sapProteomicsdbIC50Plot')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom);

      var content = svg
          .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      this.svg = svg;

      content.append('defs').append('clipPath')
          .attr('id', 'clip-' + sPlotId)
          .append('rect')
          .attr('width', width)
          .attr('height', height);

      content.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + height + ')')
          .call(xAxis);

      content.append('g')
          .attr('class', 'y axis')
          .call(yAxis);

      if (bShowCurve) {
        content.append('g')
            .attr('class', 'lines')
            .attr('clip-path', 'url(#clip-' + sPlotId + ')')
            .selectAll('path')
            .data(aData)
            .enter().append('path')
            .style('stroke', function stroke(d, i) {
              return color(i);
            })
            .attr('d', line);

        var errorBox = content.append('g')
            .attr('class', 'errorbox');

        var errorbar = errorBox.append('g')
            .attr('class', 'errorbar')
            .style('stroke', 'orange');

        errorbar.append('g')
            .selectAll('line')
            .data([oErrorBarInfo])
            .enter()
            .append('line')
            .attr('x1', function getX1(d) {
              return x(d3.max([0.1, d.value - d.std_error]));
            })
            .attr('y1', function getY1(d) {
              return y(d.y);
            })
            .attr('x2', function getX2(d) {
              return x(d.value + d.std_error);
            })
            .attr('y2', function getY2(d) {
              return y(d.y);
            });

        var iPxOffSetErrorBar = 8;

        errorbar.append('g')
            .selectAll('line')
            .data([oErrorBarInfo])
            .enter()
            .append('line')
            .attr('x1', function getX1(d) {
              return x(d3.max([0.1, d.value - d.std_error]));
            })
            .attr('y1', function getY1(d) {
              return y(d.y) - iPxOffSetErrorBar;
            })
            .attr('x2', function getX2(d) {
              return x(d3.max([0.1, d.value - d.std_error]));
            })
            .attr('y2', function getY2(d) {
              return y(d.y) + iPxOffSetErrorBar;
            });

        errorbar.append('g')
            .selectAll('line')
            .data([oErrorBarInfo])
            .enter()
            .append('line')
            .attr('x1', function getX1(d) {
              return x(d3.max([0.1, d.value + d.std_error]));
            })
            .attr('y1', function getY1(d) {
              return y(d.y) - iPxOffSetErrorBar;
            })
            .attr('x2', function getX2(d) {
              return x(d.value + d.std_error);
            })
            .attr('y2', function getY2(d) {
              return y(d.y) + iPxOffSetErrorBar;
            });

        errorbar.append('g')
            .selectAll('rect')
            .data([oErrorBarInfo])
            .enter()
            .append('rect')
            .attr('x', function getX(d) {
              return x(d3.max([0.1, d.value])) - 2.5;
            })
            .attr('y', function getY(d) {
              return y(d.y) - 2.5;
            })
            .attr('width', '5')
            .attr('height', '5')
            .attr('fill', 'orange');

        errorBox.append('g')
            .selectAll('text')
            .data([oErrorBarInfo])
            .enter()
            .append('text')
            .text(function text(d) {
              return 'EC50: ' + d.value.toFixed(0) + ' nM';
            })
            .attr('text-anchor', function textAnchor(d) {
              var nTextWidth = this.getBBox().width;
              var nXPosition = x(d3.max([0.1, d.value + d.std_error]));
              return nXPosition + nTextWidth > width ? 'end' : 'begin';
            })
            .attr('y', function getY(d) {
              return Math.max(y(d.y + 0.1), 0);
            })
            .attr('x', function getX(d) {
              return Math.min(x(d3.max([0.1, d.value + d.std_error])), width);
            });
      }

      if (aPoints.length > 0) {
        content.selectAll('.dot')
            .data(aPoints)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('r', 2)
            .attr('cx', function cx(d) {
              return x(d.x);
            })
            .attr('cy', function cy(d) {
              return y(d.y);
            });
      }

      content.append('text')
          .attr('class', 'AxisLabel')
          .attr('text-anchor', 'middle')
          .attr('x', width / 2)
          .attr('y', height + 30)
          .text('concentration in nM');

      content.append('text')
          .attr('class', 'AxisLabel')
          .attr('transform', 'rotate(-90)')
          .attr('y', -35)
          .attr('x', 0 - height / 2)
          .style('font-size', '12px')
          .style('text-anchor', 'middle')
          .text('relative intensity');
      // Title
      var title = svg.append('text')
          .attr('class', 'IC50Title')
          .attr('x', margin.left)
          .attr('y', 20)
          .attr('text-anchor', 'start')
          .text(this.title);
      utils.expandChartSizeToTitle(svg, title, width, margin);
    },
    getSVG: function getSVG() {
      return d3.selectAll('svg').node();
    }
  }
}
</script>

<style>
@import './IC50Plot.css.prdb';
</style>
